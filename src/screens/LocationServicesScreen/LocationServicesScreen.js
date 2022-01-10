import React, { Component, useEffect, useState, useRef } from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Button,
  Linking,
  Modal,
  AppState
} from 'react-native';
import { Permissions, } from 'expo';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import * as IntentLauncher from "expo-intent-launcher";
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
const LocationServicesScreen = ({ navigation }) => {
  const [openSetting, setOpenSetting] = useState(null);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.removeEventListener('change', _handleAppStateChange);
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      _getLocationAsync();
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    if (Platform.OS === 'android' && !Device.isDevice) {
      setErrorMessage(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
      _getLocationAsync();
    }
  }, []);

  const _getLocationAsync = async () => {
    try {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage(
          'Permission to access location was denied'
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    } catch (error) {
      let status = await Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        setIsLocationModalVisible(true);
      }
    }
  };


  const openSettings = () => {
    if (Platform.OS == 'ios') {
      Linking.openURL('app-settings:');
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
    setOpenSetting(false);
  };


  let text = 'Waiting..';
  if (errorMessage) {
    text = errorMessage;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        onRequestClose={openSetting ? openSettings() : undefined}
        visible={isLocationModalVisible}
      >
        <View
          style={{
            height: 300,
            width: 300,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            onPress={() => (setIsLocationModalVisible(false), setOpenSetting(true))
            }
            title="Enable Location Services"
          />
        </View>
      </Modal>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  }
});

export default LocationServicesScreen;
