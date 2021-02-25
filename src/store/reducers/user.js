import * as actionsTypes from '../actions/actionsTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case actionsTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case actionsTypes.USER_EXIT:
      return {};
    case actionsTypes.DELETE_CREDIT_CARD:
      return {
        ...state,
        user: action.user,
      };
    /*
    case actionsTypes.CHANGE_EMAIL:
      return {
        ...state,
        user: action.user,
      };
    */
    default:
      return state;
  }
};
