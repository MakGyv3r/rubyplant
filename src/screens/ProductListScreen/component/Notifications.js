import * as Notifications from 'expo-notifications';

const BACKGROUND_FETCH_TASK = 'background-fetch';


Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});


const Notifications1 = (content) => {
  console.log(content);
  Notifications.scheduleNotificationAsync({ content, trigger: null });
};

export default Notifications1;