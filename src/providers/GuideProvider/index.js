import React from 'react';

import { Guide } from '../../components';

export default function GuideProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    styleId: style,
    urlGuide: null,
    description: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  list.forEach((child) => {
    if (child.typeName === 'image') {
      props.urlGuide = findValue(child, 'source');
      return true;
    }
    if (child.typeName === 'description') {
      props.description = findValue(child, 'value');
      return true;
    }
    return true;
  });

  return (
    <Guide {...props} />
  );
}
