import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(218, 218, 218);
  padding: 20px 15px;
  text-align: left;
  color: rgb(78, 78, 78);
`;

const Heading = styled.h2`
  font-family: 'Verlag-Bold';
`;

const NoResults = props => {
  const options = props.searchRadiusOptions;
  const index = props.searchRadiusIndex;

  const heading = 'Sorry! No results.';
  const message =
    index < options.length - 1
      ? 'Try widening your search.'
      : 'Coming soon to a retail store near you...';

  return (
    <Container>
      <Heading>{heading}</Heading>
      <p>{message}</p>
    </Container>
  );
};

NoResults.propTypes = {
  searchRadiusOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  searchRadiusIndex: PropTypes.number.isRequired,
};

export default NoResults;
