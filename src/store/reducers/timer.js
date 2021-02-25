import * as actionsTypes from '../actions/actionsTypes';

const initialState = {};

export default (state = initialState, action) => {
  const timers = Object.assign({}, state);
  if (!timers[action.checkId]) timers[action.checkId] = { time: actionsTypes.DEFAULT_TIME };
  switch (action.type) {
    case actionsTypes.SET_TIMER:
      timers[action.checkId].time = action.time;
      return timers;
    case actionsTypes.CLEAR_TIMER:
      timers[action.checkId] = {};
      return timers;
    default:
      return state;
  }
};
