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
          <Text style={{ fontSize: 48 }}>AccountScreen</Text>
          <Spacer>
            <Button title="Sign out" onPress={signout} />
          </Spacer>
        </SafeAreaView>
      </>
      <>
        <NotificationBackgroundTask />
      </>
      <>
        <Button title="WiFi network" onPress={() => { navigation.navigate('WiFiNetwork') }} />
      </>
    </>
  );
};

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="gear" size={20} />,
};
const styles = StyleSheet.create({});
export default AccountScreen;

