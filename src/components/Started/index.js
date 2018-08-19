import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BackLink from '../BackLink';

export default function Started({ children, name }) {
  return (
    <Fragment>
      <header><h1>{name}</h1></header>
      <main>{children}</main>
      <footer>
        <BackLink />
      </footer>
    </Fragment>
  );
}

Started.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
};
