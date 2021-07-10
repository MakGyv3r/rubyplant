import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, } from 'react-native';
import IrrigateMode from './components/IrrigateMode'
import SensorDataShow from './components/SensorDataShow'
import NotificationMoisture from './components/NotificationMoisture'
//import BackgroundFetch from "react-native-background-fetch";
import {
  Header,
  Colors
} from 'react-native/Libraries/NewAppScreen';

const ProductDetailScreen = ({ navigation }) => {
  const _id = navigation.getParam('_id');



  return (
    <>
      <>
        <SensorDataShow id={_id} />
      </>
      <>
        <IrrigateMode
          id={_id}
        />
      </>
      <>
        <NotificationMoisture
          id={_id}
        />
      </>
    </>

  );
};



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});

export default ProductDetailScreen;
