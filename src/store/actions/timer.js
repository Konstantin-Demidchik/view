import * as actionsTypes from './actionsTypes';

// время в секундах (300 сек = 5 минут)

export function setTimerInfo(checkId, time) {
  return {
    type: actionsTypes.SET_TIMER,
    checkId,
    time,
  };
}

export function clearTimer(checkId) {
  return {
    type: actionsTypes.CLEAR_TIMER,
    checkId,
  }
}
