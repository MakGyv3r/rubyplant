import { url } from './Config';
import io from 'socket.io-client';
import { useEffect } from 'react';


export let client;

export const initsocket = () => {
  console.log("connect");
  client = io(url, {
    transports: ["websocket"],
    upgrade: false,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
  });

  client.on("storeApp", () => { client.emit("storeAppClientInfo") });
}


