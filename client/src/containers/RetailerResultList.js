/* eslint no-underscore-dangle: "off" */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RetailerResultList from '../components/RetailerResultList/RetailerResultList';

const RetailerResultListContainer = props => <RetailerResultList {...props} />;

RetailerResultListContainer.propTypes = {
  retailers: PropTypes.array.isRequired,
  hoveredMarker: PropTypes.string,
};

RetailerResultListContainer.defaultProps = {
  hoveredMarker: null,
};

const mapStateToProps = state => ({
  retailers: state.retailers,
  hoveredMarker: state.map.hoveredMarker,
});

export default connect(mapStateToProps)(RetailerResultListContainer);
