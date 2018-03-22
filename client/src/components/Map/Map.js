/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint react/no-unused-prop-types: "off" */
/* eslint no-underscore-dangle: "off" */
/* eslint object-curly-newline: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';

import MarkerList from '../../containers/MarkerList';

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
      onChange={props.onChange}
    >
      <MarkerList />
    </GoogleMap>
  </div>
);

MapComponent.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  retailers: PropTypes.array,
  markerHovered: PropTypes.func,
  markerHoverExited: PropTypes.func,
  onChange: PropTypes.func,
};

export default MapComponent;
