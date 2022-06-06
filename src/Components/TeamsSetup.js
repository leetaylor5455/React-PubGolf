import React, { useState, useEffect } from 'react';
import Title from './Title';
import Button from './Button';
import Dialogue from './Dialogue';
import TextInput from './TextInput';
import SwipeToAdd from './SwipeToAdd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

let lastTeamIndex = 0;

export default function Setup(props) {

    const [slides, setSlides] = useState([]);

    const onTeamInput = (e) => {
        const index = parseInt(e.target.getAttribute('teamindex'));
        const input = e.target.value;

        // If text is in final slide
        if (input && index == lastTeamIndex) {
            props.setTeams(prevState => { return [...prevState, { name: '' }] });
            pushTeamEntryDialogue(index+1);
        }

        props.setTeams(prevState => {
            return [
                ...prevState.slice(0, index),
                { name: input },
                ...prevState.slice(index+1)
            ]        
        });
    }

    // When teams state changes, update last index global var
    useEffect(() => {
        lastTeamIndex = props.teams.length-1;
        // console.log(props.teams);
    }, [props.teams])

    // Dialogue box for team entry
    const TeamEntryDialogue = (props) => {
        return <Dialogue 
            title='New Team'
            content={<TextInput type='text' placeholder='Team Name' teamindex={props.index} onInput={onTeamInput}/>}
        />
    } 

    const pushTeamEntryDialogue = (index) => {
        setSlides(prevState => [...prevState,
            <SwiperSlide key={index}>
                {<TeamEntryDialogue index={index}/>}
                {<SwipeToAdd index={index}/>}
            </SwiperSlide>
        ]);
    }

    const submitTeams = () => {
        // Remove empty name items
        props.setTeams(props.teams.filter(team => team.name));

        const cleaned = props.teams.filter(team => team.name);

        // If cleaned array has at least 2 teams, go to holes setup
        if (cleaned.length > 1) return props.setStage(2); 
    }

    useEffect(() => { pushTeamEntryDialogue(0) }, []);


    return (
        <div>
            <Title title='Teams'/>

            <Swiper
                slidesPerView={1}
                spaceBetween={50}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                style={{ marginTop: '15vh' }}
            >
                {slides}

            </Swiper>

            <Button text='safe' spacing='23vh' color={props.teams.length > 2
                ? 'var(--greenBright)'
                : 'var(--greyLight)'
            }
                onClick={submitTeams}
            />
        </div>
    )
}