import React from 'react';

export default function Dialogue(props) {
    return (
        <div className="dialogue" style={{
            marginTop: props.marginTop
        }}
        onClick={props.onClick}>
            <div className="dialogue-title">{props.title}</div>
            <div className='dialogue-content'>{props.children}</div>
        </div>
    )
}