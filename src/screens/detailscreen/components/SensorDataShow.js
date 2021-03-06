import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Switch,
  Button,
  TouchableOpacity, SafeAreaView, View, ActivityIndicator
} from 'react-native';
import { client } from '../../../api/SocketConfig'
import { Context as ProductDataContext } from '../../../context/ProductDetailContext'
import DynamicProgressCircle from './DynamicProgressCircle';
import { NavigationEvents } from 'react-navigation';


const SensorDataShow = ({ navigation, id }) => {

  const { state } = useContext(ProductDataContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hubConnected, sethubConnected] = useState(true);
  const [stateData, setDataState] = useState({ 'lightSensor': null, 'muisterSensor': null });

  const listener = (dataServer) => {
    console.log(`the data from server:${dataServer}`);
    if (dataServer.lightSensor !== null) {
      setDataState({ 'lightSensor': dataServer.lightSensor, 'muisterSensor': dataServer.muisterSensor });
    }
    setLoading(false)
  }

  const hubListener = (dataServer) => {
    console.log(`the data from server:${dataServer.hubStatus}`);
    sethubConnected(dataServer.hubStatus)
  }

  const changeData = () => { client.on("showData", listener) }
  const hubStatus = () => { client.on("hubConnected", hubListener) }
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

  useEffect(() => {
    hubStatus();
    return () => {
      client.removeAllListeners('hubConnected', hubListener);
    }
  }, []);


  return (
    <>

      <NavigationEvents onWillFocus={() => { }} />
      {hubConnected === false && (
        <>
          <View style={[styles.fixToText, styles.container]}>
            <Text style={{ fontSize: 24 }}>-hub isn't Connected</Text>
          </View>
        </>
      )}

      {stateData.muisterSensor !== null && (
        <>
          <Text style={{ fontSize: 24 }}>Moisture  sensor data:</Text>
          <View style={[styles.fixToText, styles.container]}>
            <>
              <DynamicProgressCircle
                changingValues={{
                  Percent: parseInt(stateData.muisterSensor),
                }}
              />
            </>

          </View>
        </>
      )}

      {stateData.lightSensor !== null && (
        <Text style={{ fontSize: 24 }}>
          Light sensor data:
          {
            stateData.lightSensor
          }%
        </Text>
      )}
      <>
        <View style={{ padding: 5 }}>
          <TouchableOpacity
            key="Moisture Chart"
            style={styles.buttonChart}
            onPress={() => { navigation.navigate('Chart', { _id: id }) }}
          >
            <Text>
              Go To Data Charts
                  </Text>
          </TouchableOpacity>
        </View>
      </>

      {loading === false ?
        <Button
          title="Get Sensor Data"
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
  container: {
    flex: 0,
    padding: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00CC00',
    padding: 10,
    marginTop: 10,
  },
  buttonChart: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "coral",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  switch: {
    alignItems: 'center',
  },
});

export default SensorDataShow;
