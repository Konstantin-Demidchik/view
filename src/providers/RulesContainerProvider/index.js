import React from 'react';

import { providerByComponentTitle } from '../index';

export default function DivProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    styleId: style,
    label: null,
    url: null,
  };

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const data = list.map((component) => {
    if (providerByComponentTitle(component.typeName)) {
      return providerByComponentTitle(component.typeName)(component);
    }

    return null;
  }).filter(item => !!item);

  return (
    <React.Fragment>
      {data}
    </React.Fragment>
  );
}
