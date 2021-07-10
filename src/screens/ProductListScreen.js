import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList, TouchableOpacity, StyleSheet, Text, SafeAreaView, StatusBar, View, ScrollView
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as ProductDetailContext } from '../context/ProductDetailContext';
//import { Context as SocketContext } from '../context/SocketContext';
import Spacer from '../components/Spacer';
import { initsocket, client } from '../api/SocketConfig'
import { Header, Colors } from 'react-native/Libraries/NewAppScreen';
import BackgroundFetchScreen from './components/BackgroundFetchScreen';

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

//client.io.on("disconnect", console.log('try to reconnect') );

const ProductListScreen = ({ navigation }) => {


  const { state, fetchUserProducts } = useContext(ProductDetailContext);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    initsocket();
  }, []);


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
      <>
        <BackgroundFetchScreen />
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