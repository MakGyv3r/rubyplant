import React, { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationEvents } from 'react-navigation';
import LocationServicesScreen from "../HubConnectScreen/components/LocationServicesComponent";

const HubConnectScreen = ({ navigation }) => {
  const [netInfo, setNetInfo] = useState('');

  useEffect(() => {
    networkInfos()

  }, []);

  const networkInfos = async () => {
    try {

      console.log(NetInfo)
    } catch (error) {
      console.log('err', error)
    }
  }

  const networkInfo = async () => {
    try {
      NetInfo.fetch().then(state => {
        console.log("SSID", state.details.ssid);
        console.log("BSSID", state.details.bssid);
        console.log("Is connected?", state.isConnected);
      });
    } catch (error) {
      console.log('err', error)
    }
  }

  return (
    <>
      <NavigationEvents />
      <LocationServicesScreen />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.header}>
            React Native NetInfo
          {'\n'}
            To Get NetInfo information
        </Text>
          <Text style={styles.textStyle}>
            Here is NetInfo to get device type
           {netInfo}
          </Text>
          {/* <Button title="Get more detailed NetInfo" onPress={getNetInfo} /> */}
        </View>
      </SafeAreaView>
    </>
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
