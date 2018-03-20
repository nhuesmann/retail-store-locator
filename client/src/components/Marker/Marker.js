import React from 'react';
import PropTypes from 'prop-types';

import styles from './Marker.scss';

const Marker = props => (
  <div
    className={styles.container}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    <i className={['fas fa-map-marker', styles.marker].join(' ')} />
  </div>
);

Marker.propTypes = {
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default Marker;
