import React from 'react';

export default function TextInput(props) {
    return (
        <input className='text-input' type={props.type} placeholder={props.placeholder} onInput={props.onInput} id={props.id}/>
    )
}