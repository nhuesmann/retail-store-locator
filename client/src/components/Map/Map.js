/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint no-underscore-dangle: "off" */

import React from 'react';
import { connect } from 'react-redux';
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
      {props.retailers &&
        props.retailers.map(retailer => (
          <Marker
            key={retailer._id}
            lng={retailer.location.coordinates[0]}
            lat={retailer.location.coordinates[1]}
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
  retailers: PropTypes.array,
};

const mapStateToProps = state => ({
  zoom: state.map.zoom,
  center: state.map.center,
  retailers: state.retailers,
});

export default connect(mapStateToProps)(Map);
