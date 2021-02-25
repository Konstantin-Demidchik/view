/**
 * Функция для запуска таймера с определенным количеством итераций и интервалом между ними
 * @param {Number} iterations - максимальное количество итераций
 * @param {Number} intervalMs - интервал между итерациями в миллисекундах
 * @param {Function} callback - callback, принимает ссылку на setInterval в качестве аргумента
 * @param {Function} endCallback - callback, вызывается если произведено максимальное количество итераций
 */
const makeInterval = (iterations, intervalMs, callback, endCallback) => {
  let iterationsCount = 0;

  const interval = setInterval(() => {
    callback(interval);

    iterationsCount += 1;

    if (iterationsCount === iterations) {
      clearInterval(interval);

      if (endCallback) {
        endCallback();
      }
    }
  }, intervalMs);
};

export {
  // eslint-disable-next-line import/prefer-default-export
  makeInterval,
};