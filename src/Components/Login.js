import React, { useState, useRef } from 'react';
import Dialogue from './Dialogue';
import Title from './Title';
import TextInput from './TextInput';
import IncorrectPassword from './IncorrectPassword';
import Button from './Button';
import { Constants } from '../App';
import axios from 'axios';

export default function Login(props) {


    const [resStatus, setResStatus] = useState(0);
    const [password, setPassword] = useState('');
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const passwordInputRef = useRef();

    const onPasswordInput = (e) => {
        setResStatus(0);
        setPassword(e.target.value);
    }

    const loginRequest = async () => {

        setAwaitingResponse(true);
        const res = await axios({
            method: 'POST',
            url: Constants.URL + '/auth',
            data: {
                username: 'main',
                password: password
            }
        }).catch(function (error) {
            setResStatus(error.response.status);
            setPassword('');
            passwordInputRef.current.value = '';
            setAwaitingResponse(false);
            if (error.response) return console.log('Error in request.');
            if (error.request) return console.log('No response received.');
        });

        try {
            if (res.data.jwt) {
                setAwaitingResponse(false);
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
        } catch {
            console.log('No data.')
        }
    }

    return (
        <div className='login'>
            <Title title='Login'/>

            <div>
                <Dialogue title='Password' marginTop='15vh' >
                    <TextInput 
                        type='password' 
                        placeholder='Enter'
                        onInput={onPasswordInput}
                        ref={passwordInputRef}
                    />
                </Dialogue>
                <IncorrectPassword show={ (resStatus === 401 && !password) ? true : false }/>
            </div>

            <Button loading={awaitingResponse} text='Submit' color={ password ? 'var(--greenBright)' : 'var(--greyLight)'} spacing='26vh' onClick={loginRequest}/>
        </div>
    )
}