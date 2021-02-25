const axios = require('axios');
const CONFIG = require('./config');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

/**
 * Получает данные о всех роутах из API
 * @param {Function} callback - Обратный вызов, в качестве аргумента принимает список роутов
 */
const getRoutes = (callback) => {
  const apiPath = `${CONFIG.API_DOMAIN}/${CONFIG.API_ROUTES}`;

  try {
    axios.get(apiPath)
      .then((res) => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch((err) => {
        console.log(`${CONFIG.LOG_PREFIX}[${CONFIG.API_ROUTES}] can't fetch with code - ${err.code}`);
      })
      .finally(() => {
        console.log(`${CONFIG.LOG_PREFIX}[${CONFIG.API_ROUTES}] done`);
      });
  } catch (err) {
    console.log(`${CONFIG.LOG_PREFIX}[${CONFIG.API_ROUTES}] error`);
  }
};
/**
 * Получает данные об одном роуте из API
 * @param {String} path - Путь к роуту
 * @param {Function} callback - Обратный вызов, в качестве аргумента принимает роут
 */
const getRoute = (path, callback) => {
  const apiPath = `${CONFIG.API_DOMAIN}${path}`;

  try {
    axios.get(apiPath)
      .then((res) => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch((err) => {
        console.log(`${CONFIG.LOG_PREFIX}[${path}] can't fetch with code - ${err.code}`);
      })
      .finally(() => {
        console.log(`${CONFIG.LOG_PREFIX}[${path}] done`);
      });
  } catch (err) {
    console.log(`${CONFIG.LOG_PREFIX}[${path}] error`);
  }
};

module.exports = {
  getRoutes,
  getRoute,
};