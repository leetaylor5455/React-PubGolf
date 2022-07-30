import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from './Button';
import HoleInfo from './HoleInfo';
import HazardBanner from './HazardBanner';
import RulesHandbook from './RulesHandbook';


function ScoreControlItem(props) {

    const swiperRef = useRef(null);
    
    function onSlideChange(data) {
        const index = data.index;
        if (index === 0) props.setScored(data.team._id, true)
        if (index === 1) props.setScored(data.team._id, false);
    }

    const team = props.team;
    let initialSlide;

    if (team.scored) {
        initialSlide = 0;
        // swiperRef.current?.swiper.slideTo(0);
    } else {
        initialSlide = 1;
        // swiperRef.current?.swiper.slideTo(1);
    }

    return <Swiper className='score-control-item' ref={swiperRef} initialSlide={initialSlide}
            onSlideChange={(swiper) => onSlideChange({ index: swiper.activeIndex, team: team })}
        >
        <SwiperSlide className='score-control-item-inactive'>
            <div className='score-control-item-position'>{team.position}</div>
            <div className='score-control-item-name'>{team.name}</div>
            <div className='score-control-item-score' style={{flexGrow: 1, textAlign: 'right'}}>{team.score}</div>
        </SwiperSlide>
        <SwiperSlide className='score-control-item-active'>
            <div className='score-control-item-position'>{team.position}</div>
            <div className='score-control-item-name'>{team.name}</div>
            <div className='score-control-item-controls'>
                <div className='score-control-item-minus' onClick={() => { console.log(team.position); props.addPoints(team._id, -1) }}>-</div>
                <div className='score-control-item-score'>{team.score}</div>
                <div className='score-control-item-plus' onClick={() => { props.addPoints(team._id, 1) }}>+</div>
            </div>
        </SwiperSlide>
    </Swiper>
}

function ScoreControls(props) {
    const teams = props.teams;
    return <div className='score-controls'>
        <div className='small-heading'>Scores</div>
        {teams.map((team, index) => (
            <ScoreControlItem key={'controlitem' + index} team={team} addPoints={props.addPoints} setScored={props.setScored}/>
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

    useEffect(() => {
        if (props.game.complete) {
            props.setStage(5);
        }
    }, []);

    return <div className='controls'>
            <HoleInfo hole={currentHole}/>

            {currentHole.bunkerHazard ? <HazardBanner type='bunker'/> : <></>}
            {currentHole.waterHazard ? <HazardBanner type='water'/> : <></>}

            <ScoreControls teams={props.game.teams} addPoints={props.addPoints} setScored={props.setScored}/>
            
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