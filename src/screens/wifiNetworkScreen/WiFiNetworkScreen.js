import React, { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { WebView } from 'react-native-webview';
import * as Network from 'expo-network';

const WiFiNetworkScreen = ({ navigation }) => {
  const [netInfo, setNetInfo] = useState('');
  c

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(
        `Connection type: ${state.type}
        SSID is: ${state.details.ssid}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`
      );
      setNetInfo((state.details.ipAddress === '192.168.4.2') ? 'Connected' : 'Not Connected')
    }, []);

    return () => {
      // Unsubscribe to network state updates
      //   unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>
          For connecting "RubyPlant Hub" to your local wifi internet network
          {'\n'}
          Please go to your WIFI netwroks and connect to the  "RubyPlant Hub WiFi"
        </Text>
        <Text style={styles.textStyle}>
          RubyPlant Hub connected to wifi: {netInfo}
        </Text>
      </View>

      <View style={styles.container}>
        <WebView
          style={styles.container}
          source={{ uri: 'http://192.168.4.1' }}
        />
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

export default WiFiNetworkScreen;
