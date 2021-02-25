import axios from 'axios';
import https from 'https';

import API_URL from './paths';
import API_STATE from './paths';
import store from '../../store';
import { setApiState } from '../../store/actions/apiState';

const AXIOS = axios.create({
  baseURL: API_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const checkStateApi = (status) => {
  if (status >= 500) {
    AXIOS
      .get(API_STATE, {})
      .then((res) => {
        if (!res.data) {
          store.dispatch(setApiState(false));
        }
      })
      .catch((error) => {
        store.dispatch(setApiState(false));
      });
  }
}

const get = (address, headers, callback, fail) => {
  try {
    AXIOS
      .get(address, headers)
      .then(callback)
      .catch((error) => {
        if (error.response && error.response.status) {
          checkStateApi(error.response.status);
        }
        if (fail) {
          fail(error);
        } else {
          throw new Error(error);
        }
      });
  } catch (e) {
    fail(e);
  }
};

const put = (address, data, headers, callback, fail) => {
  try {
    AXIOS
      .put(address, data, headers)
      .then(callback)
      .catch((e) => {
        if (e.response && e.response.status) {
          checkStateApi(e.response.status);
        }
        if (fail) {
          fail(e);
        } else {
          throw new Error(e);
        }
      });
  } catch (e) {
    fail(e);
  }
};

const post = (address, data, headers, callback, fail) => {
  try {
    AXIOS
      .post(address, data, headers)
      .then(callback)
      .catch((e) => {
        if (e.response && e.response.status) {
          checkStateApi(e.response.status);
        }
        if (fail) {
          fail(e);
        } else {
          throw new Error(e);
        }
      });
  } catch (e) {
    fail(e);
  }
};

const del = (address, headers, callback, fail) => {
  try {
    AXIOS
      .delete(address, headers)
      .then(callback)
      .catch((e) => {
        if (e.response && e.response.status) {
          checkStateApi(e.response.status);
        }
        if (fail) {
          fail(e);
        } else {
          throw new Error(e);
        }
      });
  } catch (e) {
    fail(e);
  }
};

export {
  get,
  post,
  put,
  del,
};
