import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  robot: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.PAYMENT_FAIL:
      return {
        ...state,
        robot: action.payload,
      };
    default:
      return state;
  }
};
