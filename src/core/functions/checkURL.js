// просмотр параметров URL для отслеживания какое модальное окно открывать/закрывать
import queryString from 'query-string';
import { getWindow } from './browser';

const checkURLParamsForModalWindows = (props) => {
  const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');

  if (params.showID) {
    props.setShowSeats(true);
  } else {
    props.setShowSeats(false);
  }

  if (params.times) {
    props.setOpenTimes(true);
  } else {
    props.setOpenTimes(false);
  }

  if (params.payment) {
    props.setOpenPayment(true);
  } else {
    props.setOpenPayment(false);
  }
};

const removeParam = (key) => {
  const splitUrl = getWindow().location.href.split('#');
  let rtn = splitUrl[0];
  let param;
  let params_arr = [];
  const queryString = (getWindow().location.href.indexOf('#') !== -1) ? splitUrl[1] : '';
  if (queryString !== '') {
    params_arr = queryString.split('&');
    for (let i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split('=')[0];
      if (param === key) {
        params_arr.splice(i, 1);
      }
    }
    rtn = `${rtn}#${params_arr.join('&')}`;
  }
  getWindow().location.href = rtn;
};

export {
  checkURLParamsForModalWindows,
  removeParam,
};
