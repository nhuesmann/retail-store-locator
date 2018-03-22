/* eslint react/require-default-props: "off" */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { markerHovered, markerHoverExited } from '../store/actions';

import MarkerList from '../components/MarkerList/MarkerList';

const MarkerListContainer = props => (
  <MarkerList
    markers={props.retailers}
    hoveredId={props.hoveredId}
    onMouseEnter={props.markerHovered}
    onMouseLeave={props.markerHoverExited}
  />
);

MarkerListContainer.propTypes = {
  retailers: PropTypes.array,
  hoveredId: PropTypes.string,
  markerHovered: PropTypes.func.isRequired,
  markerHoverExited: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  retailers: state.retailers,
  hoveredId: state.map.hoveredMarker,
});

const mapDispatchToProps = dispatch => ({
  markerHovered: markerId => dispatch(markerHovered(markerId)),
  markerHoverExited: () => dispatch(markerHoverExited()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  MarkerListContainer
);
