import React, { useContext, useEffect, useRef, useState, } from 'react';
import { Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Context as ProductContext } from '../../../context/ProductDetailContext'
import { client } from '../../../api/SocketConfig'
import { NavigationEvents } from 'react-navigation';

const IrrigateMode = ({ id }) => {
  const { state, state: { Data }, fetchDataPlantProduct } = useContext(ProductContext);
  const [motorWorks, setMotorState] = useState(false);
  const [waterState, setWaterState] = useState(true);
  const [autoIrrigateState, setAutoIrrigate] = useState(false);
  const [waterTime, setWaterTime] = useState('');
  const [loading, setLoading] = useState(false);

  const product = state.data.find((data) => data._id === id);


  //socket events
  const changeData = () => { client.on("changeMotorState", listener) }
  const emitMotorState = () => { client.emit("AppMotorState", id, !motorWorks) }
  const emitAutoIrrigate = () => { client.emit("AppAutoIrrigate", id, !autoIrrigateState) }

  const listener = (dataServer) => {
    console.log(`the data from server:${dataServer}`);
    setMotorState(dataServer.motorState);
    setWaterState(dataServer.waterState);
    setAutoIrrigate(dataServer.autoIrrigateState)
    if (!dataServer.waterState)
      setWaterTime(product.waterMotor.timeOff.slice(0, 10));
    setLoading(false)
  }


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
    return () => {
      client.removeAllListeners('changeMotorState', listener);
    }
  }, []);

  const onPress = () => {
    emitMotorState();
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
          <Text style={{ fontSize: 28 }}>
            Is there water:
              {waterState
              ? 'Yes'
              : 'NO'}
          </Text>
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
          <Text style={{ fontSize: 28 }}>
            last time plant watered:
              {waterTime}
          </Text>

          <Text style={{ fontSize: 28 }}>{'auto Watering progrem:'}</Text>
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