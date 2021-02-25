import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  update: false,
  updateEmail: false,
  updateSubscription: false,
  updatePassword: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.PROFILE_UPDATE_LOADING:
      return {
        ...state,
        update: action.status,
      };
    case actionsTypes.PROFILE_UPDATE_EMAIL_LOADING:
      return {
        ...state,
        updateEmail: action.status,
      };
    case actionsTypes.PROFILE_UPDATE_SUBSCRIPTION_LOADING:
      return {
        ...state,
        updateSubscription: action.status,
      };
    case actionsTypes.PROFILE_UPDATE_PASSWORD_LOADING:
      return {
        ...state,
        updatePassword: action.status,
      };
    default:
      return state;
  }
};
