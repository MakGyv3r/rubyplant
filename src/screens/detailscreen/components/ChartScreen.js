import React, { useContext } from 'react'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, ChartDataPoint } from 'react-native-responsive-linechart'
import { Context as ProductDataContext } from '../../../context/ProductDetailContext'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import moment from 'moment';

const ChartScreen = ({ navigation }) => {
  const { state } = useContext(ProductDataContext);
  const id = navigation.getParam('_id');
  const object = state.data.find(({ _id }) => _id === id);

  let dataLightSensorLabels = [];
  let dataLightSensorData = [];
  let dataSensor = [];
  object.lightSensor.tests.forEach(element => {
    dataSensor.push({ x: moment(element.time).unix(), y: element.status })
    // dataLightSensorLabels.push(element.time);
    // dataLightSensorData.push(element.status);
  });

  console.log('dataSensor', dataSensor);
  dataSensor.sort((a, b) => (a.x > b.x) ? 1 : -1);
  // if ((dataLightSensorLabels.length > 10) && (dataLightSensorLabels.length - 10 >= 10))
  //   dataLightSensorLabels = dataLightSensorLabels.slice(dataLightSensorLabels.length - 10)
  // if ((dataLightSensorData.length > 10) && (dataLightSensorData.length - 10 >= 10))
  //   dataLightSensorData = dataLightSensorData.slice(dataLightSensorData.length - 10)

  // const data = dataLightSensorLabels.map((date, index) => {
  //   // console.log(date);
  //   const x = moment(date).unix()
  //   return {
  //     x,
  //     y: dataLightSensorData[index],
  //   }

  // })


  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <Chart
        style={{ height: 500, width: Dimensions.get("window").width }}
        data={
          dataSensor
        }
        padding={{ left: 40, bottom: 80, right: 20, top: 20 }}
        xDomain={{ min: dataSensor[0].x, max: dataSensor[dataSensor.length - 1].x }}
        yDomain={{ min: 0, max: 110 }}
      >
        <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
        <HorizontalAxis tickCount={5} theme={{
          labels: {
            visible: true,
            label: { rotation: 50, textAnchor: 'start', },
            formatter: (x) => {
              const m = moment.unix(x);
              const Data = m.format("YYYY-MM-DD hh:mm:ss")
              // console.log('date', date);
              return Data
            }
          }
        }} />
        <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } } }} />
        <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 } } }} />
      </Chart>
    </View>
  )
};

ChartScreen.navigationOptions = () => {
  title: 'Chart';
};

const styles = StyleSheet.create({

});

export default ChartScreen;
