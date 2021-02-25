import * as actionsTypes from '../actions/actionsTypes';

const initialState = [{
  showIds: [],
  checkContent: {},
}];

export default (state = {}, action) => {
  let stateCheck = Object.assign({}, state);
  switch (action.type) {
    case actionsTypes.ADD_NEW_CHECK:
      if(!stateCheck[action.checkId]) {
        const currCheck = stateCheck[action.checkId] = {};
        currCheck.showId = action.showId;
      }
      return stateCheck;
    case actionsTypes.SET_CHECK_INFO:
      stateCheck[action.checkId] = {};
      stateCheck[action.checkId].showId = state[action.checkId].showId;
      stateCheck[action.checkId].checkId = state[action.checkId].checkId;
      Object.keys(action.info).forEach(item => stateCheck[action.checkId][item] = action.info[item])
      return stateCheck;
    case actionsTypes.CLEAR_BASKET:
      stateCheck = {};
      return stateCheck;
    default:
      return state;
  }
}
