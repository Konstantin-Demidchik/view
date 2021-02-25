import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  theme: 'dark',
  path: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_SLIDER_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case actionsTypes.SET_RETURN_PATH:
      return {
        ...state,
        path: action.path,
      };
    default:
      return state;
  }
};
