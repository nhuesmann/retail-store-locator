/* eslint react/prop-types: 0 */

import React from 'react';

import RetailerResultList from '../RetailerResultList/RetailerResultList';
import RetailerMap from '../Map/Map';
import SearchForm from '../SearchForm/SearchForm';

const RetailStoreLocator = props => (
  <div>
    <div>
      <SearchForm
        options={[5, 10, 25, 50]}
        selected={props.maxDistance}
        onChange={this.handleMaxDistanceSelect}
      />
      <RetailerResultList retailers={props.retailers} />
    </div>
    <div>
      <RetailerMap
        markers={props.retailers}
        center={props.center}
        zoom={props.zoom}
      />
    </div>
  </div>
);

export default RetailStoreLocator;
