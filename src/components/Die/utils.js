import React, { Fragment } from 'react';

/**
 * Creates `n` dots for dice
 */
export const dots = n => (
  new Array(n)
    .fill('')
    .map((_, i) => (<span key={i} className='pip' />))
);

/**
 * Map for one-off sides of die (4, 5 and 6)
 */
export const map = {
  4: (
    <Fragment>
      <div className='column'>{dots(2)}</div>
      <div className='column'>{dots(2)}</div>
    </Fragment>
  ),
  5: (
    <Fragment>
      <div className='column'>{dots(2)}</div>
      <div className='column'>{dots(1)}</div>
      <div className='column'>{dots(2)}</div>
    </Fragment>
  ),
  6: (
    <Fragment>
      <div className='column'>{dots(3)}</div>
      <div className='column'>{dots(3)}</div>
    </Fragment>
  )
};
