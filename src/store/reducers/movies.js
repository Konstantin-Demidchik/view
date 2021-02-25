import * as actionsTypes from '../actions/actionsTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionsTypes.LOAD_MOVIES_SUCCESS:
      return action.movies;
    default:
      return state;
  }
};
