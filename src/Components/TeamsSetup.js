import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import Title from './Title';
import Button from './Button';
import Dialogue from './Dialogue';
import TextInput from './TextInput';
import SwipeToAdd from './SwipeToAdd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

let lastTeamIndex = 0;

export default function Setup(props) {

    const [teams, setTeams, teamsRef] = useState(props.teams);

    const onTeamInput = (e) => {
        const index = parseInt(e.target.getAttribute('teamindex'));
        const input = e.target.value;

        // If text is in final slide
        if (input && index == lastTeamIndex) {
            props.setTeams(prevState => { return [...prevState, { name: '' }] });
            // pushTeamEntryDialogue(index+1);
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
        setTeams(props.teams);
    }, [props.teams])


    const submitTeams = () => {
        // Remove empty name items
        props.setTeams(props.teams.filter(team => team.name));

        const cleaned = props.teams.filter(team => team.name);

        // If cleaned array has at least 2 teams, go to holes setup
        if (cleaned.length > 1) return props.setStage(2); 
    }


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
                {teams.map((team, index) => (
                    <SwiperSlide key={'slide'+index}>
                        <Dialogue
                            key={'dialogue'+props.index}
                            title='New Team'>

                                <TextInput key={'teaminput'+index} type='text' placeholder='Team Name' 
                                teamindex={index} onInput={onTeamInput} value={team.name}/>
                        
                            </Dialogue>
                        <SwipeToAdd />
                    </SwiperSlide>
                ))}

            </Swiper>

            <Button text='safe' spacing='23vh' color={teamsRef.current.length >= 2
                ? 'var(--greenBright)'
                : 'var(--greyLight)'
            }
                onClick={submitTeams}
            />
        </div>
    )
}