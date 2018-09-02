import React from 'react';
import PropTypes from 'prop-types';
import Offscreen from 'react-offscreen';
import { Provider, Subscribe } from 'unstated';
import { oneLine } from 'common-tags';
import MancalaContainer from '../../containers/Mancala';
import Pit from '../Pit';
import './index.css';

const pairs = [];
for (let i = 12; i > 6; i--) {
  pairs.push([ i, Math.abs(i - 12) ]);
}
const stoneLabel = pit => oneLine`
  with ${pit.stoneCount} stone${pit.stoneCount === 1 ? '' : 's'}.
`;

export default function MancalaBoard({ username }) {
  return (
    <Provider>
      <Subscribe to={[MancalaContainer]}>
        {
          ({ go, state: { pits, current, lastIndex } }) => (
            <div className='mancala-board'>
              <Offscreen id='pit-help'>Click to choose pit</Offscreen>
              <h2 className={current === 1 ? 'current' : ''}>BOT</h2>
              <ul className='pits' aria-label='Mancala Board'>
                <li className='col'>
                  <Pit
                    bot
                    pit={pits[13]}
                    highlight={lastIndex === 13}
                    aria-label={`Bot's "store" pit ${stoneLabel(pits[13])}`}
                  />
                </li>
                {pairs.map(([ first, second ], i) => (
                  <li className='col' key={`pair-${i}`}>
                    <ul>
                      <li>
                        <Pit
                          bot
                          pit={pits[first]}
                          highlight={first === lastIndex}
                          aria-label={`Bot's pit #${i + 1} ${stoneLabel(pits[first])}`}
                        />
                      </li>
                      <li>
                        <Pit
                          pit={pits[second]}
                          onClick={() => {
                            if (current !== 0 || !pits[second].stoneCount) { return; }
                            go(second);
                          }}
                          onKeyDown={e => {
                            if (e.which === 13 || e.which === 32) {
                              e.target.click();
                            }
                          }}
                          highlight={second === lastIndex}
                          enabled={current === 0}
                          aria-label={oneLine`
                            ${username}'s pit #${Math.abs(i - 7)} ${stoneLabel(pits[second])}
                          `}
                        />
                      </li>
                    </ul>
                  </li>
                ))}
                <li className='col'>
                  <Pit pit={pits[6]} highlight={lastIndex === 6} />
                </li>
              </ul>
              <h2 className={current === 0 ? 'current' : ''}>{username}</h2>
            </div>
          )
        }
      </Subscribe>
    </Provider>
  );
}

MancalaBoard.propTypes = {
  username: PropTypes.string.isRequired
};
