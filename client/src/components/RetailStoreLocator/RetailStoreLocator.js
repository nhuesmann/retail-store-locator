/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RetailerResultList from '../RetailerResultList/RetailerResultList';
import RetailerMap from '../Map/Map';
import SearchForm from '../SearchForm/SearchForm';

import styles from './RetailStoreLocator.scss';

const RetailStoreLocator = props => (
  <div className={styles.container}>
    <div className={styles.searchContainer}>
      <SearchForm />
      <RetailerResultList retailers={props.retailers} />
    </div>
    <div className={styles.mapContainer}>
      <RetailerMap />
    </div>
  </div>
);

RetailStoreLocator.propTypes = {
  retailers: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  retailers: state.retailers,
});

export default connect(mapStateToProps)(RetailStoreLocator);
