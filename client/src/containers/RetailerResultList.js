/* eslint no-underscore-dangle: "off" */
/* eslint react/forbid-prop-types: "off" */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RetailerResultList from '../components/RetailerResultList/RetailerResultList';

class RetailerResultListContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.searchOrigin !== nextProps.searchOrigin ||
      this.props.searchRadiusIndex !== nextProps.searchRadiusIndex
    ) {
      this.clearResults = true;
    } else {
      this.clearResults = false;
    }
  }

  render() {
    return this.clearResults ? null : <RetailerResultList {...this.props} />;
  }
}

RetailerResultListContainer.propTypes = {
  retailers: PropTypes.array.isRequired,
  hoveredMarker: PropTypes.string,
  searchCompleted: PropTypes.bool.isRequired,
  searchOrigin: PropTypes.shape({
    address: PropTypes.string,
    placeId: PropTypes.string,
    coordinates: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }).isRequired,
  searchRadiusOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  searchRadiusIndex: PropTypes.number.isRequired,
};

RetailerResultListContainer.defaultProps = {
  hoveredMarker: null,
};

const mapStateToProps = state => ({
  retailers: state.retailers,
  hoveredMarker: state.map.hoveredMarker,
  searchCompleted: state.form.searchCompleted,
  searchOrigin: state.form.searchOrigin,
  searchRadiusOptions: state.form.searchRadiusOptions,
  searchRadiusIndex: state.form.searchRadiusSelectedIndex,
});

export default connect(mapStateToProps)(RetailerResultListContainer);
