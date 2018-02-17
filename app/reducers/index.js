import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import cats from './cats';
import cat from './cat';

export default combineReducers({
  routing: routerReducer,
  cats,
  cat
});
