/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './RetailerResult.scss';

const RetailerResult = ({ retailer, selected }) => {
  const classes = [styles.container];
  if (selected) {
    classes.push(styles.selected);
  }

  return (
    <div className={classes.join(' ')}>
      <h2 className={styles.heading}>{retailer.name}</h2>
      <p>
        {retailer.address}, {retailer.city} {retailer.state}{' '}
        {retailer.zip.slice(0, 5)}
      </p>
    </div>
  );
};

RetailerResult.propTypes = {
  retailer: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default RetailerResult;
