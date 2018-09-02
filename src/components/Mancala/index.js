import React from 'react';
import { Provider, Subscribe } from 'unstated';
import MancalaContainer from '../../containers/Mancala';
import GlobalContainer from '../../containers/Global';
import Start from '../Start';
import Started from '../Started';
import Finish from '../Finish';
import MancalaBoard from '../MancalaBoard';

export default function Yahtzee() {
  return (
    <Provider>
      <Subscribe to={[MancalaContainer, GlobalContainer]}>
        {
          ({
            reset, setStatus, state: { status }
          }, {
            state: { username }
          }) => {
            switch(status) {
              case 'not-started':
                return (<Start setStatus={setStatus} name='Mancala' />);
              case 'started':
                return (
                  <Started name='Mancala'>
                    <MancalaBoard />
                  </Started>
                );
              case 'finished':
                return (
                  <Finish
                    userScore={77}
                    botScore={7}
                    reset={reset}
                    setStatus={setStatus}
                  />
                );
              default:
                return null;
            }
          }
        }
      </Subscribe>
    </Provider>
  );
}
