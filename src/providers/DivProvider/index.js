import React from 'react';
import getHistory from '../../core/functions/global-history';

import { providerByComponentTitle } from '../index';

import { Button } from '../../components';

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

    if (component.typeName === 'button') {
      props.url = findValue(component, 'link');
      return (
        <p>
          <Button
            onClick={() => getHistory().push(props.url)}
          >
            {findValue(component, 'value')}
          </Button>
        </p>
      );
    }

    return null;
  }).filter(item => !!item);

  return (
    <React.Fragment>
      {data}
    </React.Fragment>
  );
}
