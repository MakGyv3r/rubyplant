import React, { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { useNetInfo } from "@react-native-community/netinfo";

const HubConnectScreen = ({ navigation }) => {
  //const [netInfo, setNetInfo] = useState('');
  const [ssid, setSsid] = useState('');


  // useEffect(() => {
  //   // Subscribe to network state updates
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     setNetInfo(
  //       `Connection type: ${state.type}
  //       SSID is: ${state.details.ssid}
  //       Is connected?: ${state.isConnected}
  //       IP Address: ${state.details.ipAddress}`
  //     );
  //     setSsid(state.details.ssid)
  //   });

  //   return () => {
  //     // Unsubscribe to network state updates
  //     unsubscribe();
  //   };
  // }, []);

  // const getNetInfo = () => {
  //   // To get the network state once
  //   NetInfo.fetch().then((state) => {
  //     alert(
  //       `Connection type: ${state.type}
  //       SSID is: ${state.details.ssid}
  //       Is connected?: ${state.isConnected}
  //       IP Address: ${state.details.ipAddress}`
  //     );
  //     console.log(state)
  //   });
  // };

  const netInfo = useNetInfo({
    reachabilityUrl: 'https://clients3.google.com/generate_204',
    reachabilityTest: async (response) => response.status === 204,
    reachabilityLongTimeout: 60 * 1000, // 60s
    reachabilityShortTimeout: 5 * 1000, // 5s
    reachabilityRequestTimeout: 15 * 1000, // 15s
    reachabilityShouldRun: () => true,
  });


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>
          picture explaning how to connect the hub,
          and whan the light shows Red it is connected to the wifi
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>
          For connecting "RUBYPLANT Hub" to the internet
          {'\n'}
          Please go to your WIFI netwroks and connect to RUBYPLANT WIFI
        </Text>
        {/* <Text style={styles.textStyle}>
          RUBYPLANT HUB connected to wifi: {console.log(netInfo.details.ssid.toString())}

        </Text> */}

        {/* <Button title="Get more detailed NetInfo" onPress={(() => { getNetInfo() })} /> */}
        <Button title="Get more detailed NetInfo" onPress={(() => {
          alert(netInfo.details.ssid.toString());
        })} />
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    paddingVertical: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HubConnectScreen;
