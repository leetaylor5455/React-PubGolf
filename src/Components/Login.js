import React, { useState, useEffect } from 'react';
import Dialogue from './Dialogue';
import Title from './Title';
import TextInput from './TextInput';
import Button from './Button';
import { Constants } from '../App';
import axios from 'axios';

export default function Login(props) {

    const [password, setPassword] = useState('');

    const onPasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const loginRequest = async () => {

        const res = await axios({
            method: 'POST',
            url: Constants.URL + '/auth',
            data: {
                username: 'main',
                password: password
            }
        });

        if (res.data.jwt) {
            // Save jwt as cookie
            props.setJwtCookie(res.data.jwt);

            if (res.data.game) {
                // jwt and game return -> stage 4: in progress
                props.setStage(4);
                return props.setGame(res.data.game);
            }

            // Just jwt returned -> stage 2: teams setup
            props.setStage(1);
            return props.setJwt(res.data.jwt);
        }
    }

    return (
        <div className='login'>
            <Title title='Login'/>

            <Dialogue title='Password' marginTop='15vh' >
                <TextInput 
                    type='password' 
                    placeholder='Enter'
                    onInput={onPasswordInput}
                />
            </Dialogue>

            <Button text='Submit' color={'var(--greenBright)'} spacing='26vh' onClick={loginRequest}/>
        </div>
    )
}