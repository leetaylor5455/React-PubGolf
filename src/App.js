import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import Header from './Components/Header';
import Admin from './Components/Admin';


export function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path='/' element={<div>Scoreboard</div>}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>

      </div>
    </Router>
  );
}

const Constants = {
  URL: 'http://localhost:8080/api'
}

export { Constants };
