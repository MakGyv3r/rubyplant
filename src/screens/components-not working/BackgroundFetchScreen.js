
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { CheckBox } from 'react-native-elements'
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const BACKGROUND_FETCH_TASK = 'background-fetch';

const content = { title: 'I am a one, hasty notification.' };

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();
  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
  Notifications.scheduleNotificationAsync({ content, trigger: null });

  // Be sure to return the successful result type!
  return BackgroundFetch.Result.NewData;
});

// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
const registerBackgroundFetchAsync = async () => {
  return await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
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
      <View style={styles.textContainer}>
        <Text>
          Background fetch status:{' '}
          <Text >{status ? BackgroundFetch.Status[status] : null}</Text>
        </Text>
        <Text>
          Background fetch task name:{' '}
          <Text >
            {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
          </Text>
        </Text>
      </View>
      <View style={styles.textContainer}></View>
      <CheckBox
        center
        title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
        checked={isRegistered}
        onPress={toggleFetchTask}
      />
      {/* <Button
        title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
        onPress={toggleFetchTask}
      /> */}
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