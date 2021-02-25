import jwtDecode from 'jwt-decode';
import * as actionsTypes from './actionsTypes';
import { getBelarusDate } from '../../core/functions/datetime';

import {
  profileUpdateLoading,
  profileUpdateEmailLoading,
  profileUpdateSubscriptionLoading,
  profileUpdatePasswordLoading,
} from './loading';

import {
  get,
  put,
  del,
} from '../../core/rest';

import {
  TOKEN,
  TOKEN_STATE,
  authTokenObject,
} from '../../core/configs/tokens';

import { getWindow } from '../../core/functions/browser';

import {
  API_USER,
  API_UPDATE_USER_DATA,
  API_SUBSCRIBE_TO_NEWS,
  API_USER_CHANGE_PASSWORD,
  API_DELETE_CREDIT_CARD,
  API_DELETE_SUBSCRIBE,
  API_CHANGED_EMAIL,
} from '../../core/rest/paths';

import {
  MSG_WELCOME,
  MSG_WELCOME_CLEAN,
} from '../../core/configs/messages';


/**
 * ACTIONS
 */
const loadUserSuccess = user => ({
  type: actionsTypes.LOAD_USER_SUCCESS,
  user,
});

const userExit = () => ({
  type: actionsTypes.USER_EXIT,
});

const updateProfileSuccess = updatedData => ({
  type: actionsTypes.UPDATE_PROFILE_SUCCESS,
  user: updatedData,
});

/*
const updateEmail = user => ({
  type: actionsTypes.CHANGE_EMAIL,
  user,
});
*/

const deleteCreditCard = user => ({
  type: actionsTypes.DELETE_CREDIT_CARD,
  user,
});

/**
 * Загрузка данных о пользователе по токену (BASIC)
 */
const loadUser = token => (
  (dispatch) => {
    get(
      API_USER,
      { headers: { auth: token } },
      (res) => {
        if (res.data.profile.firstName) {
          getWindow().pushNotification({
            timeout: 6000,
            body: MSG_WELCOME + res.data.profile.firstName,
          });
        } else {
          getWindow().pushNotification({
            timeout: 6000,
            body: MSG_WELCOME_CLEAN,
          });
        }

        if (res.data.profile.loyaltyProgram && res.data.profile.loyaltyProgram.length) {
          const accountType = res.data.profile.loyaltyProgram.find(program => program.loyaltyProgramName === 'Red Carpet Club');
          const isSuccessAuth = getWindow().dataLayer.find(action => action.event === 'onSuccessAuth')
          if (!isSuccessAuth) {
            getWindow().dataLayer.push({
              event: 'onSuccessAuth',
              userAccount: {
                id: res.data.profile.id, // Уникальный идентификатор пользователя на сайте
                accountType: accountType ? accountType.categoryName : null, // Тип аккаунта пользователя
              }
            });
          }
        }

        dispatch(loadUserSuccess(res.data));
      },
      (err) => {
        console.log('USER ERROR', err.response);
      },
    );
  }
);

/**
 * Загрузка данных о пользователе по токену (VK)
 */

/**
  * Выдача пользователю публичный/приватный токен
  */

const loadUserVK = token => (
  (dispatch) => {
    get(
      API_USER,
      { headers: { authVK: token } },
      (res) => {
        if (res.data.profile.firstName) {
          getWindow().pushNotification({
            timeout: 6000,
            body: MSG_WELCOME + res.data.profile.firstName,
          });
        } else {
          getWindow().pushNotification({
            timeout: 6000,
            body: MSG_WELCOME_CLEAN,
          });
        }

        if (res.data.profile.loyaltyProgram && res.data.profile.loyaltyProgram.length) {
          const accountType = res.data.profile.loyaltyProgram.find(program => program.loyaltyProgramName === 'Red Carpet Club');
          const isSuccessAuth = getWindow().dataLayer.find(action => action.event === 'onSuccessAuth') // Организовать один раз записи входа в аналитику
          if (!isSuccessAuth) {
            getWindow().dataLayer.push({
              event: 'onSuccessAuth',
              userAccount: {
                id: res.data.profile.id, // Уникальный идентификатор пользователя на сайте
                accountType: accountType ? accountType.categoryName : null, // Тип аккаунта пользователя
              }
            });
          }
        }

        dispatch(loadUserSuccess(res.data));
      },
      (err) => {
        console.log('USER ERROR', err.response);
      },
    );
  }
);

