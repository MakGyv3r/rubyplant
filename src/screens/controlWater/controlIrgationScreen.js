import React, { useContext, useEffect, useState, } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Header, Colors } from 'react-native/Libraries/NewAppScreen';
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import { Context as ProductDetailContext } from '../../context/ProductDetailContext';
import { NavigationEvents } from 'react-navigation';

const ControlIrgationScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
  // const nav = navigation;

  const { state, autoIrrigateStateSetUp, fetchDataPlantProduct } = useContext(ProductDetailContext);



  const product = state.data.find((data) => data._id === id);

  const [humLowLevel, setHumLowLevel] = useState(0);
  const [humHighLevel, setHumHighLevel] = useState(0);
  const [waterPumpOnTimeLow, setWaterPumpOnTimeLow] = useState(0);
  const [waterPumpOnTimeMid, setWaterPumpOnTimeMid] = useState(0);
  const [waterPumpOnTimeHigh, setWaterPumpOnTimeHigh] = useState(0);

  const createAutoIrrigateExplanationAlert = () =>
    Alert.alert('', 'The Auto-Irrigate Works so that you set the high and low ranges where the soil is wet and dry, according to this the ranges and times in which the soil moisture is been tested and irrigated, are determined . At a low moisture level the soil is tested every minute and irrigated according to the low level you set. At the middle moisture level the soil is tested every hour and irrigated according to the medium level you set, and at the high moisture level the soil is tested every 24 hours and irrigated according to the high level you set.', [
      { text: 'OK', onPress: () => ({}) },
    ]);



  useEffect(() => {
    setHumLowLevel(Math.round((4095 - product.autoIrrigateStateSetUp.humLowLevel) * 100 / 4095));
    setHumHighLevel(Math.round((4095 - product.autoIrrigateStateSetUp.humHighLevel) * 100 / 4095));
    setWaterPumpOnTimeLow(Math.round(product.autoIrrigateStateSetUp.waterPumpOnTimeLow * 450 / 60000));
    setWaterPumpOnTimeMid(Math.round(product.autoIrrigateStateSetUp.waterPumpOnTimeMid * 450 / 60000));
    setWaterPumpOnTimeHigh(Math.round(product.autoIrrigateStateSetUp.waterPumpOnTimeHigh * 450 / 60000));

  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <NavigationEvents onWillFocus={() => { fetchDataPlantProduct(id) }} />
      <View style={styles.container}>
        <View style={{ padding: 10, flex: 1 }}>
          <TouchableOpacity
            key="Save"
            style={styles.button2}
            onPress={createAutoIrrigateExplanationAlert}
          >
            <Text style={{ textAlign: "center" }} > Press for explanation </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionDescription}>Choose soil moisture levels :</Text>
        <View marginTop={10}>
          <RangeSlider min={5} max={95} step={1}
            fromValueOnChange={value => setHumLowLevel(value)}
            toValueOnChange={value => setHumHighLevel(value)}
            initialFromValue={humLowLevel}
            initialToValue={humHighLevel}
          />
          <Text>Moisture low level:  {humLowLevel}%     | recommended:50% </Text>
          <Text>Moisture high level: {humHighLevel}%    | recommended: 70%</Text>
        </View>

        <View>
          <Text style={styles.sectionDescription}>Please choose the water amount to irrigate when the soil is in different moisture levels:</Text>
          <Text style={styles.sectionDescription}> Low level:</Text>
          <Slider min={0} max={500} step={5}
            valueOnChange={value => setWaterPumpOnTimeLow(value)}
            knobColor='red'
            valueLabelsBackgroundColor='black'
            inRangeBarColor='purple'
            outOfRangeBarColor='orange'
            initialValue={waterPumpOnTimeLow}
          />
          <Text>value:  {waterPumpOnTimeLow}ml | recommended: 100ml</Text>
        </View>
        <View>
          <Text style={styles.sectionDescription}>Mid level:</Text>
          <Slider min={0} max={500} step={5}
            valueOnChange={value => setWaterPumpOnTimeMid(value)}
            knobColor='red'
            valueLabelsBackgroundColor='black'
            inRangeBarColor='yellow'
            outOfRangeBarColor='orange'
            initialValue={waterPumpOnTimeMid}
          />
          <Text>value:  {waterPumpOnTimeMid}ml | recommended: 50ml</Text>
        </View>
        <View>
          <Text style={styles.sectionDescription}>High level:</Text>
          <Slider min={0} max={500} step={5}
            valueOnChange={value => setWaterPumpOnTimeHigh(value)}
            initialValue={waterPumpOnTimeHigh}
            knobColor='red'
            valueLabelsBackgroundColor='black'
            inRangeBarColor='green'
            outOfRangeBarColor='orange'
          />
          <Text>value:  {waterPumpOnTimeHigh}ml | recommended: 25ml</Text>
        </View>
        <View style={{ padding: 10, flex: 1 }}>
          <View style={styles.row}>
            <TouchableOpacity
              key="Save"
              style={styles.button}
              onPress={() => autoIrrigateStateSetUp({ id, humLowLevel, humHighLevel, waterPumpOnTimeLow, waterPumpOnTimeMid, waterPumpOnTimeHigh })}
            >
              <Text style={{ textAlign: "center" }} > Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              key="Default"
              style={styles.button}
              onPress={() => (setHumLowLevel(50), setHumHighLevel(70), setWaterPumpOnTimeLow(15), setWaterPumpOnTimeMid(40), setWaterPumpOnTimeHigh(25))}
            >
              <Text style={{ textAlign: "center" }}>Return to default</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    </ScrollView >
  );
};



const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flex: 5,
    marginTop: 5,
    //marginTop: StatusBar.currentHeight || 100,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
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
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "coral",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  button2: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#0096FF",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
});

export default ControlIrgationScreen;