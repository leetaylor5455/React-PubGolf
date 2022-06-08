import React from 'react';

export default function HoleInfo(props) {
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