import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList, TouchableOpacity, StyleSheet, Text, SafeAreaView, StatusBar, View, ScrollView,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as ProductDetailContext } from '../context/ProductDetailContext';
//import { Context as SocketContext } from '../context/SocketContext';
import Spacer from '../components/Spacer';
import { initsocket, client } from '../api/SocketConfig'
import { Header, Colors } from 'react-native/Libraries/NewAppScreen';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BACKGROUND_FETCH_TASK = 'background-fetch';
let content = { title: `notfication test`, body: `` };

const setObjectValue = async (value) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem('state', jsonValue);
};

const getMyObject = async (key) => {
  const jsonValue = await AsyncStorage.getItem(key);
  // return jsonValue != null ? JSON.parse(jsonValue) : null;
  const value = JSON.parse(jsonValue);
  content = { title: `notfication test`, body: `` }
  value.data.forEach(element => {
    if (element.autoIrrigateState === false)
      // content = { title: `${content.title} \n autoIrrigateState for ${element.name} is ${element.autoIrrigateState}` }
      content.body = `${content.body} \n autoIrrigateState for ${element.name} is ${element.autoIrrigateState}`;
  });
};

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});


let value;
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();
  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
  getMyObject('state');
  console.log(content);
  Notifications.scheduleNotificationAsync({ content, trigger: null });
  // Be sure to return the successful result type!
  return BackgroundFetch.Result.NewData;
});


const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);



const ProductListScreen = ({ navigation }) => {
  const [value, setValue] = useState('value');
  // const { getItem, setItem } = useAsyncStorage('store');
  const { state, fetchUserProducts } = useContext(ProductDetailContext);
  const [selectedId, setSelectedId] = useState(null);


  // const readItemFromStorage = async () => {
  //   const item = await getItem();
  //   setValue(item);
  // };

  // const writeItemToStorage = async (newValue) => {
  //   await setItem(newValue.toString());
  //   setValue(newValue.toString());
  // };




  useEffect(() => {
    initsocket();
  }, []);

  useEffect(() => {
    if (state)
      setObjectValue(state)
  }, [state]);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        textColor={'black'}
        onPress={() => { setSelectedId(item._id), navigation.navigate('ProductDetail', { _id: item._id }) }}
      />

    );
  };


  return (
    <>
      <>
        <SafeAreaView style={styles.container}>
          <NavigationEvents onWillFocus={fetchUserProducts} />
          <FlatList
            data={state.data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            extraData={selectedId}
          />
        </SafeAreaView>
      </>
    </>
  );

}


ProductListScreen.navigationOptions = () => {
  title: 'Product List';
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});

export default ProductListScreen;