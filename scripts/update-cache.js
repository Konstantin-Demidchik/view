const fs = require('fs');
const CONFIG = require('./config');
const getRoute = require('./api').getRoute;
const ROUTES = require('../public/cache/routes.json');

/**
 * routes.js
 * Нужно взять все роуты и записать результат каждого в отдельный файл
 * dataURL - ссылка на страницу
 * название файла - `${path.split('/').join('-')}.json`
 */

const updateCache = () => {
  ROUTES.forEach(item => {
    console.log('PATH', item.path);
    let fileName = item.path.split('/').join('__');

    getRoute(item.dataURL, (data) => {
      fs.writeFile(`${__dirname}/../public/cache/pages/${fileName}.json`, JSON.stringify(data), (err) => {
        if (err) {
          console.log(`Write failed ${fileName}.json`);
        } else {
          console.log(`${CONFIG.LOG_PREFIX} PATH ${item.path} UPDATED TO ${fileName}.json!`);
        }
      });
    });
  });
};

updateCache();