import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, } from 'react-native';
import {
  Header,
  Colors
} from 'react-native/Libraries/NewAppScreen';

const ProductDetailScreen = ({ navigation }) => {
  const _id = navigation.getParam('_id');
  const nav = navigation;

  return (
    <>

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