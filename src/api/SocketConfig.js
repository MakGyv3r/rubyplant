import { url } from './Config';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';


export let client;
export const initsocket = () => {
  console.log("connect");
  client = io(url, {
    transports: ["websocket"],
    upgrade: false,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    auth: async (cb) => {
      cb({
        token: await AsyncStorage.getItem('token')
      });
    }
  });

  client.on("storeApp", () => { client.emit("storeAppClientInfo") });
}


