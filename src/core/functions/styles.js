const CSS_OPTIONS_LIST = {
  paddingTop: 'padding-top',
  paddingBottom: 'padding-bottom',
  marginTop: 'margin-top',
  marginBottom: 'margin-bottom',
  background: 'background',
  border: 'border',
  color: 'color',
  display: 'display',
  visibility: 'visibility',
  height: 'height',
  width: 'width',
  fontSize: 'font-size',
  opacity: 'opacity',
  fontWeight: 'font-weight',
};

/**
 * @param {Object} list Пример: { width: '100px', paddingTop: '15px' }
 * @return {String} Строка css свойств
 */
const getStylesByCamelList = (list) => {
  let result = '';

  if (list && list instanceof Object) {
    Object.keys(list).map((key) => {
      if (CSS_OPTIONS_LIST[key]) {
        result += `${CSS_OPTIONS_LIST[key]}:${list[key]};`;
      }

      return true;
    });
  }

  return result;
};

export {
  // eslint-disable-next-line import/prefer-default-export
  getStylesByCamelList,
};
