/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint no-confusing-arrow: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import icon from '../images/icons/map-marker@2x.png';

const markerWidth = '20px';
const markerHeight = '37px';
const hoverMultiplier = 1.3;

const MarkerContainer = styled.div`
  position: absolute;
  width: ${({ hovered }) =>
    hovered ? `calc(${markerWidth} * ${hoverMultiplier})` : markerWidth};
  height: ${({ hovered }) =>
    hovered ? `calc(${markerHeight} * ${hoverMultiplier})` : markerHeight};
  left: ${({ hovered }) =>
    hovered
      ? `calc(-${markerWidth} * ${hoverMultiplier} / 2)`
      : `calc(-${markerWidth} / 2)`};
  top: ${({ hovered }) =>
    hovered
      ? `calc(-${markerHeight} * ${hoverMultiplier})`
      : `calc(-${markerHeight})`};
  cursor: pointer;
  transition: all 0.1s ease;
`;

const Marker = props =>
  props.show && (
    <MarkerContainer
      hovered={props.$hover || props.hovered || props.clicked}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onClick={props.onClick}
    >
      <img width="100%" height="100%" src={icon} alt="map marker" />
    </MarkerContainer>
  );

Marker.propTypes = {
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  $hover: PropTypes.bool,
  hovered: PropTypes.bool.isRequired,
  clicked: PropTypes.bool.isRequired,
};

Marker.defaultProps = {
  $hover: false,
};

export default Marker;
