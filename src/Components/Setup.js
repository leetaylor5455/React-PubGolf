import React, { useState, useEffect } from 'react';
import Title from './Title';
import Button from './Button';
import Dialogue from './Dialogue';
import TextInput from './TextInput';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Setup() {

    let teams = [''];
    const [slides, setSlides] = useState([]);
    const [holes, setHoles] = useState([]);

    const SwipeToAdd = (props) => {
        return <div className='swipe-to-add'>Swipe to Add</div>
    }

    const onTeamInput = (e) => {
        const index = e.target.id;
        const input = e.target.value;
        teams[index] = input;

        if (input && index == teams.length-1) {
            teams.push('');
            pushTeamEntryDialogue();
        } else {
        }
    }

    const TeamEntryDialogue = (props) => {
        return <Dialogue 
            title='New Team'
            content={<TextInput type='text' placeholder='Team Name' id={props.index} onInput={onTeamInput}/>}
        />
    } 

    const pushTeamEntryDialogue = () => {
        setSlides(prevState => [...prevState,
            <SwiperSlide key={prevState.length}>
                {<TeamEntryDialogue index={prevState.length}/>}
                {<SwipeToAdd index={prevState.length}/>}
            </SwiperSlide>
        ]);
    }

    useEffect(() => {
        setSlides(prevState => [...prevState,
            <SwiperSlide key={0}>
                {<TeamEntryDialogue index={0}/>}
                {<SwipeToAdd index={0}/>}
            </SwiperSlide>
        ]);
    }, []);


    return (
        <div>
            <Title title='Setup'/>

            <Swiper
                slidesPerView={1}
                spaceBetween={50}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                style={{ marginTop: '15vh' }}
            >
                {slides}

            </Swiper>
        </div>
    )
}