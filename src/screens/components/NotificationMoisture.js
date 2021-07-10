import { requireNativeComponent } from "react-native";
import React, { useContext, useEffect, useState, } from 'react';
import { Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { Context as ProductContext } from '../../context/ProductDetailContext'
import { client } from '../../api/SocketConfig'
import { NavigationEvents } from 'react-navigation';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';


const NotificationMoisture = ({ id }) => {
  const [NotificationChecked, setNotificationChecked] = useState(false);
  const { getItem, setItem } = useAsyncStorage("NotificationStatus");


  const readItemFromStorage = async () => {
    let status = await getItem();
    if (status == null)
      setNotificationChecked(false);
    else setNotificationChecked(status === 'true' ? true : false);

  };

  const writeItemToStorage = async () => {
    let status = !NotificationChecked;
    await setItem(status.toString());
    setNotificationChecked(status);
  };

  return (
    <>
      <NavigationEvents onWillFocus={() => { readItemFromStorage() }} />
      <CheckBox
        center
        title='Click Here to get notifications'
        checked={NotificationChecked}
        onPress={() => {
          writeItemToStorage();
        }
        }
      />

    </>
  );
};


const styles = StyleSheet.create({
});
export default NotificationMoisture;