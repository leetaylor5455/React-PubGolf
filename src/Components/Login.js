import React, { useState } from 'react';
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
            props.setJwt(res.data.jwt);

            if (res.data.game) return props.setGame(res.data.game);

            return;
        }
    }

    return (
        <div className='login'>
            <Title title='Login'/>

            <Dialogue title='Password' marginTop='15vh' content={
                <TextInput 
                    type='password' 
                    placeholder='Enter'
                    onInput={onPasswordInput}
                />
            }/>

            <Button text='Submit' color={'var(--greenBright)'} spacing='22vh' onClick={loginRequest}/>
        </div>
    )
}