/* eslint react/no-did-mount-set-state: "off" */
/* eslint no-unused-vars: "off" */

import React, { Component, Fragment } from 'react';
import axios from 'axios';

import RetailerList from '../components/RetailerList/RetailerList';
import RetailerMap from '../components/Map/Map';
import SearchForm from '../components/SearchForm/SearchForm';

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
    center: null,
    zoom: 11, // 11 is good
    retailers: [],
    maxDistance: 25,
  };

  async componentDidMount() {
    const sourceLat = 34.11903902186396;
    const sourceLng = -118.58300465970834;
    const { maxDistance } = this.state;
    // const maxDistance = this.state.maxDistance.split(' ')[0];

    const query = `?lat=${sourceLat}&lng=${sourceLng}&maxMiles=${maxDistance}`;

    // const response = await axios.get('/retailers');
    const response = await axios.get(`/retailers${query}`);

    if (response.data.length > 0) {
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
  }

  handleMaxDistanceSelect = event => {
    this.setState({ maxDistance: +event.target.value });
  };

  render() {
    return (
      <Fragment>
        {this.state.retailers && (
          <Fragment>
            {/* <SearchBox />
            <MaxDistance
              options={[5, 10, 25, 50]}
              selected={this.state.maxDistance}
              onChange={this.handleMaxDistanceSelect}
            /> */}
            <SearchForm
              options={[5, 10, 25, 50]}
              selected={this.state.maxDistance}
              onChange={this.handleMaxDistanceSelect}
            />
            <RetailerList retailers={this.state.retailers} />
            <RetailerMap
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
