import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../../components/Spacer';
import { Context as AuthContext } from '../../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import NotificationBackgroundTask from './components/NotificationBackgroundTask'


const AccountScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  return (
    <>
      <>
        <SafeAreaView forceInset={{ top: 'always' }}>
          <Spacer>
            <Button title="Sign out" onPress={signout} />
          </Spacer>
        </SafeAreaView>
      </>
      <>
        <NotificationBackgroundTask />
      </>
      <>
        <Spacer>
          <Button title="WiFi network" onPress={() => { navigation.navigate('WiFiNetwork') }} />
        </Spacer>
      </>
      <>
        <Spacer>
          <Button title="Location Services " onPress={() => { navigation.navigate('LocationServices') }} />
        </Spacer>
      </>
    </>
  );
};

AccountScreen.navigationOptions = {
  title: 'Account Screen',
  tabBarIcon: <FontAwesome name="gear" size={20} />,
};
const styles = StyleSheet.create({});
export default AccountScreen;

