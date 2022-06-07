import React from 'react';
import Title from './Title';
import Scoreboard from './Scoreboard';

export default function Summary(props) {

    return <div>
        <Title title='Summary'/>

        <Scoreboard teams={props.game.teams} />
    </div>
}