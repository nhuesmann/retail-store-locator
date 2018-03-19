import { takeEvery, put, call, all } from 'redux-saga/effects';
import axios from 'axios';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import * as actions from '../actions';

const {
  getRetailers,
  updateOriginAddress,
  updateOriginPlaceId,
  updateOriginCoordinates,
} = actions;

const fetchEntityById = (resource, id) => axios.get(`${resource}/${id}.json`);
// const fetchEntityCollection = resource => axios.get(`${resource}.json`);

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

function* getRetailersSaga({ id }) {
  try {
    const response = yield call(fetchEntityById, 'products', id);

    yield put(getRetailers.success(response.data));
  } catch (error) {
    yield put(getRetailers.failure(error));
  }
}

function* watchGetRetailersSaga() {
  yield takeEvery(actions.GET_RETAILERS.REQUEST, getRetailersSaga);
}

export default function* rootSaga() {
  yield all([watchGetRetailersSaga(), watchUpdateOriginCoordinatesSaga()]);
}
