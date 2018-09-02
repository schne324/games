import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Yahtzee from '../Yahtzee';
import Mancala from '../Mancala';
import './index.css';

export default function App() {
  return (
    <Router>
      <div className='top-wrap'>
        <Route exact path='/' component={Dashboard} />
        <Route path='/y5e' component={Yahtzee} />
        <Route path='/mancala' component={Mancala} />
      </div>
    </Router>
  );
}
