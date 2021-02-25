import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  landing: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_ACTIVE_TAB:
      return action.landing;
    default:
      return state;
  }
};
