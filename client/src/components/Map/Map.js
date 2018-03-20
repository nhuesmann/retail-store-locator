/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint react/no-unused-prop-types: "off" */
/* eslint no-underscore-dangle: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';

import Marker from '../Marker/Marker';

import { markerHovered, markerHoverExited } from '../../store/actions';

import styles from './Map.scss';

const Map = props => (
  <div className={styles.container}>
    <GoogleMap
      bootstrapURLKeys={{ key: [process.env.REACT_APP_GOOGLE_API_KEY] }}
      zoom={props.zoom}
      center={props.center}
      hoverDistance={18}
    >
      {props.retailers &&
        props.retailers.map(retailer => (
          <Marker
            key={retailer._id}
            lng={retailer.location.coordinates[0]}
            lat={retailer.location.coordinates[1]}
            onMouseEnter={() => props.markerHovered(retailer._id)}
            onMouseLeave={props.markerHoverExited}
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
  markerHovered: PropTypes.func,
  markerHoverExited: PropTypes.func,
};

const mapStateToProps = state => ({
  zoom: state.map.zoom,
  center: state.map.center,
  retailers: state.retailers,
});

const mapDispatchToProps = dispatch => ({
  markerHovered: markerId => dispatch(markerHovered(markerId)),
  markerHoverExited: () => dispatch(markerHoverExited()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
