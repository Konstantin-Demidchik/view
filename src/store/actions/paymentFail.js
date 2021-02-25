import * as actionsTypes from './actionsTypes';

// eslint-disable-next-line import/prefer-default-export
export function setPaymentFail(robot) {
  return {
    type: actionsTypes.PAYMENT_FAIL,
    payload: robot,
  };
}
