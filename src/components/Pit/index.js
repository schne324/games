import React, { Component } from 'react';
import PropTypes from 'prop-types';
// TODO: yarn's registry is down right now so I can't install this...
// import classNames from 'classnames';
import Stone from '../Stone';
import './index.css';

export default class Pit extends Component {
  static displayName = 'Pit';
  static propTypes = {
    pit: PropTypes.object.isRequired,
    highlight: PropTypes.bool.isRequired,
    enabled: PropTypes.bool,
    bot: PropTypes.bool
  };
  static defaultProps = { bot: false, enabled: false };
  state = { showHighlight: true }

  componentDidUpdate(prevProps) {
    if (prevProps.pit.stoneCount === this.props.pit.stoneCount) {
      return;
    }

    this.setState({ showHighlight: true });
    setTimeout(() => {
      if (!this.el || !document.contains(this.el)) { return; }
      this.setState({ showHighlight: false })
    }, (2e3 - 1));
  }

  render() {
    const { showHighlight } = this.state;
    const { highlight, bot, enabled, pit: { type, stoneCount }, ...other } = this.props;
    const count = (<p aria-hidden='true'>{stoneCount}</p>);
    const c = [
      'pit',
      type,
      stoneCount > 6 && 'condensed',
      showHighlight && highlight && 'highlight',
      enabled && 'enabled'
    ].filter(v => v).join(' ');
    const additionalProps = {};

    if (enabled && stoneCount) {
      additionalProps['aria-describedby'] = 'pit-help';
    }

    return (
      <div ref={el => this.el = el}>
        {bot && count}
        <div
          className={c}
          {...other}
          {...additionalProps}
          tabIndex={(enabled && stoneCount) ? 0 : -1}
          role='button'
          aria-disabled={!enabled || !stoneCount}
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
