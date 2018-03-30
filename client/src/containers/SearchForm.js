/* eslint react/no-unused-state: 0 */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSearchRadius } from '../store/selectors';

import SearchForm from '../components/SearchForm';

import {
  updateOriginCoordinates,
  updateOriginAddress,
  updateSearchRadius,
  getRetailers,
} from '../store/actions';

const SearchFormContainer = props => <SearchForm {...props} />;

SearchFormContainer.propTypes = {
  address: PropTypes.string.isRequired,
  coordinates: PropTypes.object.isRequired,
  searchRadius: PropTypes.number.isRequired,
  searchRadiusOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  searchRadiusSelectedIndex: PropTypes.number.isRequired,
  updateOriginCoordinates: PropTypes.func.isRequired,
  updateOriginAddress: PropTypes.func.isRequired,
  updateSearchRadius: PropTypes.func.isRequired,
  getRetailers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  address: state.form.searchOrigin.address,
  placeId: state.form.searchOrigin.placeId,
  coordinates: state.form.searchOrigin.coordinates,
  searchRadius: getSearchRadius(state),
  searchRadiusOptions: state.form.searchRadiusOptions,
  searchRadiusSelectedIndex: state.form.searchRadiusSelectedIndex,
});

const mapDispatchToProps = dispatch => ({
  updateOriginCoordinates: (address, placeId) =>
    dispatch(updateOriginCoordinates.request(address, placeId)),
  updateOriginAddress: address => dispatch(updateOriginAddress(address)),
  updateSearchRadius: event => dispatch(updateSearchRadius(event.target.value)),
  getRetailers: (origin, searchRadius) =>
    dispatch(getRetailers.request(origin, searchRadius)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchFormContainer
);
