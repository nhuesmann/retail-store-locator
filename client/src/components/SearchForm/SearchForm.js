/* eslint react/no-unused-state: 0 */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

import SearchRadiusSelector from '../SearchRadiusSelector/SearchRadiusSelector';

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

    props.getRetailers(props.coordinates, props.searchRadius);
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
      position: 'absolute',
      top: '38px',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
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
          <SearchRadiusSelector
            options={props.searchRadiusOptions}
            selected={props.searchRadius}
            onChange={props.updateSearchRadius}
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
  searchRadius: PropTypes.number.isRequired,
  searchRadiusOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateOriginCoordinates: PropTypes.func.isRequired,
  updateOriginAddress: PropTypes.func.isRequired,
  updateSearchRadius: PropTypes.func.isRequired,
  getRetailers: PropTypes.func.isRequired,
};

export default SearchForm;
