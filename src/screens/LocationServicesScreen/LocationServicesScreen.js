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
  const [locationTry, setLocationTry] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [buttonLocationDisabled, setbuttonLocationDisabled] = useState(null);
  const appState = useRef(AppState.currentState);

  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    if (status && Location) {
      checkStatus();
    }
  }, [status, Location]);


  const checkStatus = async () => {
    console.log('status*******', status)
    try {
      if (status.status === 'denied') {
        if (status.canAskAgain === true) {
          console.log('i am here')
          await requestPermission()
        }
        if (status.canAskAgain === false) {
          setbuttonLocationDisabled(true)
          setIsLocationModalVisible(true);
        }

      }
      if (status.status === 'granted') {
        setbuttonLocationDisabled(false)
        setIsLocationModalVisible(true);
        console.log('locationTry:', locationTry)
        if (locationTry === true) {
          setLocationTry(false)
          let isLocationOn = await Location.getProviderStatusAsync();
          console.log('isLocationOn', isLocationOn)
          if (isLocationOn.locationServicesEnabled === false) {
            try {
              const locationStatus = await Location.enableNetworkProviderAsync();
              console.log('locationStatus****:', locationStatus)
              isLocationOn = await Location.getProviderStatusAsync();
              if (isLocationOn.locationServicesEnabled === true) {
                setbuttonLocationDisabled(false)
                setIsLocationModalVisible(false);
              }
            } catch (error) {
              console.log('err', error)
            }
          }
          if (isLocationOn.locationServicesEnabled === true) {
            setbuttonLocationDisabled(false)
            setIsLocationModalVisible(false);
          }
        }
      }
    } catch (error) {
      console.log('err', error)
    }
  }

  const LocationEnable = async () => {
    setLocationTry(true)
    requestPermission()
    if (status && Location) {
      checkStatus();
    }
  };


  const _handleAppStateChange = nextAppState => {
    console.log(appState)
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      checkStatus();
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return (() => {
      AppState.removeEventListener('change', _handleAppStateChange);
    })
  }, [openSetting]);



  const openSettings = () => {
    if (Platform.OS == 'ios') {
      Linking.openURL('app-settings:');
    } else {
      requestLocationPermission();
    }
    setOpenSetting(false);
  };

  const requestLocationPermission = async () => {
    try {
      requestPermission()
      console.log(' i am here3')
      if (status.canAskAgain === true) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the Location");
        } else {
          console.log("location  permission denied");
          setbuttonLocationDisabled(true)
        }
      }
      else {
        startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
      }
    } catch (err) {
      console.log('err', err);
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
      <NavigationEvents onWillFocus={() => { }} />
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
