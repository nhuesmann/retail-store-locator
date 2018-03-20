/* eslint no-underscore-dangle: "off" */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RetailerResult from '../RetailerResult/RetailerResult';

import styles from './RetailerResultList.scss';

const RetailerList = props => (
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

RetailerList.propTypes = {
  retailers: PropTypes.array.isRequired,
  hoveredMarker: PropTypes.string,
};

RetailerList.defaultProps = {
  hoveredMarker: null,
};

const mapStateToProps = state => ({
  retailers: state.retailers,
  hoveredMarker: state.map.hoveredMarker,
});

export default connect(mapStateToProps)(RetailerList);
