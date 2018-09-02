import React from 'react';
import { Provider, Subscribe } from 'unstated';
import MancalaContainer from '../../containers/Mancala';
import Pit from '../Pit';
import './index.css';

const pairs = [];
for (let i = 12; i > 6; i--) {
  pairs.push([ i, Math.abs(i - 12) ]);
}

export default function MancalaBoard() {
  return (
    <Provider>
      <Subscribe to={[MancalaContainer]}>
        {
          ({ go, state: { pits, current, lastIndex } }) => (
            <div className='mancala-board'>
              <div role='grid' className='pits'>
                <div className='col'>
                  <Pit bot pit={pits[13]} highlight={lastIndex === 13} />
                </div>
                {pairs.map(([ first, second ], i) => (
                  <div className='col' key={`pair-${i}`}>
                    <Pit bot pit={pits[first]} highlight={first === lastIndex} />
                    <Pit
                      pit={pits[second]}
                      onClick={() => go(second)}
                      highlight={second === lastIndex}
                    />
                  </div>
                ))}
                <div className='col'>
                  <Pit pit={pits[6]} highlight={lastIndex === 6} />
                </div>
              </div>
            </div>
          )
        }
      </Subscribe>
    </Provider>
  );
}
