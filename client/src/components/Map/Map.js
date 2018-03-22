/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint react/no-unused-prop-types: "off" */
/* eslint no-underscore-dangle: "off" */
/* eslint object-curly-newline: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';

import Marker from '../Marker/Marker';

import styles from './Map.scss';

const defaultZoom = 11;
const defaultCenter = {
  lat: 33.913609,
  lng: -118.384909,
};

const MapComponent = props => (
  <div className={styles.container}>
    <GoogleMap
      bootstrapURLKeys={{ key: [process.env.REACT_APP_GOOGLE_API_KEY] }}
      zoom={props.zoom}
      center={props.center}
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      hoverDistance={18}
      margin={[30, 30, 30, 30]}
      onChange={props.onBoundsChange}
    >
      {props.markers.length > 0 &&
        props.markers.map(retailer => (
          <Marker
            key={retailer._id}
            lng={retailer.location.coordinates[0]}
            lat={retailer.location.coordinates[1]}
            onMouseEnter={() => props.onMarkerHover(retailer._id)}
            onMouseLeave={props.onMarkerHoverExit}
          />
        ))}
    </GoogleMap>
  </div>
);

MapComponent.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  markers: PropTypes.array,
  onBoundsChange: PropTypes.func,
  onMarkerHover: PropTypes.func,
  onMarkerHoverExit: PropTypes.func,
};

export default MapComponent;
