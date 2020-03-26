import React,{useState, useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom'

import './chat.css'
import InfoBar from '../infoBar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages';
import TextContainer from '../textContainer/TextContainer';

let socket;

const Chat = ({location})=>{
    const [name, setName]= useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const ENDPOINT = 'https://b-chat-app.herokuapp.com/'

    useEffect(()=>{
        const {name, room} = queryString.parse(location.search)
        
        socket = io(ENDPOINT);
        
        setName(name);
        setRoom(room)

        socket.emit('join',{name,room},(error)=>{
            if (error) {
                return <Redirect to='/'/>
              }
        })
        return ()=>{
            socket.emit('disconnect')

            //socket.off();
            socket.disconnect()
        }
    },[ENDPOINT, location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages(messages => [...messages, message])
        })

        socket.on('roomData',({users})=>{
            setUsers(users)          
        })
    },[])


    // console.log(users)
    // function for sending messages
    const sendMessage =(e)=>{
        e.preventDefault()

        // clean after sending message
        if(message){
            socket.emit('sendMessage', message, ()=> setMessage(''))
        }
    };

    return (
        <div className="outerContainer">
          <div className="container">
              <InfoBar room={room} />
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
          </div>
              <TextContainer users={users}/>
        </div>
    )
}

export default Chat;