/* eslint no-underscore-dangle: "off" */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RetailerResult from '../RetailerResult/RetailerResult';

const RetailerList = props => (
  <div>
    <ul>
      {props.retailers &&
        props.retailers.map((retailer, index) => (
          <li key={retailer._id}>
            <RetailerResult selected={retailer._id === props.hoveredMarker}>
              {index + 1}. {retailer.name} - {retailer.address1}
            </RetailerResult>
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
