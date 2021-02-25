import * as actionsTypes from './actionsTypes';

// eslint-disable-next-line import/prefer-default-export
export function setSliderTheme(theme) {
  return {
    type: actionsTypes.SET_SLIDER_THEME,
    payload: theme,
  };
}

export function setReturnPathFromAfisha(path) {    // for bannerItem and MovieRoller
  return {
    type: actionsTypes.SET_RETURN_PATH,
    path
  }
}
