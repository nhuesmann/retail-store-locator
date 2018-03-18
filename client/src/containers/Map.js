/* eslint react/no-did-mount-set-state: "off" */

import React, { Component, Fragment } from 'react';
import axios from 'axios';

import RetailerList from '../components/RetailerList/RetailerList';
import Map from '../components/Map/Map';

class MapContainer extends Component {
  state = {
    center: { lat: 34.1562727, lng: -118.3959542 },
    zoom: 11,
    retailers: [],
  };

  async componentDidMount() {
    const response = await axios.get('/retailers');

    this.setState({ retailers: response.data });
  }

  render() {
    return (
      <div>
        {this.state.retailers && (
          <Fragment>
            <RetailerList retailers={this.state.retailers} />
            <Map
              markers={this.state.retailers}
              center={this.state.center}
              zoom={this.state.zoom}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default MapContainer;
