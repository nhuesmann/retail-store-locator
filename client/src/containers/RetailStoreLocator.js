/* eslint react/no-did-mount-set-state: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint no-unused-vars: "off" */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import RetailerList from '../components/RetailerList/RetailerList';
import RetailerMap from '../components/Map/Map';
import SearchForm from '../components/SearchForm/SearchForm';

class RetailStoreLocator extends Component {
  state = {
    // retailers: [],
    // maxDistance: 25,
  };

  // handleMaxDistanceSelect = event => {
  //   this.setState({ maxDistance: +event.target.value });
  // };

  render() {
    return (
      <Fragment>
        <SearchForm />
        {this.props.retailers && (
          <RetailerList retailers={this.props.retailers} />
        )}
        <RetailerMap />
      </Fragment>
    );
  }
}

RetailStoreLocator.propTypes = {
  retailers: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  retailers: state.retailers,
});

export default connect(mapStateToProps)(RetailStoreLocator);
