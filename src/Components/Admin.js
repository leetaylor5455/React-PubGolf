import React, { useState } from 'react';
import Login from './Login';
import Setup from './Setup';

export default function Admin() {

    const [jwt, setJwt] = useState('');
    const [game, setGame] = useState();

    if (game) console.log(game);

    return (
        <div>
            {!jwt
                ? <Login setJwt={setJwt} setGame={setGame}/>
                : !game
                    ? <Setup />
                    : <div>Game</div>
            }
        </div>
    )
}