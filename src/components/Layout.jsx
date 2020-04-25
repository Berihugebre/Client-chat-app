import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import Join from './join/Join'
import Chat from './chat/Chat'
import JoinAdmin from './joinAdmin/JoinAdmin'

const Layout =()=>{
    const [name, setName]= useState('');
    const [room, setRoom] = useState('');
    const [signIn, setSignIn] = useState(false)

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {signIn?
                        <Chat name={name} room={room}/>:
                        <Join  setName={setName} setRoom={setRoom} setSignIn={setSignIn}/>
                    }
                </Route>
                <Route exact path="/admin">
                    {signIn?
                        <Chat name={name} room={room}/>:
                        <JoinAdmin  setName={setName} setRoom={setRoom} setSignIn={setSignIn}/>
                    }
                </Route>
            </Switch>
        </Router>
    )
};

export default Layout;