import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class Id extends Component {
  static propTypes = { setUsername: PropTypes.func.isRequired };
  onSubmit = e => {
    e.preventDefault();
    this.props.setUsername(this.input.value);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className='id-form'>
        <h1 className='name-heading'>{'What\'s your name?'}</h1>
        <div className='field-wrap'>
          <label htmlFor='name'>Name</label>
          <input
            required
            maxLength='20'
            type='text'
            id='name'
            ref={el => this.input = el}
          />
        </div>
        <button type='submit' className='actionable'>Submit</button>
      </form>
    )
  }
}
