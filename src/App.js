import React, { useEffect, useState, useCallback } from 'react';

import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import './App.css';
import Header from './Components/Header';
import Title from './Components/Title';
import Button from './Components/Button';
import Admin from './Components/Admin';
import LiveInfo from './Components/LiveInfo';
import Summary from './Components/Summary';
import axios from 'axios';

const Constants = {
  URL: 'https://node-pubgolf.herokuapp.com/api'
//   URL: 'http://localhost:8080/api'
}

export function App() {

	let ws = new WebSocket('wss://node-pubgolf.herokuapp.com/');
	// let ws = new WebSocket('ws://localhost:8080/');

	const navigate = useNavigate();
	const navigateToAdmin = useCallback(() => navigate('/admin', { replace: true }), [navigate])

	const NoGame = () => {
		return <div className='no-game'>
			<Title title='Dead Out...'/>

			<div className='game-setup-box'>
				<div className='setup-box-text'>There's no game in progress right now...</div>
				<Button text='Admin Login' color='var(--greenBright)' onClick={navigateToAdmin}/>
			</div>
		</div>
	}

	const [game, setGame] = useState();

	useEffect(() => {

	const fetchGame = async () => {
		try {
			const res = await axios({
				method: 'GET',
				url: Constants.URL + '/games'
			});
			if (res.data) setGame(res.data);

		} catch {
			console.log('No game');
		}
	}

	fetchGame();

	}, []);

	return (
		<div className="App">
			<Header />

			<Routes>
				<Route path='/' element={
				game 
					? !game.complete
					? <LiveInfo game={game} setGame={setGame} ws={ws}/> 
					: <Summary game={game}/>
				: <NoGame />}/>
				<Route path='/admin' element={<Admin game={game} setGame={setGame} ws={ws}/>}/>
			</Routes>

		</div>
	);
}

export { Constants };
