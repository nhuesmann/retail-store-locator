/* eslint react/no-unused-state: 0 */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

import MaxDistanceSelector from '../MaxDistanceSelector/MaxDistanceSelector';

import {
  updateOriginCoordinates,
  updateOriginAddress,
  updateMaxDistance,
  getRetailers,
} from '../../store/actions';

const SearchForm = props => {
  const inputProps = {
    value: props.address,
    onChange: props.updateOriginAddress,
    placeholder: 'Choose a location...',
    autoFocus: true,
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    props.getRetailers(props.coordinates, props.maxDistance);
  };

  // const renderSuggestion = ({ suggestion }) => (
  //   <div>
  //     <i className="fa fa-map-marker" />
  //     {suggestion}
  //   </div>
  // );

  // default styles with minor changes
  const formStyles = {
    root: { position: 'relative', paddingBottom: '0px' },
    input: { display: 'inline-block', width: '100%', padding: '10px' },
    autocompleteContainer: {
      position: 'relative',
      top: '100%',
      backgroundColor: 'white',
      border: '1px solid rgb(78, 78, 78)',
      width: '80%',
    },
    autocompleteItem: {
      backgroundColor: '#ffffff',
      padding: '10px',
      color: 'rgb(253, 103, 33)',
      cursor: 'pointer',
    },
    autocompleteItemActive: { backgroundColor: 'rgb(247, 247, 247)' },
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <PlacesAutocomplete
        inputProps={inputProps}
        onSelect={props.updateOriginCoordinates}
        styles={formStyles}
        highlightFirstSuggestion
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <MaxDistanceSelector
          options={[5, 10, 25, 50]}
          selected={props.maxDistance}
          onChange={props.updateMaxDistance}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

SearchForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
