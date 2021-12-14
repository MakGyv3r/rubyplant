import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { CheckBox } from 'react-native-elements'
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const BACKGROUND_FETCH_TASK = 'background-fetch';

const registerBackgroundFetchAsync = async () => {
  return await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 5, // 60*15 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}


const unregisterBackgroundFetchAsync = async () => {
  return await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

const BackgroundFetchScreen = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(false);



  useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }
    checkStatusAsync();
  };

  return (
    <>
      <CheckBox
        center
        title={isRegistered ? 'Click Here to stop getting notifications' : 'Click Here to get notifications'}
        checked={isRegistered}
        onPress={toggleFetchTask}
      />
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

});

export default BackgroundFetchScreen;