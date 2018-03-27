import React from 'react';
import PropTypes from 'prop-types';

import styles from './NoResults.scss';

const NoResults = props => {
  const options = props.searchRadiusOptions;
  const index = props.searchRadiusIndex;

  const heading = 'Sorry! No results.';
  const message =
    index < options.length - 1
      ? 'Try widening your search.'
      : 'Coming soon to a retail store near you...';

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{heading}</h2>
      <p>{message}</p>
    </div>
  );
};

NoResults.propTypes = {
  searchRadiusOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  searchRadiusIndex: PropTypes.number.isRequired,
};

export default NoResults;
