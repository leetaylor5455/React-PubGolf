import React from 'react';

export default function HazardBanner(props) {

    if (props.type == 'water') {
        return <div className='hazard-banner' 
            style={props.type == 'water' ? { backgroundColor: '#0E9CEC' } : { backgroundColor: '#FEB017'}}>
            {props.type == 'water' ? 'Water' : 'Bunker'} Hazard!
        </div>
    }
    return <></>
    
}