import fs from 'fs';
import axios from 'axios';

import * as PAGES from '../pages';

import { SITE_ADDRESS } from '../core/configs/site';

import CMS from '../components/cms';

const getFileName = (path) => {
  return `${path.split('/').join('__')}.json`;
};

/**
 * Читает файл по абсолютному пути
 * @param {String} path - абсолютный путь до файла
 * @returns Promise с информацией о файле
 */
const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }

      try {
        resolve(JSON.parse(data));
      } catch (err) {
        console.log('readFile parsing failed');
      }
    });
  });
};

/**
 * Получает кэш страницы по ее пути
 * @param {String} path - путь роутинга для поиска кэша
 * @returns Promise с инфорацией о файле
 */
const getDataFromCache = (path) => {
  const fileName = getFileName(path);
  return readFile(`${process.cwd()}/public/cache/pages/${fileName}`);
};

const getRoutesObject = (routes) => {
  const r = routes ? routes : [];

  return r.map(item => {
    return {
      // Путь страницы
      path: item.path,
      // exact для роутинга реакта
      exact: true,
      // Адрес для получения данных страницы
      dataURL: item.dataURL,
      // Существует ли компонент для этой страницы
      isComponent: item.component ? PAGES[item.component] : null,
      // Компонент страницы
      component: item.component ? PAGES[item.component] : CMS,
      // Функция получения данных из кэша
      loadData: () => getDataFromCache(item.path),
    };
  });
};

const getRoutes = (callback, fail) => {
  axios
    .get(`${SITE_ADDRESS}/public/cache/routes.json`)
    .then((res) => {
      const routes = getRoutesObject(res.data);
      callback(routes);
    })
    .catch((err) => {
      fail(err);
    });
};

const getRoutesLocally = (callback, fail) => {
  readFile(`${process.cwd()}/public/cache/routes.json`)
    .then((res) => {
      const routes = getRoutesObject(res);
      callback(routes);
    })
    .catch((err) => {
      fail(err);
    });
};

export default getRoutesObject;

export {
  getFileName,
  getRoutes,
  getRoutesLocally,
};
