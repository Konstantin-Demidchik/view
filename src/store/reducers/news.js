import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  offset: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_NEWS_SCROLL:
      return {
        ...state,
        offset: action.payload,
      };
    default:
      return state;
  }
};
