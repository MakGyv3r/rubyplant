import React, { Component, useEffect, useState, useRef } from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Button,
  Linking,
  Modal,
  AppState,
  PermissionsAndroid
} from 'react-native';
import { Permissions, } from 'expo';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import * as IntentLauncher from "expo-intent-launcher";
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { NavigationEvents } from 'react-navigation';
import TopBar from '../../components/TopBar';


const LocationServicesScreen = ({ navigation }) => {
  const [openSetting, setOpenSetting] = useState(null);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [buttonLocationDisabled, setbuttonLocationDisabled] = useState(null);
  const appState = useRef(AppState.currentState);

  const _handleAppStateChange = nextAppState => {
    console.log(appState)
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      LocationCheck()
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    // if (Platform.OS === 'android' && !Device.isDevice) {
    //   setErrorMessage(
    //     'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
    //   );
    // } else {
    //   _getLocationAsync();
    // }
    _getLocationAsync();
    return (() => {
      AppState.removeEventListener('change', _handleAppStateChange);
    })
  }, [openSetting]);

  const _getLocationAsync = async () => {
    try {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage(
          'Permission to access location was denied'
        );
        setbuttonLocationDisabled(true)
        setIsLocationModalVisible(true);
        return;
      }
      setbuttonLocationDisabled(false)
      setIsLocationModalVisible(false);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

    } catch (error) {
      LocationCheck()
    }
  };

  const LocationEnable = async () => {
    try {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.hasServicesEnabledAsync({});
        if (location === false) {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          setIsLocationModalVisible(false);
        }
        return;
      }
    } catch (error) {
      LocationCheck();
    }
  };

  const LocationCheck = async () => {
    let status = await Location.getProviderStatusAsync();
    if (!status.locationServicesEnabled) {
      setbuttonLocationDisabled(false)
      setIsLocationModalVisible(true);
    }
  };


  const openSettings = () => {
    if (Platform.OS == 'ios') {
      Linking.openURL('app-settings:');
    } else {
      // IntentLauncher.startActivityAsync(
      //   IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
      // );
      requestLocationPermission();
    }
    setOpenSetting(false);
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Location");
      } else {
        console.log("Camera permission denied");
        //setbuttonLocationDisabled(false)
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onPressFunc = () => {
    setIsLocationModalVisible(false);
  }

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
          <View style={styles.container2}>
            <View style={styles.statusBar} >
              <TopBar Title={"Location Services"} onPressFunc={onPressFunc} />
            </View>
          </View>

          <View style={styles.modalView}>
            <Button
              onPress={() => (LocationEnable())
              }
              disabled={buttonLocationDisabled}
              title="Enable Location "
            />
            <Button
              onPress={() => (setOpenSetting(true))}
              disabled={!buttonLocationDisabled}
              title="Enable Location Services"
            />
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
  statusBar: {
    backgroundColor: 'whitesmoke',
    height: Constants.statusBarHeight
  },
  container2: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  modalView: {
    margin: 20,
    flexDirection: 'column', // row
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
