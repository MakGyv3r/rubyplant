import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, TouchableOpacity, View, Text } from 'react-native';
import IrrigateMode from './components/IrrigateMode'
import SensorDataShow from './components/SensorDataShow'
import {
  Header,
  Colors
} from 'react-native/Libraries/NewAppScreen';

const ProductDetailScreen = ({ navigation }) => {
  const _id = navigation.getParam('_id');
  const nav = navigation;

  return (
    <>
      <>
        <SensorDataShow navigation={nav} id={_id} />
      </>
      <>
        <IrrigateMode
          id={_id}
        />
      </>
      <>
        <View style={{ padding: 5 }}>
          <TouchableOpacity
            key="water control screan"
            style={styles.buttonChart}
            onPress={() => { navigation.navigate('ControlWater', { _id: id }) }}
          >
            <Text>
              Go To Data Control Auto watering
            </Text>
          </TouchableOpacity>
        </View>
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
  buttonChart: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 4,
    backgroundColor: "coral",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
});

export default ProductDetailScreen;
