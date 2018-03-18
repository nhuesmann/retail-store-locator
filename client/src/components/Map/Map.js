import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';

import styles from './Map.scss';

const Map = props => (
  <div className={styles.container}>
    <GoogleMap
      bootstrapURLKeys={{ key: [process.env.REACT_APP_GOOGLE_API_KEY] }}
      defaultCenter={props.center}
      defaultZoom={props.zoom}
    >
      {props.children}
    </GoogleMap>
  </div>
);

Map.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Map.defaultProps = {
  center: { lat: 34.1562727, lng: -118.3959542 },
  zoom: 11,
  children: null,
};

export default Map;
