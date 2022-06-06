import React from 'react';
import Title from './Title';
import Button from './Button';

export default function SetupSummary(props) {


    return <div style={{paddingBottom: '50px'}}>
        <Title title='Summary'/>

        <div className='summary-teams'>
            <div className='small-heading'>Teams</div>
            {props.teams.map(team => (
                <div className='summary-team-item'>
                    {team.name}
                </div> 
            ))}
        </div>

        <div className='summary-holes'>
            <div className='small-heading'>Holes</div>
            {props.course.map((hole, index) => (
                <div className='summary-hole-item'>
                    <div className='summary-hole-item-number'>{index+1}</div>
                    <div className='summary-hole-item-middle'>
                        <div className='summary-hole-item-info'>{hole.location}</div>
                        <div className='summary-hole-item-info'>{hole.drink}</div>
                    </div>
                    <div className='summary-hole-item-par'><span className='par-subscript'>Par</span>{hole.par}</div>
                </div>
            ))}
        </div>

        <Button text='Start' color='var(--greenBright)' spacing='96px'/>
        <Button text='Edit Teams' color='var(--red)' spacing='38px'/>
        <Button text='Edit Course' color='var(--red)' spacing='38px'/>
    </div>
}