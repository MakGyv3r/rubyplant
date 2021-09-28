import React, { useContext } from 'react'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, ChartDataPoint, Tooltip } from 'react-native-responsive-linechart'
import { Context as ProductDataContext } from '../../../context/ProductDetailContext'
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native'
import moment from 'moment';

const ChartScreen = ({ navigation }) => {
  const { state } = useContext(ProductDataContext);
  const id = navigation.getParam('_id');
  const object = state.data.find(({ _id }) => _id === id);

  let dataLightSensor = [];
  object.lightSensor.tests.forEach(element => {
    dataLightSensor.push({ x: moment(element.time).unix(), y: element.status })
  });
  dataLightSensor.sort((a, b) => (a.x > b.x) ? 1 : -1);

  let dataMoistureSensor = [];
  object.moistureSensor.tests.forEach(element => {
    dataMoistureSensor.push({ x: moment(element.time).unix(), y: element.status })
  });
  dataMoistureSensor.sort((a, b) => (a.x > b.x) ? 1 : -1);

  return (
    <ScrollView>
      <>
        <Text>Moisture Sensor Chart</Text>
        <Chart
          style={{ height: 300, width: Dimensions.get("window").width }}
          data={
            dataMoistureSensor
          }
          padding={{ left: 40, bottom: 110, right: 30, top: 20 }}
          xDomain={{ min: dataMoistureSensor[0].x - 10, max: dataMoistureSensor[dataMoistureSensor.length - 1].x }}
          yDomain={{ min: 0, max: 110 }}

        >
          <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
          <HorizontalAxis tickCount={5} theme={{
            labels: {
              visible: true,
              label: { rotation: 75, textAnchor: 'start', },
              formatter: (x) => {
                const m = moment.unix(x);
                const Data = m.format("YYYY-MM-DD hh:mm:ss")
                // console.log('date', date);
                return Data
              }
            }
          }} />
          <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } } }} />
          <Line
            tooltipComponent={<Tooltip />}
            theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }, selected: { color: 'red' } } }} />
        </Chart>
      </>
      <>
        <Text>Light Sensor Chart</Text>
        <Chart
          style={{ height: 300, width: Dimensions.get("window").width }}
          data={
            dataLightSensor
          }
          padding={{ left: 40, bottom: 110, right: 30, top: 20 }}
          xDomain={{ min: dataLightSensor[0].x - 10, max: dataLightSensor[dataLightSensor.length - 1].x }}
          yDomain={{ min: 0, max: 110 }}
        >
          <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
          <HorizontalAxis tickCount={5} theme={{
            labels: {
              visible: true,
              label: { rotation: 75, textAnchor: 'start', },
              formatter: (x) => {
                const m = moment.unix(x);
                const Data = m.format("YYYY-MM-DD hh:mm:ss")
                // console.log('date', date);
                return Data
              }
            }
          }} />
          <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } } }} />
          <Line
            tooltipComponent={<Tooltip />}
            theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }, selected: { color: 'red' } } }} />
        </Chart>
      </>
    </ScrollView>
  )
};

ChartScreen.navigationOptions = () => {
  title: 'Chart';
};

const styles = StyleSheet.create({

});

export default ChartScreen;
