import React from 'react';

export default function HazardBanner(props) {

    return <div className='hazard-banner' 
            style={props.type == 'water' ? { backgroundColor: '#0E9CEC' } : { backgroundColor: '#FEB017'}}>
        {props.type == 'water' ? 'Water' : 'Bunker'} Hazard!
    </div>
}