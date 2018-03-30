import React from 'react';
import PropTypes from 'prop-types';

const SearchRadiusSelector = ({ options, selected, onChange }) => (
  <div>
    <select value={selected} onChange={onChange}>
      {options.map(option => (
        <option key={option} value={option}>
          {option} miles
        </option>
      ))}
    </select>
  </div>
);

SearchRadiusSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchRadiusSelector;
