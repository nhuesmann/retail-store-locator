import React from 'react';
import PropTypes from 'prop-types';

const MaxDistanceSelector = props => (
  <div>
    <select value={props.selected} onChange={props.onChange}>
      {props.options.map(option => (
        <option key={option} value={option}>
          {option} miles
        </option>
      ))}
    </select>
  </div>
);

MaxDistanceSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  selected: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

MaxDistanceSelector.defaultProps = {
  selected: 50,
};

export default MaxDistanceSelector;
