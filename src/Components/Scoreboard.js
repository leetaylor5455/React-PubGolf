import React from 'react';

export default function Scoreboard(props) {
    return <div className='scoreboard-container'>
        <div className='small-heading'>Scores</div>
        <div className='scoreboard'>
            {props.teams.map(team => (
                <div key={'scoreboard-item'+team.position} className='scoreboard-item'>
                    <div className='scoreboard-name'>{team.name}</div>
                    <div className='scoreboard-score'>{team.score}</div>
                </div>
            ))}
        </div>
    </div>
}