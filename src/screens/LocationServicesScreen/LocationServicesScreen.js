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
import { NavigationEvents } from 'react-navigation';

const LocationServicesScreen = ({ navigation }) => {
  const [openSetting, setOpenSetting] = useState(null);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const appState = useRef(AppState.currentState);



  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    if (Platform.OS === 'android' && !Device.isDevice) {
      setErrorMessage(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
      console.log("test ")
    } else {
      _getLocationAsync();
    }
  }, []);

  useEffect(() => {
    AppState.removeEventListener('change', _handleAppStateChange);
  }, []);

  const _getLocationAsync = async () => {
    try {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage(
          'Permission to access location was denied'
        );
        openSettings()
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
    <>
      <NavigationEvents onWillFocus={() => { _getLocationAsync() }} />
      <View style={styles.container}>
        <Modal
          animationType="slide"
          onRequestClose={openSetting ? openSettings() : undefined}
          visible={isLocationModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Button
                onPress={() => (setIsLocationModalVisible(false), setOpenSetting(true))
                }
                title="Enable Location Services"
              />
            </View>
          </View>
        </Modal>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  }
});

export default LocationServicesScreen;
