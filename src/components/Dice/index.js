import React from 'react';
import { Subscribe } from 'unstated';
import Game from '../../containers/Yahtzee';
import Die from '../Die';
import './index.css';

export default function Dice() {
  return (
    <Subscribe to={[Game]}>
      {
        game => {
          const { state: { dice, roll }, rollDice } = game;

          return (
            <div className='dice-wrapper'>
              <div className='dice' role='group' aria-label='Dice'>
                {
                  dice.map(({ held, value }, i) => (
                    <Die
                      value={value}
                      held={held}
                      key={i}
                      index={i}
                    />
                  ))
                }
              </div>
              <button
                className='roll'
                type='button'
                onClick={rollDice}
                disabled={roll === 3}
              >
                <span>Roll</span>
                <span className='fas fa-redo' aria-hidden='true' />
              </button>
              <p>{`Rolls left: ${3 - roll}`}</p>
            </div>
          )
        }
      }
    </Subscribe>
  );
}
