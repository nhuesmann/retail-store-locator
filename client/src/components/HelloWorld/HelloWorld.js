/* eslint react/no-did-mount-set-state: "off" */
/* eslint no-underscore-dangle: "off" */

import React, { Component } from 'react';
import axios from 'axios';

class HelloWorld extends Component {
  state = {
    retailers: null,
  };

  async componentDidMount() {
    const response = await axios.get('/retailers');

    this.setState({ retailers: response.data });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.retailers &&
            this.state.retailers.map(retailer => (
              <li key={retailer._id}>
                {retailer.name} - {retailer.address1}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default HelloWorld;
