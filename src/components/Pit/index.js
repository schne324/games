import React, { Component } from 'react';
import PropTypes from 'prop-types';
// TODO: yarn's registry is down right now so I can't install this...
// import classNames from 'classnames';
import Stone from '../Stone';
import './index.css';

export default class Pit extends Component {
  state = { showHighlight: true }
  componentDidUpdate(prevProps) {
    if (prevProps.pit.stoneCount === this.props.pit.stoneCount) {
      return;
    }

    this.setState({ showHighlight: true });
    setTimeout(() => {
      console.log('setting it to false');
      this.setState({ showHighlight: false })
    }, (2e3 - 1));
  }

  render() {
    const { showHighlight } = this.state;
    const { highlight, bot, pit: { type, stoneCount }, ...other } = this.props;
    const count = (<p>{stoneCount}</p>);
    const c = [
      'pit', type, stoneCount > 6 && 'condensed', showHighlight && highlight && 'highlight'
    ].filter(v => v).join(' ');
    return (
      <div>
        {bot && count}
        <div
          className={c}
          {...other}
        >
          {
            (new Array(stoneCount))
              .fill('')
              .map((_, i) => <Stone key={`stone-${i}`} />)
          }
        </div>
        {!bot && count}
      </div>
    );
  }
}
//
// export default function Pit({ highlight, bot, pit: { type, stoneCount }, ...other }) {
//   const count = (<p>{stoneCount}</p>);
//   const c = [
//     'pit', type, stoneCount > 6 && 'condensed', highlight && 'highlight'
//   ].filter(v => v).join(' ');
//   return (
//     <div>
//       {bot && count}
//       <div
//         className={c}
//         {...other}
//       >
//         {
//           (new Array(stoneCount))
//             .fill('')
//             .map((_, i) => <Stone key={`stone-${i}`} />)
//         }
//       </div>
//       {!bot && count}
//     </div>
//   );
// }

Pit.displayName = 'Pit';
Pit.propTypes = {
  pit: PropTypes.object.isRequired,
  highlight: PropTypes.bool.isRequired,
  bot: PropTypes.bool
};
Pit.defaultProps = { bot: false };
