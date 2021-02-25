import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  contentOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_HEADER_OPEN:
      return {
        ...state,
        contentOpen: action.payload,
      };
    default:
      return state;
  }
};
