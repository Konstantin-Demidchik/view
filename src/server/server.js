/**
 * Server Side Rendering для SilverScreen React
 * P.S.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { matchPath } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import express from 'express';
import axios from 'axios';
import fs from 'fs';

import App from './app';
import Html from './html';
import { getRoutesLocally } from './routes';
import { providerByComponentTitle } from '../providers';
import API_URL from '../core/rest/paths';
/**
 * Redux
 */
import store from '../store';

const cookieParser = require('cookie-parser');
const CMD = require('./cmd/cmd.js');
/**
 * Сервер Express
 */
const port = 3000;
const server = express();

/**
 * Открываем каталоги и файлы для доступа к клиентским ресурсам
 */
server.use('/', express.static('dist'));
server.use('/build', express.static('build'));
server.use('/images', express.static('public/images'));
server.use('/static', express.static('build/static'));
server.use('/animations', express.static('public/animations'));
server.use('/public/cache', express.static('public/cache'));
server.use('/public', express.static('public'));
server.use('/robots.txt', express.static('robots.txt'));
server.use('/sitemap.xml', express.static('sitemap.xml'));
server.use('/sw.js', express.static('sw.js'));
/**
 * Cookie middleware
 */
server.use(cookieParser());
/**
 * Входит ли роут в статический
 */
const isRouteStatic = (routesList, url) => {
  return routesList.find(route => matchPath(url, route)) || false;
};

/**
 * Статический роутинг
 */
const STATIC_ROUTES = [
  {
    path: '/ticket',
    title: 'Билет',
  },
  {
    path: '/ticket/download',
    title: 'Билет',
  },
  {
    path: '/search',
    title: 'Поиск',
  },
  {
    path: '/giftcard',
    title: 'Подарочная карта',
  },
  {
    path: '/my',
    title: 'Мой профиль',
  },
  {
    path: '/payment/assist/ok',
    title: 'ASSIST',
  },
  {
    path: '/payment/assist/no',
    title: 'ASSIST',
  },
  {
    path: '/order/:checkId',
    title: 'Заказ',
  },
];

const updateSitemap = (req, res) => {
  const sitemapAddress = `${API_URL}/wssite/webapi/sitemap`;

  if (res && res) {
    axios.get(sitemapAddress)
      .then((sitemap) => {
        if (sitemap.data) {
          fs.writeFile(`${process.cwd()}/sitemap.xml`, sitemap.data, (err) => {
            if (err) {
              res.send('Не удалось сохранить файл карты сайта');
            } else {
              res.send('Карта сайта обновлена!');
            }
          });
        } else {
          res.send('Не удалось получить карту сайта');
        }
      })
      .catch(() => {
        res.send('Не удалось обновить карту сайта');
      });
  } else {
    axios.get(sitemapAddress)
      .then((sitemap) => {
        if (sitemap.data) {
          fs.writeFile(`${process.cwd()}/sitemap.xml`, sitemap.data, () => {});
        }
      })
      .catch(() => {});
  }
};

/**
 * Рекламный пиксель
 */
