import React from 'react';
import Title from './Title';
import Scoreboard from './Scoreboard';
import Button from './Button';
import axios from 'axios';
import { Constants } from '../App';

export default function Summary(props) {

    const deleteGame = async () => {
        const res = await axios({
            method: 'DELETE',
            url: Constants.URL + '/games',
            headers: { 'x-auth-token': props.admin.jwt }
        });

        if (res.status == 200) window.location.reload();
    }

    return <div>
        <Title title='Summary'/>

        <Scoreboard teams={props.game.orderedTeams} />

        {props.admin
            ? <Button 
                text='Discard Game'
                color='var(--red)' 
                spacing='15vh' 
                onClick={deleteGame}
            />
            : <></>
        }
    </div>
}