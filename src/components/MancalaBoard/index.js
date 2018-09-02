import React from 'react';
import PropTypes from 'prop-types';
import { Provider, Subscribe } from 'unstated';
import MancalaContainer from '../../containers/Mancala';
import Pit from '../Pit';
import './index.css';

const pairs = [];
for (let i = 12; i > 6; i--) {
  pairs.push([ i, Math.abs(i - 12) ]);
}

export default function MancalaBoard({ username }) {
  return (
    <Provider>
      <Subscribe to={[MancalaContainer]}>
        {
          ({ go, state: { pits, current, lastIndex } }) => (
            <div className='mancala-board'>
              <h2 className={current === 1 ? 'current' : ''}>BOT</h2>
              <div role='grid' className='pits'>
                <div className='col'>
                  <Pit bot pit={pits[13]} highlight={lastIndex === 13} />
                </div>
                {pairs.map(([ first, second ], i) => (
                  <div className='col' key={`pair-${i}`}>
                    <Pit
                      bot
                      pit={pits[first]}
                      highlight={first === lastIndex}
                      enabled={current === 1}
                    />
                    <Pit
                      pit={pits[second]}
                      onClick={() => {
                        if (current !== 0 || !pits[second].stoneCount) { return; }
                        go(second);
                      }}
                      highlight={second === lastIndex}
                      enabled={current === 0}
                    />
                  </div>
                ))}
                <div className='col'>
                  <Pit pit={pits[6]} highlight={lastIndex === 6} />
                </div>
              </div>
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
