import * as ActionTypes from '../actions';

const initialState = [];

function getRetailersSuccess(state, action) {
  return action.retailers;
}

function getRetailersFailure(state) {
  return state;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_RETAILERS.SUCCESS:
      return getRetailersSuccess(state, action);

    case ActionTypes.GET_RETAILERS.FAILURE:
      return getRetailersFailure(state);

    default:
      return state;
  }
};

export default reducer;
