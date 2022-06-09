import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import Button from './Button';
import HoleInfo from './HoleInfo';
import HazardBanner from './HazardBanner';
import RulesHandbook from './RulesHandbook';

function ScoreControlItem(props) {
    const team = props.team;
    return <div className='score-control-item'>
        {/* <div className='score-control-item-position'>{team.position}</div> */}
        <div className='score-control-item-name'>{team.name}</div>
        <div className='score-control-item-controls'>
            <div className='score-control-item-minus' onClick={() => { props.addPoints(team._id, -1) }}>-</div>
            <div className='score-control-item-score'>{team.score}</div>
            <div className='score-control-item-plus' onClick={() => { props.addPoints(team._id, 1) }}>+</div>
        </div>
    </div>
}

function ScoreControls(props) {
    const teams = props.teams;
    return <div className='score-controls'>
        <div className='small-heading'>Scores</div>
        {teams.map((team, index) => (
            <ScoreControlItem key={'controlitem' + index} team={team} addPoints={props.addPoints}/>
        ))}
    </div>
}

export default function Controls(props) {
    // console.log(props.game);

    const [currentHole, setCurrentHole] = useState(props.game.currentHole);
    const [nextHole, setNextHole] = useState(props.game.nextHole);

    useEffect(() => {
        setCurrentHole(props.game.currentHole);
        setNextHole(props.game.nextHole);
    }, [props.game]);

    return <div className='controls'>
            <HoleInfo hole={currentHole}/>

            {currentHole.bunkerHazard ? <HazardBanner type='bunker'/> : <></>}
            {currentHole.waterHazard ? <HazardBanner type='water'/> : <></>}

            <ScoreControls teams={props.game.teams} addPoints={props.addPoints}/>
            
            {(props.game.lastHole) 
                ? <div></div> 
                : <HoleInfo hole={nextHole}>
                    <div className='small-heading' style={{ marginLeft: 'var(--margin)'}}>Next</div>
                </HoleInfo> }

            <RulesHandbook />
            

            <Button text={props.game.lastHole ? 'Finish Game' : 'Next Hole'} spacing='38px' color='var(--greenBright)' onClick={props.moveToNextHole}/>
            <div style={{height: '100px'}}></div>
        </div>
}