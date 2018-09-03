import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Item = ({ ...other }) => (<li><Link {...other} /></li>);

export default function Dashboard() {
  return (
    <Fragment>
      <header><h1>A11y Games</h1></header>
      <main>
        <h2 className='video-game'>Shall we play a game?</h2>
        <ul className='games-list'>
          <Item to='/mancala'>Mancala</Item>
          <Item to='/y5e'>Y5E</Item>
        </ul>
      </main>
      <footer>
        <p>Found an issue? Want to contribute? This is an open source project!</p>
        <a
          href='https://github.com/schne324/games'
          target='_blank'
          rel='noopener noreferrer'
        >
          View on github
        </a>
      </footer>
    </Fragment>
  );
}
