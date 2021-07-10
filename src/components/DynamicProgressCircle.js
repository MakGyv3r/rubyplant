import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import ProgressCircle from 'react-native-progress-circle';

const DynamicProgressCircle = ({ changingValues }) => {
  const Percent = changingValues.Percent;



  function ColorChange() {
    if (80 <= Percent && Percent <= 100) {
      return '#21BA45';
    } else if (60 <= Percent && Percent < 80) {
      return '#B5CC18';
    } else if (40 <= Percent && Percent < 60) {
      return '#FBBD08';
    } else if (20 <= Percent && Percent < 40) {
      return '#F2711C';
    } else if (0 <= Percent && Percent < 20) {
      return '#DB2828';
    }
    return null;
  }
  return (
    <>

      <ProgressCircle
        percent={Percent}
        radius={50}
        borderWidth={8}
        color={ColorChange()}
        shadowColor="#999"
        bgColor="#fff"
      >
        <Text style={{ fontSize: 18 }}>
          {Percent}
          {'%'}{' '}
        </Text>
      </ProgressCircle>
    </>
  );
};

DynamicProgressCircle.defaultProps = {
  changingValues: {
    Percent: 0,
  },
};

export default DynamicProgressCircle;
