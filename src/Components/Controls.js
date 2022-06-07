import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import Button from './Button';

function HoleInfo(props) {
    const hole = props.hole;

    return <div className='hole-info'>
        {props.children}
            <div className='hole-info-row' style={{borderTop: '1px solid white'}}>
                <div className='hole-info-label'>Hole {hole.index+1}</div>
                <div className='hole-info-segment'>{hole.location}</div>
            </div>
            <div className='hole-info-row'>
                <div className='hole-info-label'>Par</div>
                <div className='hole-info-segment'>{hole.par}</div>
            </div>
            <div className='hole-info-row'>
                <div className='hole-info-label'>Drink</div>
                <div className='hole-info-segment'>{hole.drink}</div>
            </div>
        </div>
}

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

            <ScoreControls teams={props.game.teams} addPoints={props.addPoints}/>
            
            {(props.game.lastHole) 
                ? <div></div> 
                : <HoleInfo hole={nextHole}>
                    <div className='small-heading' style={{ marginLeft: 'var(--margin)'}}>Next</div>
                </HoleInfo> }
            

            <Button text={props.game.lastHole ? 'Finish Game' : 'Next Hole'} spacing='92px' color='var(--greenBright)' onClick={props.moveToNextHole}/>
        </div>
}