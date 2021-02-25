import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  data: null,
  paymentType: 'any',
  redirect: false,
  saveCard: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.PAYMENT_SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    case actionsTypes.PAYMENT_SET_REDIRECT:
      return {
        ...state,
        redirect: action.redirect,
      };
    case actionsTypes.PAYMENT_SET_TYPE:
      return {
        ...state,
        paymentType: action.paymentType,
      };
    case actionsTypes.PAYMENT_SET_SAVE_CARD:
      return {
        ...state,
        saveCard: action.saveCard,
      };
    case actionsTypes.PAYMENT_CLEAR:
      return initialState;
    default:
      return state;
  }
};
