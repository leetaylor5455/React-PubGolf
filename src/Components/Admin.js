import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import { Constants } from '../App';
import HolesSetup from './HolesSetup';
import Login from './Login';
import TeamsSetup from './TeamsSetup';
import SetupSummary from './SetupSummary';
import Controls from './Controls';
import Summary from './Summary';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Admin() {

    let ws = new WebSocket('ws://localhost:8080/');
    let jwtCookie;
    const [jwt, setJwt] = useState('');
    const [game, setGame, gameRef] = useState();

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


        // Begin socket
        ws.onopen = () => {
            console.log('ws open')
        }

        ws.onmessage = (event) => {
            const res = JSON.parse(event.data);
            console.log(res);
            setGame(res);
        }

    }, []);

    useEffect(() => {
        if (jwt && !game) setStage(1);
        if (jwt && game && !game.complete) {
            setStage(4);
        }

        if (game) {
            if (game.complete) setStage(5);
        }

    }, [jwt, game]);

    // 0: no jwt, no game -> login
    // 1: jwt, no game -> team setup
    // 2: -> hole setup
    // 3: -> setup summary
    // 4: -> game in progress
    // 5: -> game summary
    const [stage, setStage] = useState(0);

    const [teams, setTeams, teamsRef] = useState([{ name: '' }]);
    const [course, setCourse, courseRef] = useState([{ location: '', drink: '', par: 0, index: 0 }]);

    const submitGame = async () => {
        const res = await axios({
            method: 'POST',
            url: Constants.URL + '/games/newgame',
            headers: { 'x-auth-token': jwt },
            data: {
                course: {
                    holes: courseRef.current
                },
                teams: teamsRef.current
            }
        });

        if (res.status == 200) {
            // Populate game object per schema
            setGame(res.data);
        } else {
            console.log('Bad request.');
        }

        console.log(res);

    }

    const addPoints = (teamId, points) => {
        axios({
            method: 'POST',
            url: Constants.URL + '/games/addpoints',
            headers: { 'x-auth-token': jwt },
            data: {
                'game_id': game._id,
                'team_id': teamId,
                'points': points
            }
        });
    }

    const moveToNextHole = () => {
        axios({
            method: 'GET',
            url: Constants.URL + '/games/nexthole',
            headers: { 'x-auth-token': jwt },
        });
    }

    switch (stage) {
        case 0:
            return <Login setJwt={setJwt} setGame={setGame} setStage={setStage} setJwtCookie={setJwtCookie}/>;
        case 1:
            return <TeamsSetup teams={teams} setTeams={setTeams} setStage={setStage}/>
        case 2:
            return <HolesSetup course={course} setCourse={setCourse} setStage={setStage}/>
        case 3:
            return <SetupSummary teams={teams} course={course} setStage={setStage} submitGame={submitGame}/>
        case 4:
            return <Controls game={gameRef.current} addPoints={addPoints} moveToNextHole={moveToNextHole}/>
        case 5:
            return <Summary game={gameRef.current}/>
    }
    
}