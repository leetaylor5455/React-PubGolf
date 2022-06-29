import React from 'react';

export default function IncorrectPassword(props) {
    return <div className='swipe-to-add incorrect-password' style={{transform: props.show ? 'translate(0, 0%)' : 'translate(0, -130%)'}}>Incorrect Password</div>
}