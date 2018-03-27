import React from 'react';
import PropTypes from 'prop-types';

import icon from '../../images/icons/map-marker@2x.png';

import styles from './Marker.scss';

const Marker = props => {
  const classes = [styles.marker];

  if (props.$hover || props.retailerHovered) classes.push(styles.markerHovered);

  return (
    props.show && (
      <div
        className={classes.join(' ')}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <img width="100%" height="100%" src={icon} alt="map marker" />
      </div>
    )
  );
};

Marker.propTypes = {
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  $hover: PropTypes.bool,
  retailerHovered: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
};

Marker.defaultProps = {
  $hover: false,
};

export default Marker;
