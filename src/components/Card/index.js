import React from 'react';
import PropTypes from 'prop-types';
import Game from '../../containers/Yahtzee';
import CardRows from '../CardRows';
import { Subscribe } from 'unstated';
import './index.css';

export default function Card({ type, displayName }) {
  return (
    <Subscribe to={[Game]}>
      {
        game => (
          <div className='card'>
            <h2>{displayName}</h2>
            <div className={`upper-${type}`}>
              <table border='2'>
                <thead>
                  <tr>
                    <td>Upper Section</td>
                    <th scope='col'>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <CardRows scope='upper' type={type} />
                </tbody>
              </table>
            </div>
            <div className={`lower-${type}`}>
              <table border='2'>
                <thead>
                  <tr>
                    <td>Lower Section</td>
                    <th scope='col'>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <CardRows scope='lower' type={type} />
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    </Subscribe>
  )
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired
};
