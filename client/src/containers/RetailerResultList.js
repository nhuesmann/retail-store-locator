/* eslint no-underscore-dangle: "off" */
/* eslint react/forbid-prop-types: "off" */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RetailerResultList from '../components/RetailerResultList';

import {
  retailerHovered,
  retailerHoverExited,
  retailerClicked,
} from '../store/actions';

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
  hoveredRetailerId: PropTypes.string,
  clickedRetailerId: PropTypes.string,
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
  retailerHovered: PropTypes.func.isRequired,
  retailerHoverExited: PropTypes.func.isRequired,
  retailerClicked: PropTypes.func.isRequired,
};

RetailerResultListContainer.defaultProps = {
  hoveredRetailerId: null,
  clickedRetailerId: null,
};

const mapStateToProps = state => ({
  retailers: state.retailers,
  hoveredRetailerId: state.map.hoveredRetailerId,
  clickedRetailerId: state.map.clickedRetailerId,
  searchCompleted: state.form.searchCompleted,
  searchOrigin: state.form.searchOrigin,
  searchRadiusOptions: state.form.searchRadiusOptions,
  searchRadiusIndex: state.form.searchRadiusSelectedIndex,
});

const mapDispatchToProps = dispatch => ({
  retailerHovered: retailerId => dispatch(retailerHovered(retailerId)),
  retailerHoverExited: () => dispatch(retailerHoverExited()),
  retailerClicked: retailerId => dispatch(retailerClicked(retailerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RetailerResultListContainer
);
