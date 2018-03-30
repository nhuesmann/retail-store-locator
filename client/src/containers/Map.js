/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint react/no-unused-prop-types: "off" */
/* eslint no-underscore-dangle: "off" */
/* eslint object-curly-newline: "off" */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSearchRadius } from '../store/selectors';

import MapComponent from '../components/Map';

import {
  handleBoundsChange,
  updateMapFromRetailers,
  updateCenterAndZoom,
  retailerHovered,
  retailerHoverExited,
  retailerClicked,
  mapClicked,
  zoomAnimationStarted,
  zoomAnimationEnded,
} from '../store/actions';

class MapContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.retailers !== this.props.retailers) {
      this.props.updateMapFromRetailers(
        nextProps.retailers,
        this.props.size,
        this.props.searchOrigin.coordinates,
        this.props.searchRadius
      );
    }

    if (
      this.props.searchOrigin !== nextProps.searchOrigin ||
      this.props.searchRadiusIndex !== nextProps.searchRadiusIndex
    ) {
      this.clearResults = true;
      this.props.retailerClicked(null);
    } else {
      this.clearResults = false;
    }
  }

  checkIfMarkersEnabled = (fn, id) => {
    if (this.clearResults) return {};
    return id ? fn(id) : fn();
  };

  render() {
    return (
      <MapComponent
        zoom={this.props.zoom}
        center={this.props.center}
        markers={this.props.retailers}
        hoveredRetailerId={this.props.hoveredRetailerId}
        clickedRetailerId={this.props.clickedRetailerId}
        onBoundsChange={this.props.handleBoundsChange}
        onMarkerHover={id =>
          this.checkIfMarkersEnabled(this.props.retailerHovered, id)
        }
        onMarkerHoverExit={() =>
          this.checkIfMarkersEnabled(this.props.retailerHoverExited)
        }
        onMarkerClick={id =>
          this.checkIfMarkersEnabled(this.props.retailerClicked, id)
        }
        onMapClick={() => this.checkIfMarkersEnabled(this.props.mapClicked)}
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
  searchOrigin: PropTypes.shape({
    address: PropTypes.string,
    placeId: PropTypes.string,
    coordinates: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }).isRequired,
  searchRadius: PropTypes.number,
  searchRadiusIndex: PropTypes.number.isRequired,
  handleBoundsChange: PropTypes.func,
  updateMapFromRetailers: PropTypes.func,
  updateCenterAndZoom: PropTypes.func,
  hoveredRetailerId: PropTypes.string,
  clickedRetailerId: PropTypes.string,
  retailerHovered: PropTypes.func,
  retailerHoverExited: PropTypes.func,
  retailerClicked: PropTypes.func,
  mapClicked: PropTypes.func,
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
  clickedRetailerId: state.map.clickedRetailerId,
  showMarkers: state.map.showMarkers,
  searchCompleted: state.form.searchCompleted,
  searchOrigin: state.form.searchOrigin,
  searchRadius: getSearchRadius(state),
  searchRadiusIndex: state.form.searchRadiusSelectedIndex,
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
  retailerClicked: retailerId => dispatch(retailerClicked(retailerId)),
  mapClicked: () => dispatch(mapClicked()),
  zoomAnimationStarted: () => dispatch(zoomAnimationStarted()),
  zoomAnimationEnded: () => dispatch(zoomAnimationEnded()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
