import React from 'react';

import { DolbyAtmos } from '../../components';

export default function DolbyAtmosInfoBlockProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    styleId: style,
    title: null,
    value: null,
    icon: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };


  list.forEach((item) => {
    if (item.typeName === 'label') {
      props.title = (findValue(item, 'value'));
      return true;
    }
    if (item.typeName === 'descriptionList') {
      props.items = item.childrenList;
      return true;
    }
    return true;
  });

  return (
    <DolbyAtmos.InfoBlock
      title={props.title}
      items={props.items}
    />
  );
}
