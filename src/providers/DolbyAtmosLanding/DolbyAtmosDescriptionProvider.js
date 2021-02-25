import React from 'react';

import { DolbyAtmos } from '../../components';

export default function DolbyAtmosFooterProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    descriptionTitle: null,
    descriptionText: null,
    descriptionImage: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };


  list.forEach((item) => {
    if (item.typeName === 'label') {
      props.descriptionTitle = (findValue(item, 'value'));
      return true;
    }
    if (item.typeName === 'description') {
      props.descriptionText = (findValue(item, 'value'));
      return true;
    }
    if (item.typeName === 'image') {
      props.descriptionImage = (findValue(item, 'source'));
      return true;
    }
    return true;
  });

  return (
    <DolbyAtmos.Description
      descriptionTitle={props.descriptionTitle}
      descriptionText={props.descriptionText}
      descriptionImage={props.descriptionImage}
    />
  );
}
