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

import styles from './SearchForm.scss';

const SearchForm = props => {
  const inputProps = {
    value: props.address,
    onChange: props.updateOriginAddress,
    placeholder: 'Enter Zip, City or State',
    autoFocus: true,
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    props.getRetailers(props.coordinates, props.maxDistance);
  };

  const formStyles = {
    root: {
      paddingBottom: '0px',
      marginTop: '5px',
      marginRight: '10px',
      flex: '4',
      color: 'rgb(78, 78, 78)',
    },
    input: {
      width: '100%',
      padding: '10px 10px 7px 10px',
      outline: 'none',
      fontSize: '14px',
      fontFamily: 'Verlag-Light',
    },
    autocompleteContainer: {
      position: 'relative',
      top: '0',
      backgroundColor: 'white',
      border: 'none',
      width: '100%',
    },
    autocompleteItem: {
      backgroundColor: '#ffffff',
      padding: '10px',
      cursor: 'pointer',
      textAlign: 'left',
      paddingLeft: '20px',
    },
    autocompleteItemActive: {
      backgroundColor: 'rgb(253, 103, 33)',
      color: 'white',
    },
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <PlacesAutocomplete
          inputProps={inputProps}
          onSelect={props.updateOriginCoordinates}
          styles={formStyles}
          highlightFirstSuggestion
        />
        <div className={styles.distanceAndButton}>
          <MaxDistanceSelector
            options={[5, 10, 25, 50]}
            selected={props.maxDistance}
            onChange={props.updateMaxDistance}
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </div>
      </form>
    </div>
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
