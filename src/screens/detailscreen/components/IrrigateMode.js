import React, { useContext, useEffect, useRef, useState, } from 'react';
import { Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Context as ProductContext } from '../../../context/ProductDetailContext'
import { client } from '../../../api/SocketConfig'
import { NavigationEvents } from 'react-navigation';
import RangeSlider, { Slider } from 'react-native-range-slider-expo';

const IrrigateMode = ({ id }) => {
  const { state, state: { Data }, fetchDataPlantProduct } = useContext(ProductContext);
  const product = state.data.find((data) => data._id === id);
  const [motorWorks, setMotorState] = useState(false);
  const [waterState, setWaterState] = useState(true);
  const [autoIrrigateState, setAutoIrrigate] = useState(product.autoIrrigateState);
  const [waterTime, setWaterTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [motorWaterAmount, setMotorWaterAmount] = useState(0);

  //socket events
  const changeData = () => { client.on("changeMotorState", listener) }
  const emitMotorState = () => { client.emit("AppMotorState", id, !motorWorks) }
  const emitMotorTimeState = () => { client.emit("MotorTimeState", id, motorWaterAmount * 450 / 60000) }
  const emitAutoIrrigate = () => { client.emit("AppAutoIrrigate", id, !autoIrrigateState) }

  const hubStatus = () => { client.on("hubConnected", hubListener) }

  const listener = (dataServer) => {
    console.log(`the data from server:${dataServer}`);
    setMotorState(dataServer.motorState);
    setWaterState(dataServer.waterState);
    setAutoIrrigate(dataServer.autoIrrigateState)
    if (!dataServer.waterState)
      setWaterTime(product.waterMotor.timeOff.slice(0, 10));
    setLoading(false)
  }

  const hubListener = () => { setLoading(false) }

  let timer = useRef(null);
  useEffect(() => {
    if (loading === true) {
      console.log('timeout started')
      timer.current = setTimeout(() => {
        fetchDataPlantProduct(id);
        setMotorState(Data.data.waterMotor.state);
        setAutoIrrigate(Data.data.autoIrrigateState),
          setLoading(false)
        console.log('i am after timeout');
      }, 20000);
    } return () => clearTimeout(timer.current);
  }, [loading]);

  useEffect(() => {
    if (typeof product.waterMotor !== 'undefined') {
      setMotorState(product.waterMotor.state);
      setWaterState(product.waterSensor.waterState);
      if (product.waterMotor.timeOff)
        setWaterTime(product.waterMotor.timeOff.slice(0, 10));
    }
  }, []);


  useEffect(() => {
    changeData();
    hubStatus();
    return () => {
      client.removeAllListeners('changeMotorState', listener);
      client.removeAllListeners('hubConnected', hubListener);
    }
  }, []);

  const onPress = () => {
    emitMotorState();
    setLoading(true)
  };

  const onPressMotorAmount = () => {
    emitMotorTimeState();
    setLoading(true)
  };

  const toggleSwitch = () => {
    emitAutoIrrigate();
    setLoading(true)
  };

  if (typeof state.data !== 'undefined') {
    return (
      <>
        <NavigationEvents onWillFocus={() => fetchDataPlantProduct(id)} />
        <>
          <Text style={{ fontSize: 20 }}>
            Is there water:
              {waterState
              ? 'Yes'
              : 'NO'}
          </Text>
        </>
        <>
          <>
            <Text style={{ fontSize: 20 }}>Amount of water to irrigate:</Text>
            <Slider min={0} max={500} step={5}
              valueOnChange={value => setMotorWaterAmount(value)}
              initialValue={0}
              knobColor='red'
              valueLabelsBackgroundColor='black'
              inRangeBarColor='green'
              outOfRangeBarColor='orange'
            />
            <Text style={{ fontSize: 18 }}>value:  {motorWaterAmount}ml</Text>
          </>
          <>
            {(loading === false) ? ((motorWorks === true) ? (
              <>
                <TouchableOpacity style={styles.buttonOFF} onPress={onPress}>
                  <Text>{'OFF'}</Text>
                </TouchableOpacity>
              </>
            ) : (<>
              <TouchableOpacity style={styles.buttonON} onPress={onPressMotorAmount}>
                <Text>{'Start motor irrigate water amount'}</Text>
              </TouchableOpacity></>
              )) : (
                <>
                  <ActivityIndicator animating={true} size="large" color="red" />
                </>
              )}
          </>
        </>
        <>
          {(loading === false) ? ((motorWorks === true) ? (
            <>
              <TouchableOpacity style={styles.buttonOFF} onPress={onPress}>
                <Text>{'OFF'}</Text>
              </TouchableOpacity>
            </>
          ) : (<>
            <TouchableOpacity style={styles.buttonON} onPress={onPress}>
              <Text>{'ON'}</Text>
            </TouchableOpacity></>
            )) : (
              <>
                <ActivityIndicator animating={true} size="large" color="red" />
              </>
            )}
        </>
        <>
          <Text style={{ fontSize: 20 }}>
            last time plant watered:
              {waterTime}
          </Text>
          <Text style={{ fontSize: 24 }}>{'auto Watering progrem:'}</Text>
          {(loading === false) ?
            (
              <Switch
                style={styles.switch}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={autoIrrigateState ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={autoIrrigateState}
              />
            ) : (
              <ActivityIndicator animating={true} size="large" color="red" />
            )}

        </>
      </>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00CC00',
    padding: 10,
    marginTop: 10,
  },

  buttonON: {
    alignItems: 'center',
    backgroundColor: '#00CC00',
    padding: 10,
    marginTop: 10,
  },
  buttonOFF: {
    alignItems: 'center',
    backgroundColor: '#DB2828',
    padding: 10,
    marginTop: 10,
  },
  buttonNotOnline: {
    alignItems: 'center',
    backgroundColor: '#9B9D9A',
    padding: 10,
    marginTop: 10,
  },
  switch: {
    // flex: 1,
    alignItems: 'center',
    //padding: 10,
    // justifyContent: 'center',
  },
});
export default IrrigateMode;