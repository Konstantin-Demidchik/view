import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  apiState: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.API_STATE:
    
      return {
        ...state,
        apiState: action.apiState,
      };
    default:
      return state;
  }
};
