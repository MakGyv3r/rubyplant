import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView } from 'react-native';
import { Context as ProductDetailContext } from '../context/ProductDetailContext';
import { NavigationEvents } from 'react-navigation';
import AddPlantHubForm from '../components/AddPlantHubForm';
import useSocket from '../components/useSocket'
import Spinner from 'react-native-loading-spinner-overlay';
import { navigate } from '../navigationRef';
import { initsocket, client } from '../api/SocketConfig'



const AddPlantScreen = ({ navigation }) => {
  const { state, addPlantProductToHub } = useContext(ProductDetailContext);
  const [loading, setLoading] = useState(false);
  // const {data, client,reaciveData,clearErrorMessage,ErrorMessage}=useSocket("AddProductScreen");
  const [data, setData] = useState('');


  const loadingRef = useRef(loading)
  const listener = (dataServer) => {
    console.log(`the data from server:${dataServer}`);
    if (dataServer === 'success') {
      navigation.navigate('ProductList')
    }
    else if (loadingRef.current === true)
      setData(dataServer);
    setLoading(false);
  }

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  const changeData = () => { client.on("AddProductScreen", listener) }
  const emitssAddProduct = () => { client.emit("AddProduct", state) }

  useEffect(() => {
    changeData();
    // Componet unmount /cleenUp
    return () => {
      client.removeAllListeners('AddProductScreen', listener);
    }
  }, []);


  let timer = useRef(null);
  useEffect(() => {
    if (loading === true) {
      setData('');
      console.log('timeout started')
      timer.current = setTimeout(() => {
        setLoading(false)
        setData('somting want wrong please try agin');
        console.log('i am after timeout');
      }, 20000);
    } return () => clearTimeout(timer.current);
  }, [loading]);

  useEffect(() => {
    if (loading === true) {
      console.log(state)
      emitssAddProduct()
    }
  }, [loading]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => setData('')} />
        <NavigationEvents onWillBlur={() => setData('')} />
        <AddPlantHubForm
          headerText="Enter product number"
          errorMessage={data}
          submitButtonText="Add Plant"
          onSubmit={addPlantProductToHub}
          onLoading={() => setLoading(true)}
        />
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'please wait till the product is has been add'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    </SafeAreaView>

  );
};

AddPlantScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },

});

export default AddPlantScreen;
