/* eslint react/no-did-mount-set-state: "off" */
/* eslint no-unused-vars: "off" */

import React, { Component, Fragment } from 'react';
import axios from 'axios';

import RetailerList from '../components/RetailerList/RetailerList';
import Map from '../components/Map/Map';

const calculateCenter = locations => {
  const total = locations.length;

  if (total === 1) {
    return locations[0];
  }

  let x = 0;
  let y = 0;
  let z = 0;

  locations.forEach(location => {
    const latitude = location.lat * Math.PI / 180;
    const longitude = location.lng * Math.PI / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  });

  x /= total;
  y /= total;
  z /= total;

  const centralLongitude = Math.atan2(y, x);
  const centralSquareRoot = Math.sqrt(x * x + y * y);
  const centralLatitude = Math.atan2(z, centralSquareRoot);

  const center = {
    lat: centralLatitude * 180 / Math.PI,
    lng: centralLongitude * 180 / Math.PI,
  };

  return center;
};

class MapContainer extends Component {
  state = {
    center: { lat: 34.1562727, lng: -118.3959542 },
    zoom: 11,
    retailers: [],
  };

  async componentDidMount() {
    const response = await axios.get('/retailers');

    const locations = response.data.map(retailer => ({
      lat: retailer.location.coordinates[1],
      lng: retailer.location.coordinates[0],
    }));

    const center = calculateCenter(locations);

    this.setState({
      retailers: response.data,
      center,
    });
  }

  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default MapContainer;