/**
 * Загрузка данных о пользователе по токену (FB)
 */
const loadUserFB = token => (
  (dispatch) => {
    get(
      API_USER,
      { headers: { authFB: token } },
      (res) => {
        if (res.data.profile.firstName) {
          getWindow().pushNotification({
            timeout: 6000,
            body: MSG_WELCOME + res.data.profile.firstName,
          });
        } else {
          getWindow().pushNotification({
            timeout: 6000,
            body: MSG_WELCOME_CLEAN,
          });
        }

        if (res.data.profile.loyaltyProgram && res.data.profile.loyaltyProgram.length) {
          const accountType = res.data.profile.loyaltyProgram.find(program => program.loyaltyProgramName === 'Red Carpet Club');
          const isSuccessAuth = getWindow().dataLayer.find(action => action.event === 'onSuccessAuth') // Организовать один раз записи входа в аналитику
          if (!isSuccessAuth) {
            getWindow().dataLayer.push({
              event: 'onSuccessAuth',
              userAccount: {
                id: res.data.profile.id, // Уникальный идентификатор пользователя на сайте
                accountType: accountType ? accountType.categoryName : null, // Тип аккаунта пользователя
              }
            });
          }
        }

        dispatch(loadUserSuccess(res.data));
      },
      (err) => {
        console.log('USER ERROR', err.response);
      },
    );
  }
);

/**
 * Обновление данных пользователя по токену
 */
const updateProfileInfo = data => (
  (dispatch) => {
    dispatch(profileUpdateLoading(true));

    const token = authTokenObject();

    put(
      API_UPDATE_USER_DATA,
      { ...data.profile },
      { headers: { [token.type]: token.token } },
      (res) => {
        dispatch(profileUpdateLoading(false));

        if (res.status === 202) {
          dispatch(updateProfileSuccess(data));

          getWindow().pushNotification({
            timeout: 6000,
            body: 'Изменения сохранены',
          });
        } else {
          getWindow().pushNotification({
            timeout: 6000,
            body: 'Не удалось сохранить изменения',
          });
        }
      },
      () => {
        dispatch(profileUpdateLoading(false));

        getWindow().pushNotification({
          timeout: 6000,
          body: 'Не удалось сохранить изменения',
        });
      },
    );
  }
);

/**
 * Изменение адреса почты
 */
const changeEmail = newEmail => (
  (dispatch) => {
    dispatch(profileUpdateEmailLoading(true));
    const token = authTokenObject();

    put(
      API_CHANGED_EMAIL,
      { email: newEmail },
      { headers: { [token.type]: token.token } },
      (res) => {
        dispatch(profileUpdateEmailLoading(false));
        if (res.status === 202) {
          getWindow().pushNotification({
            timeout: 6000,
            body: res.data.message,
          });
        } else {
          getWindow().pushNotification({
            timeout: 6000,
            body: res.data.message,
          });
        }
      },
      (err) => {
        dispatch(profileUpdateEmailLoading(false));
        getWindow().pushNotification({
          timeout: 6000,
          body: err.response.data.error,
        });
      },
    );
  }
);

/**
 * Установка подписки для пользователя
 */
const subscribe = userData => (
  (dispatch) => {
    dispatch(profileUpdateSubscriptionLoading(true));

    const token = authTokenObject();
    const address = token ? API_SUBSCRIBE_TO_NEWS : `${API_SUBSCRIBE_TO_NEWS}${userData.profile.email}`;

    get(
      address,
      { headers: { [token.type]: token.token } },
      (res) => {
        dispatch(profileUpdateSubscriptionLoading(false));
        dispatch(updateProfileSuccess({
          ...userData,
          profile: {
            ...userData.profile,
            isSubscribe: 'true',
          },
        }));

        getWindow().pushNotification({
          timeout: 6000,
          body: res.data.message,
        });
      },
      () => {
        dispatch(profileUpdateSubscriptionLoading(false));
        getWindow().pushNotification({
          timeout: 6000,
          body: 'Не удалось подписаться на рассылку',
        });
      },
    );
  }
);

/**
 * Удаление подписки пользователя
 */
