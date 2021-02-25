import React from 'react';

import { DolbyAtmos } from '../../components';

export default function DolbyAtmosFooterProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    styleId: style,
    value: null,
    buttonValue: null,
    link: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };


  list.forEach((item) => {
    if (item.typeName === 'description') {
      props.value = (findValue(item, 'value'));
      return true;
    }
    if (item.typeName === 'button') {
      props.buttonValue = (findValue(item, 'value'));
      props.link = (findValue(item, 'link'));
      return true;
    }
    return true;
  });

  return (
    <DolbyAtmos.Footer
      footerDescription={props.value}
      button={props.buttonValue}
      link={props.link}
    />
  );
}
