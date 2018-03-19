import { combineReducers } from 'redux';

import form from './form';
import map from './map';
import retailers from './retailers';

const rootReducer = combineReducers({
  form,
  map,
  retailers,
});

export default rootReducer;
