import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const TopBar = ({ Title, onPressFunc }) => {

  useEffect(() => {
  }, []);

  return (
    < View style={styles.container} >
      <AntDesign.Button name="arrowleft" size={24} color="black" backgroundColor='transparent' onPress={() => onPressFunc()}></AntDesign.Button>
      <Text>{Title}</Text>
      <Text></Text>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row', // row
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default TopBar;