/* eslint no-underscore-dangle: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import PropTypes from 'prop-types';

import RetailerResult from '../RetailerResult/RetailerResult';
import NoResults from '../NoResults/NoResults';

import styles from './RetailerResultList.scss';

const RetailerResultList = props => (
  <div className={styles.container}>
    <ul>
      {props.retailers.length > 0 &&
        props.searchCompleted &&
        props.retailers.map(retailer => (
          <li key={retailer._id}>
            <RetailerResult
              retailer={retailer}
              selected={retailer._id === props.hoveredRetailerId}
              onMouseEnter={() => props.retailerHovered(retailer._id)}
              onMouseLeave={props.retailerHoverExited}
            />
          </li>
        ))}
      {props.retailers.length === 0 &&
        props.searchCompleted && (
          <li>
            <NoResults
              searchRadiusOptions={props.searchRadiusOptions}
              searchRadiusIndex={props.searchRadiusIndex}
            />
          </li>
        )}
    </ul>
  </div>
);

RetailerResultList.propTypes = {
  retailers: PropTypes.array.isRequired,
  hoveredRetailerId: PropTypes.string,
  searchCompleted: PropTypes.bool.isRequired,
  searchRadiusOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  searchRadiusIndex: PropTypes.number.isRequired,
  retailerHovered: PropTypes.func.isRequired,
  retailerHoverExited: PropTypes.func.isRequired,
};

RetailerResultList.defaultProps = {
  hoveredRetailerId: null,
};

export default RetailerResultList;
