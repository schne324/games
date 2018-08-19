import React from 'react';
import { Provider, Subscribe } from 'unstated';
import YahtzeeContainer from '../../containers/Yahtzee';
import GlobalContainer from '../../containers/Global';
import Start from '../Start';
import Started from '../Started';
import Finish from '../Finish';
import ScoreCard from '../ScoreCard';
import Dice from '../Dice';

export default function Yahtzee() {
  return (
    <Provider>
      <Subscribe to={[YahtzeeContainer, GlobalContainer]}>
        {
          ({
            reset, setStatus, state: { status, card }
          }, {
            state: { username }
          }) => {
            switch(status) {
              case 'not-started':
                return (<Start setStatus={setStatus} name='Y5E' />);
              case 'started':
                return (
                  <Started name='Y5E'>
                    <Dice />
                    <ScoreCard username={username} />
                  </Started>
                );
              case 'finished':
                return (
                  <Finish
                    userScore={card.user.lower['grand-total'].score(null, card.user)}
                    botScore={card.computer.lower['grand-total'].score(null, card.computer)}
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
  )
}
