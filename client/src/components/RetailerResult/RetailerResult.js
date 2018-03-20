/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './RetailerResult.scss';

const RetailerResult = props => {
  const classes = [styles.container];
  if (props.selected) {
    classes.push(styles.selected);
  }

  return <div className={classes.join(' ')}>{props.children}</div>;
};

RetailerResult.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default RetailerResult;
