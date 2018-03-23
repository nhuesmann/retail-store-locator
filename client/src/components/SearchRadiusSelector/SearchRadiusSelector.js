import React from 'react';
import PropTypes from 'prop-types';

const SearchRadiusSelector = ({ options, selectedIndex, onChange }) => {
  const selectedValue = options[selectedIndex];

  return (
    <div>
      <select value={selectedValue} onChange={onChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option} miles
          </option>
        ))}
      </select>
    </div>
  );
};

SearchRadiusSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchRadiusSelector;
