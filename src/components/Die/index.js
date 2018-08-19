import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import Game from '../../containers/Yahtzee';
import { dots, map } from './utils';

export default function Die({ value, index, held }) {
  return (
    <Subscribe to={[Game]}>
      {
        game => (
          <div
            role='checkbox'
            tabIndex={0}
            aria-checked={held}
            aria-disabled={value === 0}
            aria-label={value === 0 ? 'Unrolled' : `${value}`}
            className={`die face-${value}`}
            onClick={() => game.toggleDie(index)}
            onKeyDown={e => {
              const { which } = e;

              if (which === 13 || which === 32) {
                e.preventDefault();
                game.toggleDie(index);
              }
            }}
          >
            {map[value] || dots(value)}
            {held && <span className='fas fa-lock' aria-hidden='true' />}
          </div>
        )
      }
    </Subscribe>
  );
}

Die.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  held: PropTypes.bool.isRequired
};
