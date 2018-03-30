/* eslint react/no-unused-state: 0 */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import styled from 'styled-components';

import SearchRadiusSelector from './SearchRadiusSelector';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
`;

const SearchContainer = styled.div`
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5.5px 8px 0 8px;
`;

const Button = styled.button`
  font-family: 'Verlag-Book';
  font-size: 13px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: white;
  background-color: rgb(253, 103, 33);
  border: none;
  border-radius: 4px;
  width: 76px;
  height: 25px;
  padding-top: 3px;
  cursor: pointer;
`;

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
      fontSize: '16px',
      fontFamily: 'Verlag-Light',
      height: '50px',
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
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <PlacesAutocomplete
          inputProps={inputProps}
          onSelect={props.updateOriginCoordinates}
          styles={formStyles}
          highlightFirstSuggestion
        />
        <SearchContainer>
          <SearchRadiusSelector
            options={props.searchRadiusOptions}
            selected={props.searchRadius}
            onChange={props.updateSearchRadius}
          />
          <ButtonContainer>
            <Button type="submit">Search</Button>
          </ButtonContainer>
        </SearchContainer>
      </Form>
    </Container>
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
