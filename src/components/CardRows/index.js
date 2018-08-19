import React from 'react';
import Offscreen from 'react-offscreen';
import PropTypes from 'prop-types';
import Game from '../../containers/Yahtzee';
import { Subscribe } from 'unstated';

export default function CardRows({ scope, type }) {
  return (
    <Subscribe to={[Game]}>
      {
        game => {
          const { state: { card, dice } } = game;

          return Object.entries(card[type][scope]).map(([ item, info ]) => {
            const score = info.score(dice, card[type]);
            let scoreCell;
            return (
              <tr key={`${scope}-${item}`}>
                <th scope='row'>
                  <div>{info.name}</div>
                  <div className='desc'>{info.description}</div>
                </th>
                <td
                  className='score'
                  tabIndex={-1}
                  ref={el => scoreCell = el}
                >
                  {info.automatic && (
                    <span className='calc-total'>{score}</span>
                  )}
                  {
                    typeof info.value !== 'undefined'
                      ? (<span className='chosen'>{info.value}</span>)
                      : dice.find(d => d.value !== 0)
                        && type === 'user'
                        && !info.automatic
                        && (
                          <button
                            type='button'
                            onClick={() => {
                              game.setScore(type, scope, item, score);
                              if (scoreCell) { scoreCell.focus(); }
                            }}
                          >
                            <span>{score}</span>
                            <Offscreen>{` points for ${info.name}`}</Offscreen>
                            <span
                              aria-hidden='true'
                              className='far fa-check-circle'
                            />
                          </button>
                        )
                  }
                </td>
              </tr>
            );
          });
        }
      }
    </Subscribe>
  );
}

CardRows.propTypes = {
  scope: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
