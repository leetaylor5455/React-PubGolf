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

    const [slides, setSlides] = useState([]);
    const [course, setCourse, courseRef] = useState(props.course);
    // courseRef.current = props.course;

    const checkLastSlideComplete = (holeIndex) => {
        if (holeIndex == lastHoleIndex 
            && courseRef.current[holeIndex].location 
            && courseRef.current[holeIndex].drink 
            && courseRef.current[holeIndex].par) {
                console.log('new hole')
                pushHoleEntryDialogue(holeIndex+1);
                setCourse(prevState => [...prevState, { location: '', drink: '', par: 0 }])
        }
    }

    const submitCourse = () => {
        console.log('submit course');

        // Need to do it again since setCourse is async and we need to check length in next line
        const cleaned = course.filter(hole => hole.location && hole.drink && hole.par);

        props.setCourse(cleaned);

        console.log(cleaned);
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
                    par: prevState[holeIndex].par
                },
                ...prevState.slice(holeIndex+1)
            ]);
        } else if (isLocation) {
            setCourse(prevState => [
                
                ...prevState.slice(0, holeIndex),
                { 
                    location: textInput,
                    drink: prevState[holeIndex].drink,
                    par: prevState[holeIndex].par
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
                    par: parseInt(value)
                },
            ...prevState.slice(holeIndex+1)
        ]);

    }

    const ParSelect = (props) => {

        const holeIndex = props.holeindex;
        const [selectedItem, selectItem] = useState(0);

        const SelectButton = (props) => {

            const holeIndex = props.holeindex;

            return <div className='par-select-button'
                key={props.number*100}
                onClick={(e) => {
                    selectItem(props.number);
                    onParButtonClick(e);
                }}
                holeindex={holeIndex}
                number={props.number}
                style={{ backgroundColor: props.selectedItem == props.number
                    ? 'var(--greenBright)'
                    : 'var(--greyDark)',
                }}
            >
                {props.number}
            </div>
        }
        
        return <div className='par-select'>
            <div className='par-select-title'>Par</div>
            <div className='par-select-buttons'>
                <SelectButton number={1} holeindex={holeIndex} selectedItem={selectedItem} selectItem={selectItem}/>
                <SelectButton number={2} holeindex={holeIndex} selectedItem={selectedItem} selectItem={selectItem}/>
                <SelectButton number={3} holeindex={holeIndex} selectedItem={selectedItem} selectItem={selectItem}/>
                <SelectButton number={4} holeindex={holeIndex} selectedItem={selectedItem} selectItem={selectItem}/>
                <SelectButton number={5} holeindex={holeIndex} selectedItem={selectedItem} selectItem={selectItem}/>
            </div>
        </div>
    }

    const HoleEntryDialogue = (props) => {
        return <Dialogue 
            title={'Hole ' + parseInt(props.index+1)}
            content={
                <div>
                    <TextInput type='text' placeholder='Location' 
                        holeindex={props.index} 
                        onInput={onTextInput} 
                        location='true'
                        style={{ marginTop: '-10px' }}
                    />
                    <TextInput type='text' placeholder='Drink' 
                        holeindex={props.index} 
                        onInput={onTextInput} 
                        drink='true'
                        style={{ marginTop: '25px' }}
                    />
                    <ParSelect holeindex={props.index}/>
                </div>
            }
        />
    }

    const pushHoleEntryDialogue = (index) => {
        setSlides(prevState => [...prevState,
            <SwiperSlide key={index}>
                <HoleEntryDialogue index={index}/>
                <SwipeToAdd index={index}/>
            </SwiperSlide>
        ]);
    }

    useEffect(() => {
        pushHoleEntryDialogue(0);
    }, []);


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
                {slides}

            </Swiper>

            <Button text='Aight Boom' spacing='9vh' 
                color={course.length > 2 ? 'var(--greenBright)' : 'var(--greyLight)'}
                onClick={submitCourse}
            />
        </div>
    )
}