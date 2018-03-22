/* eslint function-paren-newline: 0 */

import { takeEvery, put, call, all } from 'redux-saga/effects';
import axios from 'axios';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import * as actions from '../actions';

const {
  getRetailers,
  updateOriginAddress,
  updateOriginPlaceId,
  updateOriginCoordinates,
  updateCenterAndZoom,
} = actions;

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
      yield put(getRetailers.success(response.data));
    } else {
      // TODO: need to display in UI
      console.log('no retailers found');

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
