import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import './joinAdmin.css';

const JoinAdmin = ({setRoom, setName, setSignIn})=>{
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { 
        setName(data.name)
        setRoom(data.room)
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
                <Form.Group>
                    <Form.Control 
                    type="password" 
                    placeholder="password"
                    name="room"
                    ref={register({ required: true })}
                    />
                   <span className="error"> {errors.room && 'password is required'}</span>
                </Form.Group>
                <Button variant="primary" type="submit" className="button">
                  Sign In
                </Button>
            </div>
           </div>
        </form>
    )
}

export default JoinAdmin;