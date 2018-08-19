import React from 'react';
import PropTypes from 'prop-types';
import Stone from '../Stone';
import './index.css';

export default function Pit({ pit: { type, stoneCount }, ...other }) {
  return (
    <div className={`pit ${type}`} {...other}>
      {
        (new Array(stoneCount))
          .fill('')
          .map((_, i) => <Stone key={`stone-${i}`} />)
      }
    </div>
  );
}

Pit.displayName = 'Pit';
Pit.propTypes = {
  pit: PropTypes.object.isRequired
};
