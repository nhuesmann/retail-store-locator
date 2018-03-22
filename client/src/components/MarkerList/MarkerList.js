/* eslint no-underscore-dangle: "off" */
/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import PropTypes from 'prop-types';

import Marker from '../Marker/Marker';

const MarkerList = props => {
  if (!props.retailers) return null;

  return props.retailers.map(retailer => (
    <Marker
      key={retailer._id}
      lng={retailer.location.coordinates[0]}
      lat={retailer.location.coordinates[1]}
      hovered={props.hoveredId === retailer._id}
      onMouseEnter={() => props.onMouseEnter(retailer._id)}
      onMouseLeave={props.onMouseLeave}
    />
  ));
};

MarkerList.propTypes = {
  retailers: PropTypes.array,
  hoveredId: PropTypes.string,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default MarkerList;