server.get('/pics/013.png', (req, res) => {
  const s = fs.createReadStream(`${process.cwd()}/src/assets/images/pixel.png`);

  const formattedDate = () => {
    const d = new Date();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getHours();
    const seconds = d.getSeconds();

    return `${d.getFullYear()}-${month > 9 ? month : `0${month}`}-${day > 0 ? day : `0${day}`} ${hours > 0 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
  };

  s.on('open', () => {
    res.cookie('ss_impr', formattedDate(), {
      expires: new Date().getTime() + 86400 * 21,
      maxAge: 86400 * 21,
      path: '/',
      domain: 'silverscreen.by',
    });

    res.set('Content-Type', 'image/png');
    res.set('Content-Disposition', 'attachment; filename=pixel.png');
    s.pipe(res);
  });

  s.on('error', () => {
    res.set('Content-Type', 'text/plain');
    res.status(404).end('Pixel not found');
  });
});

/**
 * Обновление кэша роутинга и страниц
 */
server.get('/tech/update-cache', (req, res) => {
  CMD.get('sh /home/dev/ssr-dev/src/server/update-cache.sh', (err, data) => {
    if (err) {
      res.send(`Error: ${err}`)
    } else {
      res.send('Успешно!');
      updateSitemap();
    }
  });
});

/**
 * Обновление sitemap.xml
 */
server.get('/tech/update-sitemap', (req, res) => {
  updateSitemap(req, res);
});

/**
 * Серверный роутинг приложения
 */
server.get('*', (req, res) => {
  /**
   * Ищем текущий роут по url
   */
  getRoutesLocally(
    (routes) => {
      const currentRoute = routes.find(route => matchPath(req.url, route)) || routes.find(route => matchPath(req.url.split('/?')[0], route)) || {};
      /**
       * Если роут не найден, то нужно показать 404
       */
      if (isRouteStatic(STATIC_ROUTES, req.url)) {
        /**
         * Роут статический
         */
        const staticRoute = isRouteStatic(STATIC_ROUTES, req.url);
        res
        .send(
          Html({
            body: '',
            styles: '',
            tags: {
              title: staticRoute.title,
              description: '',
              og: {
                description: "SilverScreen Cinemas",
                title: "SilverScreen Cinemas",
                image: "https://new.silverscreen.by/favicons/apple-icon-180x180.png",
              },
            },

            serializedState: {},
          }),
        );
      } else if (Object.keys(currentRoute).length === 0) {
        res
          .status(404)
          .send(
            Html({
              body: '',
              styles: '',
              tags: {
                title: 'Страница не найдена',
                description: '',
                og: {
                  description: "SilverScreen Cinemas",
                  title: "SilverScreen Cinemas",
                  image: "https://new.silverscreen.by/favicons/apple-icon-180x180.png",
                },
              },
              serializedState: {},
            }),
          );
      }

      /**
       * Если в роутинге необходимо подгружать данные, то подгружаем
       */
      let promise;
      if (currentRoute.loadData) {
        promise = currentRoute.loadData();
      } else {
        promise = Promise.resolve(null);
      }
      /**
       * Загружаем страницу
       */
      promise.then((data) => {
        const context = { data };
        /**
         * Для сбора стилей styled-components
         */
        const sheet = new ServerStyleSheet();
        /**
         * Если есть данные, то рендерим страницу
         */
        if (context && context.data) {
          /**
           * Собираем страницу по провайдерам
           */
          const pageData = context.data[0].childrenList.map((component) => {
            const { typeName } = component;
            return providerByComponentTitle(typeName)(component, context.movies, context.event);
          }).filter(item => !!item);
          /**
           * Тело страницы
           */
          const body = ReactDOMServer.renderToString(sheet.collectStyles(
            <Provider store={store}>
              <App
                location={req.path}
                pageData={pageData || []}
                routes={routes}
                movies={{}}
              />
            </Provider>,
          ));
          /**
           * Стили и теги страницы для рендера в HTML
           */
          const styles = sheet.getStyleTags();
          const tags = {
            title: context.data[0].componentsDescription ? context.data[0].componentsDescription.title : 'SilverScreen Cinemas',
            description: context.data[0].componentsDescription ? context.data[0].componentsDescription.description : 'SilverScreen Cinemas',
            og: {
              description: context.data[0].componentsDescription && context.data[0].componentsDescription['og:description'] ? context.data[0].componentsDescription['og:description'] : "SilverScreen Cinemas",
              title: context.data[0].componentsDescription && context.data[0].componentsDescription['og:title'] ? context.data[0].componentsDescription['og:title'] : "SilverScreen Cinemas",
              image: context.data[0].componentsDescription && context.data[0].componentsDescription['og:image'] ? context.data[0].componentsDescription['og:image'] : "https://new.silverscreen.by/favicons/apple-icon-180x180.png",
            },
          };
          /**
           * Данные из Redux в формат JSON для вывода в HTML
           */
          const serializedState = JSON.stringify(store.getState());
          /**
           * Отправляем клиенту HTML
           */
          const contextJSON = JSON.stringify(context);
          const serverDate = new Date();

          res.send(
            Html({
              body,
              styles,
              tags,
              serializedState,
              contextJSON,
              serverDate,
            }),
          );
        }
      });
    },
    (err) => {
      console.log('[TD][getRoutesLocally] Failed', err);
    },
  );
});
/**
 * Запускаем сервер
 */
server.listen(port);
console.log(`Serving at http://localhost:${port}`);
