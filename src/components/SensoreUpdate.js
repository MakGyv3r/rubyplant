import React, { useContext, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Context as PlantContext } from '../context/PlantContext';

const sensoreUpdate = ({ typeOfTest }) => {
  const { state, fetchSensore } = useContext(PlantContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchSensore((state) => {
        return state;
      });
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (typeof state.data !== 'undefined') {
    switch (typeOfTest) {
      case 'Sensor':
        return (
          <>
            <Text style={{ fontSize: 48 }}>
              {
                state.data.muisterSensor.tests[
                  state.data.muisterSensor.tests.length - 1
                ].status
              }
            </Text>
            <Text style={{ fontSize: 48 }}>
              {
                state.data.lightSensor.tests[
                  state.data.lightSensor.tests.length - 1
                ].status
              }
            </Text>
            <Text style={{ fontSize: 48 }}>
              {
                state.data.waterSensor.tests[
                  state.data.waterSensor.tests.length - 1
                ].status
              }
            </Text>
          </>
        );
        break;
      //   case 'lightSensor':
      //     return (
      //       <>
      //         <Text style={{ fontSize: 48 }}>
      //           {
      //             state.data.lightSensor.tests[
      //               state.data.lightSensor.tests.length - 1
      //             ].status
      //           }
      //         </Text>
      //       </>
      //     );
      //     break;
      //   case 'waterSensor':
      //     return (
      //       <>
      //         <Text style={{ fontSize: 48 }}>
      //           {
      //             state.data.waterSensor.tests[
      //               state.data.waterSensor.tests.length - 1
      //             ].status
      //           }
      //         </Text>
      //       </>
      //     );
      //     break;
    }
  } else {
    return <></>;
  }
};

export default sensoreUpdate;
