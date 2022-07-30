import React, { useState } from 'react';

export default function RulesHandbook() {

    const [open, toggle] = useState(false);

    const childStyle = open
        ? { height: '52px',
            color: 1,
            borderColor: 'var(--greyLight)',
            transform: 'translate(0, 0%)'
          }
        : { height: '0px',
            opacity: 0,
            borderColor: 'transparent',
            transform: 'translate(0, 0%)'
          }

    return <div className='rules-handbook'>
        <div className='rules-dropdown-button' onClick={() => toggle(!open)}>
            <div className='rules-dropdown-button-text'>Rules Handbook</div>
            <div className='rules-dropdown-button-triangle' style={ open 
                ? { transform: 'rotateX(180deg)' } 
                : { transform: 'rotateX(0deg)'}}>
                <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.194 15.3006C10.4101 16.5497 8.58988 16.5497 7.80595 15.3006L0.59695 3.81311C-0.23893 2.48114 0.718481 0.75 2.291 0.75L16.709 0.750001C18.2815 0.750002 19.2389 2.48115 18.4031 3.81311L11.194 15.3006Z" fill="white"/>
                </svg>
            </div>
        </div>
        <div className='rules-dropdown-content' style={ open
            ? { height: '370px' }
            : { height: '0px' }
        }>
            <div className='rules-content-item' style={childStyle}>
                <div className='rules-content-name'>Spillage</div>
                <div className='rules-content-penalty'>+1</div>
            </div>
            <div className='rules-content-item'style={childStyle}>
                <div className='rules-content-name'>Piss on Water Hazard</div>
                <div className='rules-content-penalty'>+3</div>
            </div>
            <div className='rules-content-item'style={childStyle}>
                <div className='rules-content-name'>Falling Over</div>
                <div className='rules-content-penalty'>+2</div>
            </div>
            <div className='rules-content-item'style={childStyle}>
                <div className='rules-content-name'>Miss Hole</div>
                <div className='rules-content-penalty'>+2</div>
            </div>
            <div className='rules-content-item'style={childStyle}>
                <div className='rules-content-name'>Cheating</div>
                <div className='rules-content-penalty'>+5</div>
            </div>
            <div className='rules-content-item'style={childStyle}>
                <div className='rules-content-name'>Chunder</div>
                <div className='rules-content-penalty'>+10</div>
            </div>
            <div className='rules-content-item'style={childStyle}>
                <div className='rules-content-name'>Head Shave</div>
                <div className='rules-content-penalty'>-30</div>
            </div>
        </div>
    </div>
}