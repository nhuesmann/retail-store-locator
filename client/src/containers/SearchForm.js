/* eslint react/no-unused-state: 0 */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchForm from '../components/SearchForm/SearchForm';

import {
  updateOriginCoordinates,
  updateOriginAddress,
  updateMaxDistance,
  getRetailers,
} from '../store/actions';

const SearchFormContainer = props => <SearchForm {...props} />;

SearchFormContainer.propTypes = {
  address: PropTypes.string.isRequired,
  coordinates: PropTypes.object.isRequired,
  maxDistance: PropTypes.number.isRequired,
  updateOriginCoordinates: PropTypes.func.isRequired,
  updateOriginAddress: PropTypes.func.isRequired,
  updateMaxDistance: PropTypes.func.isRequired,
  getRetailers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  address: state.form.searchOrigin.address,
  placeId: state.form.searchOrigin.placeId,
  coordinates: state.form.searchOrigin.coordinates,
  maxDistance: state.form.maxDistance,
});

const mapDispatchToProps = dispatch => ({
  updateOriginCoordinates: (address, placeId) =>
    dispatch(updateOriginCoordinates.request(address, placeId)),
  updateOriginAddress: address => dispatch(updateOriginAddress(address)),
  updateMaxDistance: event => dispatch(updateMaxDistance(event.target.value)),
  getRetailers: (origin, maxDistance) =>
    dispatch(getRetailers.request(origin, maxDistance)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchFormContainer
);
