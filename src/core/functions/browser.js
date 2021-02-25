const rw = require('window-or-global');

const getDocument = () => {
  if (typeof document !== 'undefined') {
    return document;
  }
};

const getWindow = () => {
  return rw;
};

export {
  getDocument,
  getWindow,
};
