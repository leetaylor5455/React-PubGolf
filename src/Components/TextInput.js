import React from 'react';

const TextInput = React.forwardRef((props, ref) => (
    <input 
        key={'teaminput' + props.holeindex}
        className='text-input' 
        type={props.type} 
        placeholder={props.placeholder} 
        value={props.value}
        onInput={props.onInput} 
        teamindex={props.teamindex}
        holeindex={props.holeindex}
        location={props.location}
        drink={props.drink}
        style={props.style}
        ref={ref}    
    />
));

export default TextInput;
