/* eslint function-paren-newline: 0 */

import { takeEvery, put, call, all } from 'redux-saga/effects';
import axios from 'axios';
import bbox from '@turf/bbox';
import { lineString } from '@turf/helpers';
import { fitBounds } from 'google-map-react/utils';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import * as actions from '../actions';

const {
  getRetailers,
  updateOriginAddress,
  updateOriginPlaceId,
  updateOriginCoordinates,
  // updateMapCenter,
  // updateZoom,
  updateCenterAndZoom,
} = actions;

const calcCenterAndZoom = coordinates => {
  // If only one coordinate, return it as the center
  if (coordinates.length === 1) {
    return {
      center: { lat: coordinates[0][0], lng: coordinates[0][1] },
      zoom: 14,
    };
  }

  // Here is how this part is done: http://turfjs.org/docs/#bbox
  const line = lineString(coordinates);
  const boundingBox = bbox(line);

  const bounds = {
    sw: { lat: boundingBox[0], lng: boundingBox[1] },
    nw: { lat: boundingBox[2], lng: boundingBox[1] },
    se: { lat: boundingBox[0], lng: boundingBox[3] },
    ne: { lat: boundingBox[2], lng: boundingBox[3] },
  };

  const mapSize = {
    width: 704,
    height: 800,
  };

  const { center, zoom } = fitBounds({ nw: bounds.nw, se: bounds.se }, mapSize);

  return { center, zoom };
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
      const locations = response.data.map(retailer =>
        retailer.location.coordinates.slice().reverse()
      );

      const { center, zoom } = calcCenterAndZoom(locations);

      // yield put(updateZoom(zoom));
      // yield put(updateMapCenter(calculatedCenter));
      yield put(updateCenterAndZoom(center, zoom));
      yield put(getRetailers.success(response.data));
    } else {
      console.log('no retailers found');
      // TODO: need to display in UI
      // yield put(updateMapCenter(origin));
      yield put(updateCenterAndZoom(origin, 11));
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
