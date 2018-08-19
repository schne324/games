import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.css';

export default function BackLink({ to, text }) {
  return (
    <Link to={to} className='back-link'>
      <i aria-hidden='true' className='fa fa-angle-left' />
      <span>{text}</span>
    </Link>
  );
}

BackLink.displayName = 'BackLink';
BackLink.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string
};
BackLink.defaultProps = {
  to: '/',
  text: 'Back to dashboard'
};
