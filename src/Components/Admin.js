import React, { useEffect, useState } from 'react';
import { Constants } from '../App';
import HolesSetup from './HolesSetup';
import Login from './Login';
import TeamsSetup from './TeamsSetup';
import SetupSummary from './SetupSummary';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Admin() {

    let jwtCookie;
    const [jwt, setJwt] = useState('');
    const [game, setGame] = useState();

    const setJwtCookie = (jwt) => {
        cookies.set('jwt', jwt);
    }

    useEffect(() => {
        const verifyJwt = async () => {
            jwtCookie = cookies.get('jwt');

            if (jwtCookie) {
                const res = await axios({
                    method: 'GET',
                    url: Constants.URL + '/auth/jwt',
                    headers: {
                        'x-auth-token': jwtCookie
                    }
                });
    
                if (res.data.jwt) setJwt(res.data.jwt);
                if (res.data.game) setGame(res.data.game);
            }
        }
        verifyJwt(); 
    }, []);

    useEffect(() => {
        if (jwt && !game) setStage(1);
        if (jwt && game) setStage(4); 
    }, [jwt, game]);

    // 0: no jwt, no game -> login
    // 1: jwt, no game -> team setup
    // 2: -> hole setup
    // 3: -> summary
    // 4: -> game in progress
    const [stage, setStage] = useState(0);

    const [teams, setTeams] = useState([{ name: '' }]);
    const [course, setCourse] = useState([{ name: '', drink: '', par: 0 }]);

    if (game) console.log(game);

    switch (stage) {
        case 0:
            return <Login setJwt={setJwt} setGame={setGame} setStage={setStage} setJwtCookie={setJwtCookie}/>;
        case 1:
            return <TeamsSetup teams={teams} setTeams={setTeams} setStage={setStage}/>
        case 2:
            return <HolesSetup course={course} setCourse={setCourse} setStage={setStage}/>
        case 3:
            return <SetupSummary teams={teams} course={course}/>
        case 4:
            return <div>Controls</div>
    }
    
}