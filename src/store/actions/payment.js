import * as actionsTypes from './actionsTypes';

const setPaymentData = data => ({
  type: actionsTypes.PAYMENT_SET_DATA,
  data,
});

const setPaymentRedirect = redirect => ({
  type: actionsTypes.PAYMENT_SET_REDIRECT,
  redirect,
});

const setPaymentType = paymentType => ({
  type: actionsTypes.PAYMENT_SET_TYPE,
  paymentType,
});

const setPaymentSaveCard = saveCard => ({
  type: actionsTypes.PAYMENT_SET_SAVE_CARD,
  saveCard,
});

const paymentClear = () => ({
  type: actionsTypes.PAYMENT_CLEAR,
});

export {
  setPaymentData,
  setPaymentRedirect,
  setPaymentType,
  setPaymentSaveCard,
  paymentClear,
};
