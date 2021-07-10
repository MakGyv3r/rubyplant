import React,{useState,useEffect} from 'react';
import io from 'socket.io-client';
import {url} from '../api/Config';
import {initsocket,client} from '../api/SocketConfig'


// Use socket to fetch request to data 
// Socket server's url and topic in which data is sent
const useSocket = ( topic,loading) => {
    const [data, setData] = useState('');
    const [reaciveData, setreaciveData] = useState(false);

    const changeData= ()=>  {client.on(topic, (dataServer) => {
      setreaciveData(true)
      console.log(`the data from server:${dataServer}`);
      setData(dataServer);
      console.log(``);
      console.log(`the data from State:${data}`);
      setreaciveData(false);
      })
    }
    const clearErrorMessage =()=>setData('');
    const ErrorMessage =()=> setData('somting want wrong please try agin');
    
  useEffect(() => {
    changeData();
  }, []);

    return { data, client,reaciveData,clearErrorMessage,changeData,ErrorMessage};
}


export default useSocket;
