import React from 'react';

import styles from './NoResults.scss';

const NoResults = () => (
  <div className={styles.container}>
    <h2 className={styles.heading}>Sorry! No results.</h2>
    <p>Coming soon to a retail store near you...</p>
  </div>
);

export default NoResults;
