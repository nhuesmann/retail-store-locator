/* eslint no-underscore-dangle: "off" */
/* eslint react/forbid-prop-types: "off" */

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
              selected={retailer._id === props.hoveredMarker}
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
  hoveredMarker: PropTypes.string,
  searchCompleted: PropTypes.bool.isRequired,
  searchRadiusOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  searchRadiusIndex: PropTypes.number.isRequired,
};

RetailerResultList.defaultProps = {
  hoveredMarker: null,
};

export default RetailerResultList;
