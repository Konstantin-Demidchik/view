import { combineReducers } from 'redux';

import movies from './movies';
import slider from './slider';
import news from './news';
import filters from './filters';
import user from './user';
import basket from './basket';
import loading from './loading';
import timer from './timer';
// import update from './update';
import payment from './payment';
import moviesStatus from './moviesStatus';
import paymentFail from './paymentFail';
import header from './header';
import apiState from './apiState';
import landing from './landing';

export default combineReducers({
  movies,
  slider,
  news,
  landing,
  filters,
  user,
  basket,
  loading,
  timer,
  moviesStatus,
  // update,
  payment,
  paymentFail,
  header,
  apiState,
});
