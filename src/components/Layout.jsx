import React, {useState} from 'react';

import Join from './join/Join'
import Chat from './chat/Chat'

const Layout =()=>{
    const [name, setName]= useState('');
    const [room, setRoom] = useState('');
    const [signIn, setSignIn] = useState(false)

    return (
        <>
            {signIn?
                <Chat name={name} room={room}/>:
                <Join  setName={setName} setRoom={setRoom} setSignIn={setSignIn}/>
            }
        </>
    )
};

export default Layout;