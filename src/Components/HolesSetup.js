import React, {  useEffect } from 'react';
import useState from 'react-usestateref';
import Title from './Title';
import Button from './Button';
import Dialogue from './Dialogue';
import TextInput from './TextInput';
import SwipeToAdd from './SwipeToAdd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

let lastHoleIndex = 0;
let currentHoleIndex = 0;

export default function HolesSetup(props) {

    // const [slides, setSlides] = useState([]);
    const [course, setCourse, courseRef] = useState(props.course);
    // courseRef.current = props.course;

    const checkLastSlideComplete = (holeIndex) => {
        if (holeIndex == lastHoleIndex 
            && courseRef.current[holeIndex].location 
            && courseRef.current[holeIndex].drink 
            && courseRef.current[holeIndex].par) {
                setCourse(prevState => [...prevState, { location: '', drink: '', par: 0 }])
        }
    }

    const submitCourse = () => {
        console.log('submit course');

        // Need to do it again since setCourse is async and we need to check length in next line
        const cleaned = course.filter(hole => hole.location && hole.drink && hole.par);

        props.setCourse(cleaned);

        // If cleaned array has at least 2 teams, go to holes setup
        if (cleaned.length > 1) return props.setStage(3); 
    }

    const onTextInput = (e) => {
        const holeIndex = parseInt(e.target.getAttribute('holeindex'));
        currentHoleIndex = holeIndex;
        const isLocation = e.target.getAttribute('location');
        const isDrink = e.target.getAttribute('drink');

        const textInput = e.target.value;

        if (isDrink) {
            setCourse(prevState => [
                
                ...prevState.slice(0, holeIndex),
                { 
                    location: prevState[holeIndex].location,
                    drink: textInput,
                    par: prevState[holeIndex].par,
                    index: holeIndex
                },
                ...prevState.slice(holeIndex+1)
            ]);
        } else if (isLocation) {
            setCourse(prevState => [
                
                ...prevState.slice(0, holeIndex),
                { 
                    location: textInput,
                    drink: prevState[holeIndex].drink,
                    par: prevState[holeIndex].par,
                    index: holeIndex
                },
                ...prevState.slice(holeIndex+1)
            ]);
        }
    }

    useEffect(() => {
        lastHoleIndex = course.length-1;
        // setCourse(props.course);
        checkLastSlideComplete(currentHoleIndex);
    }, [course]);


    const onParButtonClick = (e) => {
        const holeIndex = parseInt(e.target.getAttribute('holeindex'));
        currentHoleIndex = holeIndex;
        const value = e.target.getAttribute('number');

        setCourse(prevState => [
            ...prevState.slice(0, holeIndex),
                { 
                    location: prevState[holeIndex].location,
                    drink: prevState[holeIndex].drink,
                    par: parseInt(value),
                    index: holeIndex
                },
            ...prevState.slice(holeIndex+1)
        ]);

    }


    return (
        <div>
            <Title title='Holes'/>

            <Swiper
                slidesPerView={1}
                spaceBetween={50}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                style={{ marginTop: '10vh' }}
            >

                {course.map((hole, index) => {
                    const holeIndex = index;
                    const holePar = hole.par;
                    return (
                    <SwiperSlide key={'holeslide'+index}>
                        <Dialogue title={'Hole ' + parseInt(index+1)} key={'holedialogue'+index}>
                            <TextInput type='text' placeholder='Location' 
                                key={'location'+index}
                                holeindex={index} 
                                onInput={onTextInput} 
                                location='true'
                                style={{ marginTop: '-10px' }}
                                value={hole.location}
                            />
                            <TextInput type='text' placeholder='Drink'
                                key={'drink'+index} 
                                holeindex={index} 
                                onInput={onTextInput} 
                                drink='true'
                                style={{ marginTop: '25px' }}
                                value={hole.drink}
                            />
                            <div className='par-select'>
                                <div className='par-select-title'>Par</div>
                                <div className='par-select-buttons'>
                                    {[1,2,3,4,5].map((par) => (
                                        <div className='par-select-button'
                                            key={'parselect'+holeIndex+par}
                                            onClick={(e) => {
                                                onParButtonClick(e);
                                            }}
                                            holeindex={holeIndex}
                                            number={par}
                                            style={{ backgroundColor: holePar == par
                                                ? 'var(--greenBright)'
                                                : 'var(--greyDark)',
                                            }}
                                        >
                                            {par}
                                        </div>
                                    ))}
                                   </div>
                            </div>
                            {/* <ParSelect key={'parselect'+index} holeindex={index}/> */}
                        </Dialogue>
                        <SwipeToAdd/>
                    </SwiperSlide>
                    
                )})}

            </Swiper>

            <Button text='Aight Boom' spacing='9vh' 
                color={course.length > 2 ? 'var(--greenBright)' : 'var(--greyLight)'}
                onClick={submitCourse}
            />
        </div>
    )
}