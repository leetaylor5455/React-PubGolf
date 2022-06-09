import React, { useEffect, useState } from 'react';
import Scoreboard from './Scoreboard';
import HoleInfo from './HoleInfo';
import HazardBanner from './HazardBanner';
import RulesHandbook from './RulesHandbook';

export default function LiveInfo(props) {

    useEffect(() => {
        // Begin socket
        props.ws.onopen = () => {
            console.log('ws open')
        }

        props.ws.onmessage = (event) => {
            const res = JSON.parse(event.data);
            console.log(res);
            props.setGame(res);
            // setGame(res);
        }
    }, [])

    const [currentHole, setCurrentHole] = useState(props.game.currentHole);
    const [nextHole, setNextHole] = useState(props.game.nextHole);
    const [teams, setTeams] = useState(props.game.orderedTeams);

    useEffect(() => {
        setCurrentHole(props.game.currentHole);
        setNextHole(props.game.nextHole);
        setTeams(props.game.orderedTeams);
    }, [props.game]);

    return <div className='live-info'>

        <HoleInfo hole={currentHole}/>

        {currentHole.bunkerHazard ? <HazardBanner type='bunker'/> : <></>}
        {currentHole.waterHazard ? <HazardBanner type='water'/> : <></>}

        {/* <HazardBanner type='water'/>
        <HazardBanner type='bunker'/> */}

        <Scoreboard teams={teams}/>
        {(props.game.lastHole) 
            ? <div></div> 
            : <HoleInfo hole={nextHole}>
                <div className='small-heading' style={{ marginLeft: 'var(--margin)'}}>Next</div>
            </HoleInfo> }

        <RulesHandbook />
        <div style={{height: '64px'}}></div>
    </div>
}