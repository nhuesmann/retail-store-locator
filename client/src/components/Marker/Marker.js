import React from 'react';

import styles from './Marker.scss';

const Marker = () => (
  <div className={styles.container}>
    <i className={['fas fa-map-marker', styles.marker].join(' ')} />
  </div>
);

export default Marker;
