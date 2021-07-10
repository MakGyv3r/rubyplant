import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { Notifications } from "expo";
import { Button } from "react-native";

const LOCATION_FETCH_TASK = "upload-job-task-with-location";
const BACKGROUND_FETCH_TASK = "upload-job-task_test";

Notifications.createCategoryAsync("JOB_UPLOAD_FAILED_CATEGORY", [
  {
    actionId: "Retry",
    buttonTitle: "Retry",
    doNotOpenInForeground: true,
    isDestructive: false,
    isAuthenticationRequired: false
  }
]);

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  await Notifications.presentLocalNotificationAsync({
    title: "Background Fetch",
    body: BACKGROUND_FETCH_TASK,
    ios: { _displayInForeground: true }
  });
  await fetch(
    "https://merchant-app-development.azurewebsites.net/api/notfound-background"
  );
  console.log(BACKGROUND_FETCH_TASK, "running");
  return BackgroundFetch.Result.NewData;
});

TaskManager.defineTask(LOCATION_FETCH_TASK, async () => {
  await Notifications.presentLocalNotificationAsync({
    title: "Background Fetch",
    body: `${LOCATION_FETCH_TASK} - ${Date.now()}`,
    ios: { _displayInForeground: true }
  });
  await fetch(
    "https://merchant-app-development.azurewebsites.net/api/notfound-location"
  );
  console.log(LOCATION_FETCH_TASK, "running");
});

export default function App() {
  useEffect(() => {
    const initBackgroundFetch = async () => {
      console.log("initBackgroundFetch()");

      const locationPermission = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const notificationPermission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (
        locationPermission.status === "granted" &&
        notificationPermission.status === "granted"
      ) {
        await Notifications.presentLocalNotificationAsync({
          categoryId: "JOB_UPLOAD_FAILED_CATEGORY",
          title: "Background Fetch",
          body: "Setting up jobs",
          ios: { _displayInForeground: true }
        });
        const registered = await TaskManager.isTaskRegisteredAsync(
          LOCATION_FETCH_TASK
        );
        if (registered) {
          console.log("registered");
        }

        const backgroundFetchStatus = await BackgroundFetch.getStatusAsync();
        switch (backgroundFetchStatus) {
          case BackgroundFetch.Status.Restricted:
            console.log("Background fetch execution is restricted");
            return;

          case BackgroundFetch.Status.Denied:
            console.log("Background fetch execution is disabled");
            return;

          default:
            console.log("Background fetch execution allowed");

            let isRegistered = await TaskManager.isTaskRegisteredAsync(
              LOCATION_FETCH_TASK
            );
            if (isRegistered) {
              console.log(`Task ${LOCATION_FETCH_TASK} already registered`);
            } else {
              console.log("Background Fetch Task not found - Registering task");
            }
            await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
              minimumInterval: 10,
              startOnBoot: false,
              stopOnTerminate: false
            });
            await Location.startLocationUpdatesAsync(LOCATION_FETCH_TASK, {
              accuracy: Location.Accuracy.Lowest,
              deferredUpdatesInterval: 60000,
              deferredUpdatesDistance: 1000,
              distanceInterval: 1000,
              foregroundService: {
                notificationBody: "Uploading Jobs if available",
                notificationTitle: "Background Fetch"
              }
            });
            await BackgroundFetch.setMinimumIntervalAsync(600);
            console.log("registerTaskAsync");
            await Notifications.presentLocalNotificationAsync({
              title: "Background Fetch",
              body: "Jobs Set Up",
              ios: { _displayInForeground: true }
            });
            break;
        }
      }
    };
    initBackgroundFetch();
  }, []);

  useEffect(() => {
    Notifications.addListener(notification => {
      console.log(`New Notification: ${JSON.stringify(notification)}`);
    });
  }, []);

  const onDisableTask = async () => {
    const isRegisterd = await TaskManager.isTaskRegisteredAsync(
      LOCATION_FETCH_TASK
    );
    if (isRegisterd)
      await Location.stopLocationUpdatesAsync(LOCATION_FETCH_TASK);

    const isRegisterdFetch = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    if (isRegisterdFetch)
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! 2.1.13</Text>
      <Button
        onPress={onDisableTask}
        title="Disable Background Task"
        color="#841584"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});