import * as actionsTypes from './actionsTypes';

// eslint-disable-next-line import/prefer-default-export
function setApiState(state) {
  return {
    type: actionsTypes.API_STATE,
    apiState: state,
  };
}

export {
  setApiState,
}
