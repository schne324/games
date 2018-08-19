import React from 'react';
import PropTypes from 'prop-types';
import { Provider, Subscribe } from 'unstated';
import GlobalContainer from '../../containers/Global';
import BackLink from '../BackLink';
import Id from '../Id';
import './index.css';

export default function Start({ name, setStatus }) {
  return (
    <Provider>
      <Subscribe to={[GlobalContainer]}>
        {({ state: { username }, setUsername }) => {
          if (!username) {
            return (<Id setUsername={setUsername} />);
          }

          return (
            <div className='starter'>
              <h1>{name}</h1>
              <button
                type='button'
                className='actionable'
                onClick={() => setStatus('started')}
              >
                New game
              </button>
              <BackLink />
            </div>
          );
        }}
      </Subscribe>
    </Provider>
  );
}

Start.propTypes = {
  name: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired
};
