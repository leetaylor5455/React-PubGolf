import React from 'react';

export default function SwipeToAdd(props) {
    return <div className='swipe-to-add' style={{transform: props.show ? 'translate(0, 0%)' : 'translate(0, -130%)'}}>Swipe to Add</div>
}