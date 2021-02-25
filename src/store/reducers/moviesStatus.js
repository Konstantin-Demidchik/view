import * as actionsTypes from '../actions/actionsTypes';

export default (state = 'pending', action) => {
  switch (action.type) {
    case actionsTypes.LOAD_MOVIES_STATUS:
      return action.moviesStatus;
    default:
      return state;
  }
};
