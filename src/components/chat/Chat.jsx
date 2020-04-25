import React,{useState, useEffect} from 'react'
import io from 'socket.io-client';

import './chat.css'
import InfoBar from '../infoBar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages';
import TextContainer from '../textContainer/TextContainer';

let socket;

const Chat = ({name, room})=>{
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const ENDPOINT = 'https://b-chat-app.herokuapp.com/';

    useEffect(()=>{        
        socket = io(ENDPOINT);
        socket.emit('join',{name,room},(error)=>{
            if (error) {
                alert(error)
              }
        })
        return ()=>{
            socket.emit('disconnect')

            //socket.off();
            socket.disconnect()
        }
    },[ENDPOINT,name]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages(messages => [...messages, message])
        })

        socket.on('roomData',({users})=>{
            setUsers(users)          
        })
    },[])

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
              <InfoBar />
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
          </div>
              <TextContainer users={users}/>
        </div>
    )
}

export default Chat;