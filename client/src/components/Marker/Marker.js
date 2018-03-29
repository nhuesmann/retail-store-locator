/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import icon from '../../images/icons/map-marker@2x.png';

import styles from './Marker.scss';

const Marker = props => {
  const classes = [styles.marker];

  if (props.$hover || props.hovered || props.clicked) {
    classes.push(styles.markerHovered);
  }

  return (
    props.show && (
      <div
        className={classes.join(' ')}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onClick={props.onClick}
      >
        <img width="100%" height="100%" src={icon} alt="map marker" />
      </div>
    )
  );
};

Marker.propTypes = {
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  $hover: PropTypes.bool,
  hovered: PropTypes.bool.isRequired,
  clicked: PropTypes.bool.isRequired,
};

Marker.defaultProps = {
  $hover: false,
};

export default Marker;
