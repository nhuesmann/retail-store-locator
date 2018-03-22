/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint react/no-unused-prop-types: "off" */
/* eslint no-underscore-dangle: "off" */
/* eslint object-curly-newline: "off" */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MapComponent from '../components/Map/Map';

import { handleBoundsChange, updateMapFromRetailers } from '../store/actions';

class MapContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.retailers !== this.props.retailers) {
      this.props.updateMapFromRetailers(nextProps.retailers, this.props.size);
    }
  }

  render() {
    return (
      <MapComponent
        markers={this.props.retailers}
        zoom={this.props.zoom}
        center={this.props.center}
        onChange={this.props.handleBoundsChange}
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
  handleBoundsChange: PropTypes.func,
  updateMapFromRetailers: PropTypes.func,
};

const mapStateToProps = state => ({
  retailers: state.retailers,
  zoom: state.map.zoom,
  center: state.map.center,
  bounds: state.map.bounds,
  marginBounds: state.map.marginBounds,
  size: state.map.size,
});

const mapDispatchToProps = dispatch => ({
  handleBoundsChange: ({ center, zoom, bounds, marginBounds, size }) =>
    dispatch(handleBoundsChange(center, zoom, bounds, marginBounds, size)),
  updateMapFromRetailers: (retailers, size) =>
    dispatch(updateMapFromRetailers(retailers, size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
