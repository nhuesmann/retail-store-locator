/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint react/no-unused-prop-types: "off" */
/* eslint no-underscore-dangle: "off" */
/* eslint object-curly-newline: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import styled from 'styled-components';

import Marker from './Marker';

const Container = styled.div`
  width: 100%;
  height: 800px;
`;

const defaultZoom = 11;
const defaultCenter = {
  lat: 33.913609,
  lng: -118.384909,
};

const distanceToMouse = ({ x, y }, { x: mouseX, y: mouseY }) =>
  Math.sqrt(
    (x - mouseX) * (x - mouseX) + (y - mouseY - 24) * (y - mouseY - 24)
  );

const MapComponent = props => (
  <Container>
    <GoogleMap
      bootstrapURLKeys={{ key: [process.env.REACT_APP_GOOGLE_API_KEY] }}
      zoom={props.zoom}
      center={props.center}
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      hoverDistance={16}
      distanceToMouse={distanceToMouse}
      margin={[30, 30, 30, 30]}
      onChange={props.onBoundsChange}
      onClick={props.onMapClick}
      onZoomAnimationStart={props.zoomAnimationStarted}
      onZoomAnimationEnd={props.zoomAnimationEnded}
    >
      {props.markers.length > 0 &&
        props.markers.map(retailer => (
          <Marker
            key={retailer._id}
            lng={retailer.location.coordinates[0]}
            lat={retailer.location.coordinates[1]}
            onMouseEnter={() => props.onMarkerHover(retailer._id)}
            onMouseLeave={props.onMarkerHoverExit}
            onClick={() => props.onMarkerClick(retailer._id)}
            hovered={retailer._id === props.hoveredRetailerId}
            clicked={retailer._id === props.clickedRetailerId}
            show={props.showMarkers}
          />
        ))}
    </GoogleMap>
  </Container>
);

MapComponent.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  markers: PropTypes.array,
  onBoundsChange: PropTypes.func,
  hoveredRetailerId: PropTypes.string,
  clickedRetailerId: PropTypes.string,
  onMarkerHover: PropTypes.func,
  onMarkerHoverExit: PropTypes.func,
  onMarkerClick: PropTypes.func,
  onMapClick: PropTypes.func,
  zoomAnimationStarted: PropTypes.func,
  zoomAnimationEnded: PropTypes.func,
  showMarkers: PropTypes.bool,
};

export default MapComponent;
