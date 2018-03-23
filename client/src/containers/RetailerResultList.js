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
  searchWasSubmitted: PropTypes.bool.isRequired,
};

RetailerResultListContainer.defaultProps = {
  hoveredMarker: null,
};

const mapStateToProps = state => ({
  retailers: state.retailers,
  hoveredMarker: state.map.hoveredMarker,
  searchWasSubmitted: state.form.didSubmitSearch,
});

export default connect(mapStateToProps)(RetailerResultListContainer);