const deleteSubscriptionInfo = userData => (
  (dispatch) => {
    const token = authTokenObject();

    del(
      `${API_SUBSCRIBE_TO_NEWS}${userData.profile.email}`,
      { headers: { [token.type]: token.token } },
      (res) => {
        if (res.status === 200) {
          dispatch(updateProfileSuccess({
            ...userData,
            profile: {
              ...userData.profile,
              isSubscribe: 'false',
            },
          }));

          getWindow().pushNotification({
            timeout: 6000,
            body: 'Вы отписались от рассылки',
          });
        } else {
          getWindow().pushNotification({
            timeout: 6000,
            body: res.data.message,
          });
        }
      },
      () => {
        getWindow().pushNotification({
          timeout: 6000,
          body: 'Не удалось отписаться от рассылки',
        });
      },
    );
  }
);

/**
 * Удаление кредитной карты пользователя
 */
const deleteCard = (userData, cardId) => (
  (dispatch) => {
    const token = authTokenObject();
    del(
      API_DELETE_CREDIT_CARD,
      {
        headers: {
          [token.type]: token.token,
        },
        data: { id: cardId },
      },
      (res) => {
        if (res.status === 202) {
          const newUserRecurentData = userData.recurrent.filter(item => item.id !== cardId);
          dispatch(deleteCreditCard({
            ...userData,
            recurrent: newUserRecurentData,
          }));

          getWindow().pushNotification({
            timeout: 6000,
            body: 'Карта для быстрой оплаты успешно удалена',
          });
        } else {
          getWindow().pushNotification({
            timeout: 6000,
            body: res.data.message,
          });
        }
      },
      () => {
        getWindow().pushNotification({
          timeout: 6000,
          body: 'Что-то пошло не так',
        });
      },
    );
  }
);

/**
 * Проверка авторизации
 */
