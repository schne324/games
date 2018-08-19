import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import './index.css';

const ScoreCard = ({ username }) => (
  <div className='score-card'>
    <div className='cards'>
      <Card type='user' displayName={username} />
      <Card type='computer' displayName='Yaht Bot' />
    </div>
  </div>
);

ScoreCard.displayName = 'ScoreCard';
ScoreCard.propTypes = {
  username: PropTypes.string.isRequired
};

export default ScoreCard;
