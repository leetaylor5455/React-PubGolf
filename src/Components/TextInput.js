import React from 'react';

export default function TextInput(props) {
    return (
        <input 
            className='text-input' 
            type={props.type} 
            placeholder={props.placeholder} 
            onInput={props.onInput} 
            teamindex={props.teamindex}
            holeindex={props.holeindex}
            location={props.location}
            drink={props.drink}
            style={props.style}    
        />
    )
}