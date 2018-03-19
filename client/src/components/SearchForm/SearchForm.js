/* eslint react/no-unused-state: 0 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import {
  // updateMaxDistance,
  updateOriginAddress,
  updateOriginCoordinates,
} from '../../store/actions';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      placeId: '',
      coordinates: { lat: null, lng: null },
    };
  }

  handleSelect = async (address, placeId) => {
    const geocodedAddress = await geocodeByAddress(address);
    const coordinates = await getLatLng(geocodedAddress[0]);

    this.setState({ address, placeId, coordinates });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    const inputProps = {
      value: this.props.address,
      onChange: this.props.onChange,
      placeholder: 'Search...',
      autoFocus: true,
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
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete
          inputProps={inputProps}
          onSelect={this.props.updateOriginCoordinates}
          styles={formStyles}
          highlightFirstSuggestion
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

SimpleForm.propTypes = {
  address: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  updateOriginCoordinates: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  address: state.form.searchOrigin.address,
  placeId: state.form.searchOrigin.placeId,
  coordinates: state.form.searchOrigin.coordinates,
  maxDistance: state.form.maxDistance,
});

const mapDispatchToProps = dispatch => ({
  onChange: address => dispatch(updateOriginAddress(address)),
  updateOriginCoordinates: (address, placeId) =>
    dispatch(updateOriginCoordinates.request(address, placeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleForm);
