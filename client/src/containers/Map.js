/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint react/no-unused-prop-types: "off" */
/* eslint no-underscore-dangle: "off" */
/* eslint object-curly-newline: "off" */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MapComponent from '../components/Map/Map';

import {
  handleBoundsChange,
  updateMapFromRetailers,
  updateCenterAndZoom,
  markerHovered,
  markerHoverExited,
} from '../store/actions';

class MapContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.retailers !== this.props.retailers) {
      if (nextProps.retailers.length === 0) {
        // TODO: add function here that will take the map size, search origin,
        // and search miles and calculate a bounding box X mile radius around origin,
        // then set center and zoom based on those bounds (similar to updateMapFromRetailers)
        this.props.updateCenterAndZoom(this.props.searchOrigin, 11);
      } else {
        this.props.updateMapFromRetailers(
          nextProps.retailers,
          this.props.size,
          this.props.searchOrigin
        );
      }
    }
  }

  render() {
    return (
      <MapComponent
        zoom={this.props.zoom}
        center={this.props.center}
        markers={this.props.retailers}
        hoveredMarker={this.props.hoveredMarker}
        onBoundsChange={this.props.handleBoundsChange}
        onMarkerHover={this.props.markerHovered}
        onMarkerHoverExit={this.props.markerHoverExited}
      />
    );
  }
}

MapContainer.propTypes = {
  retailers: PropTypes.array,
  zoom: PropTypes.number,
  center: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
  bounds: PropTypes.shape({
    nw: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
    se: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
    sw: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
    ne: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
  }),
  marginBounds: PropTypes.shape({
    nw: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
    se: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
    sw: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
    ne: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
  }),
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  hoveredMarker: PropTypes.string,
  searchOrigin: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  handleBoundsChange: PropTypes.func,
  updateMapFromRetailers: PropTypes.func,
  updateCenterAndZoom: PropTypes.func,
  markerHovered: PropTypes.func,
  markerHoverExited: PropTypes.func,
};

const mapStateToProps = state => ({
  retailers: state.retailers,
  zoom: state.map.zoom,
  center: state.map.center,
  bounds: state.map.bounds,
  marginBounds: state.map.marginBounds,
  size: state.map.size,
  hoveredMarker: state.map.hoveredMarker,
  searchOrigin: state.form.searchOrigin.coordinates,
});

const mapDispatchToProps = dispatch => ({
  handleBoundsChange: ({ center, zoom, bounds, marginBounds, size }) =>
    dispatch(handleBoundsChange(center, zoom, bounds, marginBounds, size)),
  updateMapFromRetailers: (retailers, size, searchOrigin) =>
    dispatch(updateMapFromRetailers(retailers, size, searchOrigin)),
  updateCenterAndZoom: (center, zoom) =>
    dispatch(updateCenterAndZoom(center, zoom)),
  markerHovered: markerId => dispatch(markerHovered(markerId)),
  markerHoverExited: () => dispatch(markerHoverExited()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
