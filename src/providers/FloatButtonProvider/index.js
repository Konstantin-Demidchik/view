import React from 'react';

import { FloatButton } from '../../components';

export default function FloatButtonProvider(componentInfo) {
  const { style } = componentInfo;
  const props = {
    styleId: style,
    value: null,
    link: null,
    time: null,
    itemKey: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };


  props.value = findValue(componentInfo, 'value');
  props.itemKey = findValue(componentInfo, 'key');
  props.link = findValue(componentInfo, 'link');
  props.time = findValue(componentInfo, 'time');

  return (
    <FloatButton {...props} />
  );
}
