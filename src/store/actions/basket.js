import * as actionsTypes from './actionsTypes';
import { get, post, del } from '../../core/rest';
import {
  API_SEND_CARD,
  API_SEND_CERTIFICATE,
  API_ADD_ITEM_CHECK,
  API_PAYMENT_NEW_CHECK_ID,
} from '../../core/rest/paths';
import { authTokenObject } from '../../core/configs/tokens';
import { NOTIFICATION_TIMEOUT } from '../../core/configs/site';
import { MSG_SERTIFICATE_OK } from '../../core/configs/messages';
import { setTimerInfo } from './timer';
import { getWindow } from '../../core/functions/browser';

// eslint-disable-next-line import/prefer-default-export
export function addNewCheck(checkId, showId) {
  return {
    type: actionsTypes.ADD_NEW_CHECK,
    checkId,
    showId,
  };
}

export function setCheckInfo(checkId, info) {
  return {
    type: actionsTypes.SET_CHECK_INFO,
    checkId,
    info,
  };
}

export const setBasketById = (checkId, showId, repayment) => (
  (dispatch) => {
    let repaymentInStorage = getWindow().localStorage ? getWindow().localStorage.getItem('repaymentCheck') : '';

    if (repaymentInStorage) {
      repaymentInStorage = JSON.parse(repaymentInStorage);

      if (repaymentInStorage.currentCheckId === checkId) {
        checkId = repaymentInStorage.newCheckId;
      }
    }

    get(
      `${API_ADD_ITEM_CHECK}/${checkId}`,
      {},
      (res) => {
        const data = JSON.parse(res.data.answer);

        if (repayment) {
          const token = authTokenObject();
          post(
            API_PAYMENT_NEW_CHECK_ID,
            {
              id: checkId,
            },
            {
              headers: { [token.type]: token.token },
            },
            (res) => {
              try {
                const newCheckData = JSON.parse(res.data.answer);

                if (res.data.message === 'YES') {
                  const newCheckId = newCheckData.checkId;

                  if (newCheckId) {
                    dispatch(addNewCheck(newCheckId, showId));
                    dispatch(setCheckInfo(newCheckId, newCheckData));

                    const nowDateInSecondsFormat = new Date().getTime() / 1000;
                    dispatch(setTimerInfo(newCheckId, nowDateInSecondsFormat));

                    const repaymentCheckInStorage = {
                      currentCheckId: checkId,
                      newCheckId,
                    };
                    if (getWindow().localStorage) {
                      getWindow().localStorage.setItem('repaymentCheck', JSON.stringify(repaymentCheckInStorage));
                    }
                  }
                }
              } catch (err) {
                console.log('[FAIL][setBasketById][store.actions.basket] failed in parse json');
              }
            },
            (err) => {
              console.log('ERROR!!!', err);

              getWindow().pushNotification({
                timeout: NOTIFICATION_TIMEOUT,
                body: 'Системная ошибка',
              });
            },
          );
        } else {
          dispatch(addNewCheck(checkId, showId));
          dispatch(setCheckInfo(checkId, data));
        }
      },
      (err) => {
        console.log(`[TD] Can not make the new check ${API_ADD_ITEM_CHECK}/${checkId}`);
      },
    );
  }
);

export function clearBasket() {
  return {
    type: actionsTypes.CLEAR_BASKET,
  };
}

export const setBasketCard = (name, checkId) => (
  (dispatch) => {
    const token = authTokenObject();
    post(
      API_SEND_CARD,
      {
        checkId,
        name,
      },
      { headers: { [token.type]: token.token } },
      (res) => {
        const data = JSON.parse(res.data.answer);
        dispatch(setCheckInfo(data.checkId, data));
      },
      (err) => {
        console.log(' ERROR', err.response);
      },
    );
  }
);

export const setBasketCardCertificate = (checkId, un, payment) => (
  (dispatch) => {
    const token = authTokenObject();
    post(
      API_SEND_CERTIFICATE,
      {
        checkId,
        un,
        payment,
      },
      { headers: { [token.type]: token.token } },
      (res) => {
        const data = JSON.parse(res.data.answer);
        dispatch(setCheckInfo(data.checkId, data));
        getWindow().pushNotification({
          timeout: NOTIFICATION_TIMEOUT,
          body: MSG_SERTIFICATE_OK,
        });
      },
      (err) => {
        getWindow().pushNotification({
          timeout: NOTIFICATION_TIMEOUT,
          body: err.response.data.answer,
        });
      },
    );
  }
);

export const resetBasketCardCertificate = (checkId, un, payment) => (
  (dispatch) => {
    const token = authTokenObject();
    del(
      API_SEND_CERTIFICATE,
      {
        headers: { [token.type]: token.token },
        data: {
          checkId,
          un,
          payment,
        },
      },
      (res) => {
        const data = JSON.parse(res.data.answer);
        dispatch(setCheckInfo(data.checkId, data));
      },
      (err) => {
        getWindow().pushNotification({
          timeout: NOTIFICATION_TIMEOUT,
          body: err.response.data.answer,
        });
      },
    );
  }
);
