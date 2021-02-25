import React from 'react';
import { ButtonModalRenthall } from '../../components';

export default function ButtonModalProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    source: null,
    styleId: style,
    serName: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  props.source = findValue(componentInfo, 'value');

  return (
    <ButtonModalRenthall {...props} />
  );
}
