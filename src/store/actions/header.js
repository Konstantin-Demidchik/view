import * as actionsTypes from './actionsTypes';

// eslint-disable-next-line import/prefer-default-export
export function setHeaderOpen(contentOpen) {
  return {
    type: actionsTypes.SET_HEADER_OPEN,
    payload: contentOpen,
  };
}
