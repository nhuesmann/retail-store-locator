/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint no-underscore-dangle: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';

import Marker from '../Marker/Marker';

import styles from './Map.scss';

const Map = props => (
  <div className={styles.container}>
    <GoogleMap
      bootstrapURLKeys={{ key: [process.env.REACT_APP_GOOGLE_API_KEY] }}
      zoom={props.zoom}
      center={props.center}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker._id}
          lng={marker.location.coordinates[0]}
          lat={marker.location.coordinates[1]}
        />
      ))}
    </GoogleMap>
  </div>
);

Map.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  markers: PropTypes.array,
};

export default Map;
