import {
  REQUEST,
  SUCCESS,
  FAILURE,
  createRequestTypes,
  action,
} from './utility';

export const GET_RETAILERS = createRequestTypes('GET_RETAILERS');

export const getRetailers = {
  request: (origin, maxDistance) =>
    action(GET_RETAILERS[REQUEST], { origin, maxDistance }),
  success: retailers => action(GET_RETAILERS[SUCCESS], { retailers }),
  failure: error => action(GET_RETAILERS[FAILURE], { error }),
};
