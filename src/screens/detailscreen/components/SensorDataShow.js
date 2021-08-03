import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Switch,
  Button,
  TouchableOpacity, SafeAreaView, View, ActivityIndicator
} from 'react-native';
import { client } from '../../../api/SocketConfig'
import { NavigationEvents } from 'react-navigation';
import { Context as ProductDataContext } from '../../../context/ProductDetailContext'
import DynamicProgressCircle from './DynamicProgressCircle';

const SensorDataShow = ({ id }) => {

  const { state } = useContext(ProductDataContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stateData, setDataState] = useState({ 'lightSensor': null, 'muisterSensor': null });

  const listener = (dataServer) => {
    console.log(`the data from server:${dataServer}`);
    if (dataServer.lightSensor !== null) {
      setDataState({ 'lightSensor': dataServer.lightSensor, 'muisterSensor': dataServer.muisterSensor });
    }

    setLoading(false)
  }

  const changeData = () => { client.on("showData", listener) }
  const emitGetData = () => { client.emit("GetData", id) }



  let timer = useRef(null);
  useEffect(() => {
    if (loading === true) {
      console.log('timeout started')
      timer.current = setTimeout(() => {
        setLoading(false)
        console.log('i am after timeout');
      }, 35000);
    } return () => clearTimeout(timer.current);
  }, [loading]);

  const product = state.data.find((data) => data._id === id);

  useEffect(() => {
    if ((product.moistureSensor.tests.length > 0) && (product.lightSensor.tests.length > 0)) {
      setDataState({ 'lightSensor': product.lightSensor.tests[product.lightSensor.tests.length - 1].status, 'muisterSensor': product.moistureSensor.tests[product.moistureSensor.tests.length - 1].status });
    }
  }, []);


  useEffect(() => {
    changeData();
    return () => {
      client.removeAllListeners('showData', listener);
    }
  }, []);

  return (
    <>
      <NavigationEvents onWillFocus={() => { }} />
      {stateData.muisterSensor !== null && (
        <>
          <Text style={{ fontSize: 28 }}>Moisture  sensor data:</Text>
          <DynamicProgressCircle
            changingValues={{
              Percent: parseInt(stateData.muisterSensor),
            }}
          />
        </>
      )}

      {stateData.lightSensor !== null && (
        <Text style={{ fontSize: 28 }}>
          Light sensor data:
          {
            stateData.lightSensor
          }
        </Text>
      )}


      {loading === false ?
        <Button
          title="Get Data"
          style={styles.button}
          onPress={() => {
            emitGetData(id), setLoading(true)
          }}
        />
        : <ActivityIndicator animating={true} size="large" color="red" />}
    </>
  );
};



const styles = StyleSheet.create({
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
    alignItems: 'center',
  },
});

export default SensorDataShow;
