/* eslint no-underscore-dangle: "off" */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import PropTypes from 'prop-types';

import RetailerResult from '../RetailerResult/RetailerResult';

import styles from './RetailerResultList.scss';

const RetailerResultList = props => (
  <div className={styles.container}>
    <ul>
      {props.retailers &&
        props.retailers.map(retailer => (
          <li key={retailer._id}>
            <RetailerResult
              retailer={retailer}
              selected={retailer._id === props.hoveredMarker}
            />
          </li>
        ))}
    </ul>
  </div>
);

RetailerResultList.propTypes = {
  retailers: PropTypes.array.isRequired,
  hoveredMarker: PropTypes.string,
};

RetailerResultList.defaultProps = {
  hoveredMarker: null,
};

export default RetailerResultList;