const checkUser = token => (
  (dispatch) => {
    if (token.type === 'auth') {
      if (getWindow().localStorage && getWindow().localStorage && getWindow().localStorage.getItem(TOKEN.PUBLIC)) {
        try {
          const deadTokenDate = new Date(jwtDecode(token.token).exp * 1000);
          if (getBelarusDate(deadTokenDate) > getBelarusDate(new Date())) {
            getWindow().localStorage.setItem(TOKEN.PUBLIC, token.token);
          } else {
            getWindow().localStorage.removeItem(TOKEN.PUBLIC);
            getWindow().localStorage.removeItem(TOKEN_STATE.EMAIL_WITH_PUBLIC_TOKEN);
          }
        } catch (err) {
          if (getWindow().localStorage) {
            getWindow().localStorage.removeItem(TOKEN.PUBLIC);
            getWindow().localStorage.removeItem(TOKEN_STATE.EMAIL_WITH_PUBLIC_TOKEN);
          }
        }
      }


      get(
        API_USER,
        { headers: { auth: token.token } },
        (res) => {
          if (getWindow().localStorage) {
            getWindow().localStorage.removeItem(TOKEN.PUBLIC);
            getWindow().localStorage.removeItem(TOKEN_STATE.EMAIL_WITH_PUBLIC_TOKEN);
            dispatch(loadUserSuccess(res.data));
            if (res.data.profile.loyaltyProgram && res.data.profile.loyaltyProgram.length) {
              const accountType = res.data.profile.loyaltyProgram.find(program => program.loyaltyProgramName === 'Red Carpet Club');
              const isSuccessAuth = getWindow().dataLayer.find(action => action.event === 'onSuccessAuth') // Организовать один раз записи входа в аналитику
              if (!isSuccessAuth) {
                getWindow().dataLayer.push({
                  event: 'onSuccessAuth',
                  userAccount: {
                    id: res.data.profile.id, // Уникальный идентификатор пользователя на сайте
                    accountType: accountType ? accountType.categoryName : null, // Тип аккаунта пользователя
                  }
                });
              }
            }
          }
        },
        () => {
          if (getWindow().localStorage) {
            getWindow().localStorage.removeItem(TOKEN.BASIC);
            checkUser({ type: 'authVK', token: getWindow().localStorage.getItem(TOKEN.VK) });
          }
        },
      );
    }

    if (token.type === 'authVK') {
      if (getWindow().localStorage && token.token === null) {
        checkUser({ type: 'authFB', token: getWindow().localStorage.getItem(TOKEN.FB) });
      }
      get(
        API_USER,
        { headers: { authVK: token.token } },
        (res) => {
          if (getWindow().localStorage) {
            getWindow().localStorage.removeItem(TOKEN.PUBLIC);
            getWindow().localStorage.removeItem(TOKEN_STATE.EMAIL_WITH_PUBLIC_TOKEN);
            dispatch(loadUserSuccess(res.data));
            if (res.data.profile.loyaltyProgram && res.data.profile.loyaltyProgram.length) {
              const accountType = res.data.profile.loyaltyProgram.find(program => program.loyaltyProgramName === 'Red Carpet Club');
              const isSuccessAuth = getWindow().dataLayer.find(action => action.event === 'onSuccessAuth') // Организовать один раз записи входа в аналитику
              if (!isSuccessAuth) {
                getWindow().dataLayer.push({
                  event: 'onSuccessAuth',
                  userAccount: {
                    id: res.data.profile.id, // Уникальный идентификатор пользователя на сайте
                    accountType: accountType ? accountType.categoryName : null, // Тип аккаунта пользователя
                  }
                });
              }
            }
          }
        },
        () => {
          if (getWindow().localStorage) {
            getWindow().localStorage.removeItem(TOKEN.PUBLIC);
            getWindow().localStorage.removeItem(TOKEN_STATE.EMAIL_WITH_PUBLIC_TOKEN);
            getWindow().localStorage.removeItem(TOKEN.VK);
            checkUser({ type: 'authFB', token: getWindow().localStorage.getItem(TOKEN.FB) });
          }
        },
      );
    }

    if (token.type === 'authFB') {
      if (token.token === null) {
        dispatch.userExit();
      }
      get(
        API_USER,
        { headers: { authFB: token.token } },
        (res) => {
          if (getWindow().localStorage) {
            getWindow().localStorage.removeItem(TOKEN.PUBLIC);
            getWindow().localStorage.removeItem(TOKEN_STATE.EMAIL_WITH_PUBLIC_TOKEN);
            dispatch(loadUserSuccess(res.data));
            if (res.data.profile.loyaltyProgram && res.data.profile.loyaltyProgram.length) {
              const accountType = res.data.profile.loyaltyProgram.find(program => program.loyaltyProgramName === 'Red Carpet Club');
              const isSuccessAuth = getWindow().dataLayer.find(action => action.event === 'onSuccessAuth') // Организовать один раз записи входа в аналитику
              if (!isSuccessAuth) {
                getWindow().dataLayer.push({
                  event: 'onSuccessAuth',
                  userAccount: {
                    id: res.data.profile.id, // Уникальный идентификатор пользователя на сайте
                    accountType: accountType ? accountType.categoryName : null, // Тип аккаунта пользователя
                  }
                });
              }
            }
          }
        },
        () => {
          if (getWindow().localStorage) {
            getWindow().localStorage.removeItem(TOKEN.PUBLIC);
            getWindow().localStorage.removeItem(TOKEN_STATE.EMAIL_WITH_PUBLIC_TOKEN);
            getWindow().localStorage.removeItem(TOKEN.FB);
            dispatch.userExit();
          }
        },
      );
    }
  }
);

/**
 * Обновление пароля
 */
const updatePassword = newPassword => (
  (dispatch) => {
    dispatch(profileUpdatePasswordLoading(true));
    const token = authTokenObject();

    put(
      API_USER_CHANGE_PASSWORD,
      { password: newPassword },
      { headers: { [token.type]: token.token } },
      (res) => {
        dispatch(profileUpdatePasswordLoading(false));
        if (res.status === 202) {
          getWindow().pushNotification({
            timeout: 6000,
            body: 'Пароль изменен',
          });
        }
      },
      () => {
        dispatch(profileUpdatePasswordLoading(false));
        getWindow().pushNotification({
          timeout: 6000,
          body: 'Не удалось изменить пароль',
        });
      },
    );
  }
);

export {
  loadUserSuccess,
  loadUser,
  loadUserVK,
  loadUserFB,
  checkUser,
  updateProfileInfo,
  subscribe,
  deleteSubscriptionInfo,
  userExit,
  deleteCard,
  updatePassword,
  changeEmail,
};
