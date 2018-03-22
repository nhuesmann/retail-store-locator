/* eslint react/no-did-mount-set-state: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint react/prefer-stateless-function: "off" */
/* eslint no-unused-vars: "off" */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import RetailerResultList from '../components/RetailerResultList/RetailerResultList';
import MapContainer from './Map';
import SearchForm from '../components/SearchForm/SearchForm';

// TODO: Need to rework container vs component structure

class RetailStoreLocator extends Component {
  render() {
    return (
      <Fragment>
        <SearchForm />
        {this.props.retailers && (
          <RetailerResultList retailers={this.props.retailers} />
        )}
        <MapContainer />
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
