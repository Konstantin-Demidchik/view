import React from 'react';

import { DolbyAtmos } from '../../components';

export default function DolbyAtmosAdvantagesProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    styleId: style,
    title: null,
    value: null,
    items: null,
    link: null,
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
    if (item.typeName === 'description') {
      props.value = (findValue(item, 'value'));
      return true;
    }
    if (item.typeName === 'advantagesList') {
      props.items = item.childrenList;
      return true;
    }
    if (item.typeName === 'video') {
      props.link = (findValue(item, 'source'));
      return true;
    }
    return true;
  });

  return (
    <DolbyAtmos.Advantages
      advantagesTitle={props.title}
      advantagesValue={props.value}
      items={props.items}
      link={props.link}
    />
  );
}
