import * as actionsTypes from './actionsTypes';

// eslint-disable-next-line import/prefer-default-export
export function setActiveTab(landing) {
  return { type: actionsTypes.SET_ACTIVE_TAB, landing };
}
