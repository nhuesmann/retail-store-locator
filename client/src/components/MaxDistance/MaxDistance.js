import React from 'react';
import PropTypes from 'prop-types';

const MaxDistance = props => (
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

MaxDistance.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  selected: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

MaxDistance.defaultProps = {
  selected: 50,
};

export default MaxDistance;
