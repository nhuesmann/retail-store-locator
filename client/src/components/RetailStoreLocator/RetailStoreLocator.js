/* eslint react/forbid-prop-types: "off" */

import React from 'react';

import SearchForm from '../../containers/SearchForm';
import RetailerResultList from '../../containers/RetailerResultList';
import MapContainer from '../../containers/Map';

import styles from './RetailStoreLocator.scss';

const RetailStoreLocator = () => (
  <div className={styles.container}>
    <div className={styles.searchContainer}>
      <SearchForm />
      <RetailerResultList />
    </div>
    <div className={styles.mapContainer}>
      <MapContainer />
    </div>
  </div>
);

export default RetailStoreLocator;
