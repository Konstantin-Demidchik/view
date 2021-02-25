import moment from 'moment-timezone';

const yearAgoDate = (d) => {
  d.setMonth(d.getMonth() - 12);
  return d;
};


const dayOfWeek = (d) => {
  const days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];
  if (typeof d !== 'object') {
    return days[d];
  }
  return days[d.getDay()];
};

const monthName = (d) => {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  if (typeof d !== 'object') {
    return months[d];
  }
  return months[d.getMonth()];
};


/**
 * Разница между текущим часовым поясом и белорусским в миллисекундах
 */
const getOffsetDiff = () => {
  const minskOffset = -180;
  const offset = new Date().getTimezoneOffset();
  const diff = minskOffset - offset;

  return diff * 60000;
};

/**
 * Текущее время в Беларуси
 */
const getBelarusDateTime = () => {
  return new Date(new Date().getTime() - getOffsetDiff());
};

/**
 * Время в белорусском часовом поясе. Важно: время не изменяется! Изменяется только часовой пояс!
 * @param {Date} now - любое время, которое нужно оптимизировать под белорусское.
 * @returns {Date} Время оптимизированное под белорусское
 */
 const getBelarusDate = now => {
   /*
   const currentTimeZone      = (new Date().getTimezoneOffset() / 60) * -1;
   const sign                 = currentTimeZone < 0 ? '-' : '+';
   const absedCurrentTimeZone = Math.abs(currentTimeZone);
   const firstPart            = currentTimeZone < 10 ? `0${absedCurrentTimeZone}` : absedCurrentTimeZone;
   const finalTimeZone        = `${sign}${firstPart}:00`;
   const formattedByMoment    = moment(now).format();
   const formattedDate        = `${formattedByMoment.split('').splice(0, formattedByMoment.length - 6).join('')}${finalTimeZone}`;
   const date                 = new Date(formattedDate);
   */
   let nowDate = now;
   if (typeof now === 'string') {
     nowDate = now.split('+')[0];
   }
   const resultMoment = moment.tz(nowDate, "Europe/Minsk");
   resultMoment.getDate = resultMoment.date;
   resultMoment.getMonth = resultMoment.month;
   resultMoment.getFullYear = resultMoment.year;
   resultMoment.getTime = resultMoment.valueOf;
   resultMoment.getHours = resultMoment.hour;
   resultMoment.getMinutes = resultMoment.minutes;
   resultMoment.getSeconds = resultMoment.seconds;
   resultMoment.getDay = resultMoment.day;
   //resultMoment.toLocaleString = resultMoment.updateLocale;
   return resultMoment;
 };


/**
 * Когда приходит строка вида '2019-07-12 00:00:00.000000' в ней нужно заменить пробел на T
 * @param {String} stringDate - Дата в строковом формате (например, 2019-07-12 00:00:00.000000)
 * @returns {Date} Кроссбраузерная дата
 */
const getRightDate = (stringDate) => {
  return getBelarusDate(moment(stringDate).format());
};

const formatDate = (d, format, view) => {
  let newDate = null;
  let newFormat = null;

  if (!d) {
    return '';
  }

  let D = getRightDate(d);

  if (typeof D === 'undefined' || D === null) {
    newDate = new Date();
  } else if (typeof D === 'number' || typeof D === 'string') {
    newDate = new Date(D);
  } else if (D.getTime()) {
    newDate = D;
  }
  newFormat = format || 'yyyy-mm-dd';

  const items = {
    y: newDate.getFullYear(),
    m: newDate.getMonth() + 1,
    d: newDate.getDate(),
    h: newDate.getHours(),
    i: newDate.getMinutes(),
    s: newDate.getSeconds(),
    D: newDate.getDate(),
    l: dayOfWeek(newDate),
    F: monthName(newDate),
  };

  if(view) {
    return newFormat
      .replace(/(y+|m+|d+|h+|i+|s+)/g, v => (''.repeat(v.length) + items[v.slice(-1)]).slice(-1 * v.length))
      .replace(/(l+|F+|D+)/g, v => items[v]);
  }
  return newFormat
    .replace(/(y+|m+|d+|h+|i+|s+)/g, v => ('0'.repeat(v.length) + items[v.slice(-1)]).slice(-1 * v.length))
    .replace(/(l+|F+|D+)/g, v => items[v]);
};

const createDateView = (movieFullDate) => {
  const date = getBelarusDate(movieFullDate);
    const rightDate = getBelarusDate(date);
    const day = date.date();
    return `${day} ${monthName(rightDate.getMonth())}`
};

/**
 * Интервал показа "с NNNN по NNNN"
 * @param {Date} intervalStart - дата начала интервала
 * @param {Date} intervalEnd - дата окончания интервала
 * @returns {String} Строка формата "с NNNN по NNNN"
 */
const getIntervalString = (intervalStart, intervalEnd) => {
  console.log('[TD]', intervalStart, intervalEnd);

  const start = new Date(intervalStart);
  const end = new Date(intervalEnd);

  return `с ${createDateView(intervalStart)} по ${createDateView(intervalEnd)}`;
};

const createTimeView = (movieFullDate) => {
  const date = getBelarusDate(movieFullDate);
  const minutes = date.getMinutes();
  return `${date.getHours()}:${minutes > 9 ? minutes : `0${minutes}`}`
}
/**
 * Первые N дней для отображения в фильтре
 * @param {Number} n - количество дней (deafult = 10)
 * @returns {Array<String>} Значения для фильтра
 */
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
  yearAgoDate,
  dayOfWeek,
  monthName,
  formatDate,
  getIntervalString,
  getRightDate,
  getBelarusDateTime,
  getBelarusDate,
  getNFilterDays,
  makeFormatForDate,
  createTimeView,
  createDateView
};
