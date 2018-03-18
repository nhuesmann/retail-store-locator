/* eslint no-underscore-dangle: "off" */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import PropTypes from 'prop-types';

const RetailerList = props => (
  <div>
    <ul>
      {props.retailers.map(retailer => (
        <li key={retailer._id}>
          {retailer.name} - {retailer.address1}
        </li>
      ))}
    </ul>
  </div>
);

RetailerList.propTypes = {
  retailers: PropTypes.array.isRequired,
};

export default RetailerList;
