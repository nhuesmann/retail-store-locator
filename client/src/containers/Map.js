/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint react/no-unused-prop-types: "off" */
/* eslint no-underscore-dangle: "off" */
/* eslint object-curly-newline: "off" */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSearchRadius } from '../store/selectors';

import MapComponent from '../components/Map/Map';

import {
  handleBoundsChange,
  updateMapFromRetailers,
  updateCenterAndZoom,
  retailerHovered,
  retailerHoverExited,
  zoomAnimationStarted,
  zoomAnimationEnded,
} from '../store/actions';

class MapContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.retailers !== this.props.retailers) {
      this.props.updateMapFromRetailers(
        nextProps.retailers,
        this.props.size,
        this.props.searchOrigin,
        this.props.searchRadius
      );
    }
  }

  render() {
    return (
      <MapComponent
        zoom={this.props.zoom}
        center={this.props.center}
        markers={this.props.retailers}
        hoveredRetailerId={this.props.hoveredRetailerId}
        onBoundsChange={this.props.handleBoundsChange}
        onMarkerHover={this.props.retailerHovered}
        onMarkerHoverExit={this.props.retailerHoverExited}
        zoomAnimationStarted={this.props.zoomAnimationStarted}
        zoomAnimationEnded={this.props.zoomAnimationEnded}
        showMarkers={this.props.showMarkers}
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
  hoveredRetailerId: PropTypes.string,
  searchOrigin: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  searchRadius: PropTypes.number,
  handleBoundsChange: PropTypes.func,
  updateMapFromRetailers: PropTypes.func,
  updateCenterAndZoom: PropTypes.func,
  retailerHovered: PropTypes.func,
  retailerHoverExited: PropTypes.func,
  searchCompleted: PropTypes.bool,
  zoomAnimationStarted: PropTypes.func,
  zoomAnimationEnded: PropTypes.func,
  showMarkers: PropTypes.bool,
};

const mapStateToProps = state => ({
  retailers: state.retailers,
  zoom: state.map.zoom,
  center: state.map.center,
  bounds: state.map.bounds,
  marginBounds: state.map.marginBounds,
  size: state.map.size,
  hoveredRetailerId: state.map.hoveredRetailerId,
  showMarkers: state.map.showMarkers,
  searchOrigin: state.form.searchOrigin.coordinates,
  searchCompleted: state.form.searchCompleted,
  searchRadius: getSearchRadius(state),
});

const mapDispatchToProps = dispatch => ({
  handleBoundsChange: ({ center, zoom, bounds, marginBounds, size }) =>
    dispatch(handleBoundsChange(center, zoom, bounds, marginBounds, size)),
  updateMapFromRetailers: (retailers, size, searchOrigin, searchRadius) =>
    dispatch(
      updateMapFromRetailers(retailers, size, searchOrigin, searchRadius)
    ),
  updateCenterAndZoom: (center, zoom) =>
    dispatch(updateCenterAndZoom(center, zoom)),
  retailerHovered: retailerId => dispatch(retailerHovered(retailerId)),
  retailerHoverExited: () => dispatch(retailerHoverExited()),
  zoomAnimationStarted: () => dispatch(zoomAnimationStarted()),
  zoomAnimationEnded: () => dispatch(zoomAnimationEnded()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
