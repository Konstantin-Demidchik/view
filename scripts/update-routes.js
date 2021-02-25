const fs = require('fs');
const getRoutes = require('./api').getRoutes;
const CONFIG = require('./config');
const CONST_ROUTES = require('../src/server/const-routes.json');

/**
 * Функция возвращает описание роута по пути
 * @param {String} path - путь, описание которого необходимо вернуть
 * @param {Array} routesList - список роутов
 */
const findRoute = (path, routesList) => {
  for (let i = 0; i < routesList.length; i++) {
    if (path === routesList[i].path) {
      return routesList[i];
    }
  }

  return null;
};

/**
 * Создает новый массив роутов из двух
 * @param {Array} routes - список роутов из api
 * @param {Array} constRoutes - список константных роутов
 */
const makeNewRoutesArray = (routes, constRoutes) => {
  let temp = null;

  const newArray = routes.map(route => {
    temp = findRoute(route.path, constRoutes);

    if (temp) {
      return { ...route, ...temp };
    }

    return route;
  });

  return newArray;
};

getRoutes((routes) => {
  const newRoutes = makeNewRoutesArray(routes, CONST_ROUTES);

  fs.writeFile(`${__dirname}/../public/cache/routes.json`, JSON.stringify(newRoutes), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${CONFIG.LOG_PREFIX} ROUTING UPDATED!`);
    }
  });
});