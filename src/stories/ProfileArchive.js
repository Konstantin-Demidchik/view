import React from 'react';

import { ProfileArchive } from '../components';

const UPCOMING = [
  {
    cinema: {
      address: 'г. Минск, ул. Петра Мстиславца, 11',
      name: 'VOKA cinema by Silver Screen в ТРЦ "Dana Mall"',
    },
    movie: {
      poster: 'http://tsoft.silverscreen.by/upload/iblock/02a/02ae9e50ff97732d069f17c44293b193.jpg',
      url: '/afisha/klimt-i-shile-eros-i-psikh-360/',
    },
    products: [
      {
        quantity: 2,
        subtypeName: 'Стандартный',
      },
    ],
    count: 2,
    date: '2018-11-13',
    hallName: 'Зал 2',
    id: 421778,
    name: 'Климт и Шиле: Эрос и Психея',
    time: '19:30',
    timestamp: 1542126600,
    ticketUrl: '',
  },
];

const HISTORY = [
  {
    cinema: {
      address: 'г. Минск, ул.Бобруйская, 6',
      name: 'Silver Screen cinemas в ТРЦ "Galileo"',
    },
    movie: {
      poster: 'http://tsoft.silverscreen.by/cache/f6b/25f/9c4acef2d917260238d8eccf5d7238c7.jpg',
      url: '/afisha/fantasticheskie-tvari-pre-379/',
    },
    products: [
      {
        quantity: 1,
        subtypeName: 'Стандартный',
      },
      {
        quantity: 2,
        subtypeName: 'Love Seat стандарт',
      },
    ],
    count: 3,
    date: '2018-11-15',
    hallName: 'Зал 3',
    id: 421783,
    name: 'Фантастические Твари: Преступления Грин-де-Вальда',
    time: '16:00',
    timestamp: 1542286800,
    ticketUrl: '',
  },
];

const AFISHA_LINK = '/afisha';

const ProfileArchiveWithoutUpcoming = () => (
  <ProfileArchive
    upcoming={[]}
    history={HISTORY}
    afishaLink={AFISHA_LINK}
  />
);

const ProfileArchiveWithoutHistory = () => (
  <ProfileArchive
    upcoming={UPCOMING}
    history={[]}
    afishaLink={AFISHA_LINK}
  />
);

const ProfileArchiveFull = () => (
  <ProfileArchive
    upcoming={UPCOMING}
    history={HISTORY}
    afishaLink={AFISHA_LINK}
  />
);

export {
  ProfileArchiveWithoutUpcoming,
  ProfileArchiveWithoutHistory,
  ProfileArchiveFull,
};
