import * as actionsTypes from './actionsTypes';

// eslint-disable-next-line import/prefer-default-export
export function setScroll(offset) {
  return {
    type: actionsTypes.SET_NEWS_SCROLL,
    payload: offset,
  };
}
