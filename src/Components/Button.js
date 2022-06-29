import React from 'react';
import Loading from './loading.svg';

export default function Button(props) {
    return (
        <div className='button' onClick={props.onClick} style={{
            backgroundColor: props.color,
            marginTop: props.spacing
        }}>
            {props.loading ? <div className='button-loading'>
                <img src={Loading} alt='Loading Animation'/>
            </div> : <div>{props.text}</div>}
        </div>
    )
}