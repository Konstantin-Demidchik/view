import React from 'react';
import MoviePreview from '../pages/MoviePreview/MoviePreviewContainer';

const FILTERS = [
  {
    icon: 'location',
    placeholder: 'Выберите кинотеатр',
    onChange: () => {},
    options: [
      { value: 1, label: 'Все кинотеатры, Минск' },
      { value: 2, label: 'Galileo' },
      { value: 3, label: 'Arena' },
      { value: 4, label: 'DanaMall' },
    ],
  },
  {
    icon: 'calendar',
    placeholder: 'Выберите день',
    onChange: () => {},
    options: [
      { value: 1, label: 'Сегодня, 13 декабря' },
      { value: 2, label: 'Завтра, 14 декабря' },
      { value: 3, label: 'Суббота, 15 декабря' },
      { value: 4, label: 'Воскресенье, 16 декабря' },
      { value: 5, label: 'Понедельник, 17 декабря' },
      { value: 6, label: 'Вторник 18 декабря' },
      { value: 7, label: 'Среда 19 декабря' },
    ],
  },
  {
    icon: 'location',
    placeholder: 'Выберите фильм',
    onChange: () => {},
    options: [
      { value: 1, label: 'Фантастические Твари: Преступления Грин-де-Вальда' },
      { value: 2, label: 'К теще не блины' },
      { value: 3, label: 'Доктор Тырса' },
      { value: 4, label: 'Ранетки' },
      { value: 5, label: 'Кармелита' },
    ],
  },
  {
    icon: 'glasses',
    placeholder: 'Формат показа',
    onChange: () => {},
    multiple: true,
    groupedOptions: [
      {
        groupTitle: 'Технологии',
        options: [
          { value: '2D', label: '2D' },
          { value: '3D', label: '3D' },
          { value: 'Dolby Atmos', label: 'Dolby Atmos' },
          { value: 'Dolby Digital', label: 'Dolby Digital' },
        ],
      },
      {
        groupTitle: 'Комфорт',
        options: [
          { value: 'Места LoveSeats', label: 'Места LoveSeats' },
          { value: 'Места Реклайнер', label: 'Места Реклайнер' },
          { value: 'Места PremierSofa', label: 'Места PremierSofa' },
          { value: 'VIP-Зал', label: 'VIP-Зал' },
          { value: 'Места Комфорт', label: 'Места Комфорт' },
        ],
      },
      {
        groupTitle: 'Язык',
        options: [
          { value: 'Русский', label: 'Русский' },
          { value: 'English', label: 'English' },
        ],
      },
    ],
  },
];
const SHOW_TIMES = [
  {
    cinemaName: 'Silver Screen cinemas в ТРЦ \'Galileo\'',
    cinemaAddress: 'г. Минск, ул.Бобруйская, 6',
    hallsList: [
      {
        time: '13:40',
        typeVideo: '2D',
        typeAudio: 'Dolby Digital',
        hallTitle: 'Зал 2',
        filled: 90,
      },
      {
        time: '14:00',
        typeVideo: '2D',
        typeAudio: 'Dolby Digital',
        hallTitle: 'Зал 3',
        filled: 100,
      },
    ],
  },
  {
    cinemaName: 'Silver Screen cinemas в ТРЦ \'Dana Mall\'',
    cinemaAddress: 'г. Минск, ул.Бобруйская, 6',
    hallsList: [
      {
        time: '13:40',
        typeVideo: '2D',
        typeAudio: 'Dolby Digital',
        hallTitle: 'Зал 2',
        filled: 90,
      },
      {
        time: '14:00',
        typeVideo: '2D',
        typeAudio: 'Dolby Digital',
        hallTitle: 'Зал 3',
        filled: 10,
      },
    ],
  },
];
const ANOTHER_DAYS_SHOWTIMES = [
  { date: 'Завтра', action: () => {} },
  { date: 'Суббота, 22 декабря', action: () => {} },
  { date: 'Воскресенье, 23 декабря', action: () => {} },
  { date: 'Понедельник, 24 декабря', action: () => {} },
  { date: 'Вторник, 25 декабря', action: () => {} },
];
const MOVIE = {
  poster: 'http://tsoft.silverscreen.by/cache/f6b/25f/9c4acef2d917260238d8eccf5d7238c7.jpg',
  title: 'Фантастические Твари: Преступления Грин-де-Вальда',
  description: 'Франческо исполнилось 9 лет, и семья подарила ему билеты в Рим, чтобы увидеть знаменитую Сикстинскую капеллу. Настал долгожданный день поездки, но непредвиденные проблемы заставляют вернуться из Рима раньше.',
  genre: 'фэнтэзи, приключения, семейный',
  ageLimit: '12+',
  duration: '2 ч 25 мин',
};
const TRAILER = {
  link: 'http://google.com',
  externalId: 'http://youtube.com/progulka',
  image: 'https://img.youtube.com/vi/Y3LwPEZ3kN0/mqdefault.jpg',
};

const MoviePreviewTest = () => (
  <MoviePreview
    movie={MOVIE}
    trailer={TRAILER}
    showTimes={SHOW_TIMES}
    filters={FILTERS}
    anotherDaysShowtimes={ANOTHER_DAYS_SHOWTIMES}
    backButton
    closeButton
    onBackClick={() => {}}
    onCloseClick={() => {}}
    theme="default"
  />
);

export default MoviePreviewTest;
