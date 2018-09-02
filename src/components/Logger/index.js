import React, { Fragment, Component } from 'react';
import { oneLine } from 'common-tags';
import './index.css';

export default class Logger extends Component {
  componentDidUpdate() {
    const container = this.log;
    container.scrollTop = container.scrollHeight - container.offsetHeight;
  }

  render() {
    const { log, username } = this.props;
    return (
      <Fragment>
        <h2 className='game-log' id='game-log'>Game log</h2>
        <ol
          role='log'
          aria-labelledby='game-log'
          ref={el => this.log = el}
          tabIndex={0}
        >
          {log.map((l, i) => (
            <li key={`log-item-${i}`}>
              {
                oneLine`
                  ${l.user === 0 ? username : 'Bot'} chose pit
                  #${l.index + 1} and ended on #${l.lastIndex + 1}
                  ${l.isStore ? 'Landed in own store - free turn awarded!' : ''}.
                  ${l.stolen ? 'Opponent\'s pit stolen!.' : ''}
                `
              }
            </li>
          ))}
        </ol>
      </Fragment>
    );
  }
}
