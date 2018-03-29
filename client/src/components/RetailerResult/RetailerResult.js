/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */
/* eslint object-curly-newline: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './RetailerResult.scss';

const RetailerResult = props => {
  const { retailer } = props;
  const classes = [styles.container];

  if (props.hovered || props.clicked) {
    classes.push(styles.selected);
  }

  return (
    <div
      className={classes.join(' ')}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onClick={props.onClick}
    >
      <h2 className={styles.heading}>{retailer.name}</h2>
      <p>
        {retailer.address}, {retailer.city} {retailer.state}{' '}
        {retailer.zip.slice(0, 5)}
      </p>
    </div>
  );
};

RetailerResult.propTypes = {
  retailer: PropTypes.object.isRequired,
  hovered: PropTypes.bool.isRequired,
  clicked: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RetailerResult;
