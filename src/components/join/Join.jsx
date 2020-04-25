import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import './join.css';

const Join = ({setRoom, setName, setSignIn})=>{
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { 
        const room = Math.random().toString(36).slice(-8);//random room
        setName(data.name)
        setRoom(room)
        setSignIn(true)
     }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="joinOuterContainer"> 
            <div className="joinContainer">
                <h1 className="heading">Chat Me</h1>
                <Form.Group>
                    <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    ref={register({ required: true })}
                    />
                   <span className="error"> {errors.name && 'name is required'} </span>
                </Form.Group>
                <Button variant="primary" type="submit" className="button">
                  Sign In
                </Button>
            </div>
           </div>
        </form>
    )
}

export default Join;