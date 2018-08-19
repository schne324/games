import React from 'react';
import PropTypes from 'prop-types';
import BackLink from '../BackLink';
import './index.css';

export default function Finish({
  userScore, botScore, reset, setStatus
}) {
  const onClick = () => {
    reset();
    setStatus('started');
  };
  return (
    <div className='finisher'>
      <h1>GAME OVER</h1>
      <div className='finals'>
        <div>
          <h2>User</h2>
          <p>{userScore}</p>
        </div>
        <div>
          <h2>Bot</h2>
          <p>{botScore}</p>
        </div>
      </div>
      <button type='button' onClick={onClick}>
        New game
      </button>
      <BackLink />
    </div>
  );
}

Finish.propTypes = {
  userScore: PropTypes.number.isRequired,
  botScore: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired
};
