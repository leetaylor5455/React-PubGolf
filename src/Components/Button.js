import React from 'react';

export default function Button(props) {
    return (
        <div className='button' onClick={props.onClick} style={{
            backgroundColor: props.color,
            // marginTop: props.spacing
        }}>
            {props.text}
        </div>
    )
}