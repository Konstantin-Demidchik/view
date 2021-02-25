import { dayOfWeek, getBelarusDate } from './datetime';

const createDateView = (movieFullDate) => {
  const date = new Date(movieFullDate);
  const options = {
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Minsk',
  };
  return date.toLocaleString('ru', options);
};

// первые 10 дней для отображения в фильтрах
const getNFilterDays = (n = 10) => {
  const calendarOptionItems = [];

  for (let i = 0; i < n; i += 1) {
    const date = getBelarusDate(new Date((new Date()).getTime() + (24 * 60 * 60 * 1000 * i)));
    calendarOptionItems.push(createDateView(date));
  }

  calendarOptionItems.forEach((comp, index) => {
    const option = {
      label: null,
      id: null,
      date: null,
    };

    const date = new Date((getBelarusDate(new Date())).getTime() + (24 * 60 * 60 * 1000 * index));

    option.label = `${dayOfWeek(new Date((getBelarusDate(new Date())).getTime() + (24 * 60 * 60 * 1000 * index)))}, ${comp}`;
    option.date = `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;

    if (index === 0) {
      option.label = `Сегодня, ${comp}`;
    }

    option.id = index;
  });

  return calendarOptionItems;
};

const makeFormatForDate = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

export {
  getNFilterDays,
  makeFormatForDate,
};
