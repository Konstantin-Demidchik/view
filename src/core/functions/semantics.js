const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2
    : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const getYoutubeEmbededLink = (youtubeLink) => {
  let url = null;
  let vParam = null;

  try {
    url = new URL(youtubeLink);
    vParam = url.searchParams.get('v');;
  } catch (err) {
    console.log('[TD] 🎬 Cant make youtube link');
  }

  if (vParam) {
    return `https://www.youtube.com/embed/${vParam}`;
  }

  return null;
};

const isStringPixels = str => (/^[0-9]{1,}px$/g.test(str));

const isStringPercent = str => (/^[0-9]{1,}%$/g.test(str));

const getMoneyFormatted = money => (money).toFixed(2).replace('.', ',');

const getDiscount = (levels, numberTickets) => {
  let currentLevel = levels[0];

  for (let i = 0; i < levels.length; i += 1) {
    if (numberTickets >= levels[i].ticketsNumber) {
      currentLevel = levels[i];
    }
  }
  return currentLevel;
};

const getFileFormat = (fileName) => {
  if (fileName) {
    const filenameSplitted = fileName.split('.');
    if (filenameSplitted.length > 1) {
      const fileFormat = filenameSplitted[filenameSplitted.length - 1];
      return fileFormat;
    }
  }
  return false;
};

export {
  declOfNum,
  getYoutubeEmbededLink,
  isStringPixels,
  isStringPercent,
  getMoneyFormatted,
  getDiscount,
  getFileFormat,
};
