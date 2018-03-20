import { takeEvery, put, call, all } from 'redux-saga/effects';
import axios from 'axios';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import * as actions from '../actions';

const {
  getRetailers,
  updateOriginAddress,
  updateOriginPlaceId,
  updateOriginCoordinates,
  updateMapCenter,
  updateZoom,
} = actions;

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

const fetchEntityCollection = (resource, query) => {
  const queryString = query ? `/${query}` : '';
  return axios.get(`${resource}${queryString}`);
};

function* getRetailersSaga({ origin, maxDistance }) {
  try {
    const { lat, lng } = origin;
    const query = `?lat=${lat}&lng=${lng}&maxMiles=${maxDistance}`;

    const response = yield call(fetchEntityCollection, 'retailers', query);

    if (response.data.length > 0) {
      const locations = response.data.map(retailer => ({
        lat: retailer.location.coordinates[1],
        lng: retailer.location.coordinates[0],
      }));

      const center = calculateCenter(locations);

      const zoom = locations.length === 1 ? 14 : 11;

      yield put(updateZoom(zoom));
      yield put(updateMapCenter(center));
      yield put(getRetailers.success(response.data));
    } else {
      console.log('no retailers found');
      // TODO: need to display in UI
      yield put(updateMapCenter(origin));
      yield put(getRetailers.success([]));
    }
  } catch (error) {
    yield put(getRetailers.failure(error));
  }
}

function* watchGetRetailersSaga() {
  yield takeEvery(actions.GET_RETAILERS.REQUEST, getRetailersSaga);
}

function* updateOriginCoordinatesSaga({ address, placeId }) {
  try {
    yield put(updateOriginAddress(address));
    yield put(updateOriginPlaceId(placeId));
    const geocodedAddress = yield call(geocodeByAddress, address);
    const coordinates = yield call(getLatLng, geocodedAddress[0]);

    yield put(updateOriginCoordinates.success(coordinates));
  } catch (error) {
    yield put(updateOriginCoordinates.failure(error));
  }
}

function* watchUpdateOriginCoordinatesSaga() {
  yield takeEvery(
    actions.UPDATE_ORIGIN_COORDINATES.REQUEST,
    updateOriginCoordinatesSaga
  );
}

export default function* rootSaga() {
  yield all([watchGetRetailersSaga(), watchUpdateOriginCoordinatesSaga()]);
}
