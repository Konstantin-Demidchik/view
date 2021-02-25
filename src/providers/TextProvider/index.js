import React from 'react';
import { getStylesByCamelList } from '../../core/functions/styles';
import { Text } from '../../components';


export default function TextProvider(componentInfo) {
  const { style } = componentInfo;
  const props = {
    value: null,
    styleId: style,
    styles: '',
    h1: null,
    h2: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  props.styles = getStylesByCamelList(componentInfo.componentsDescription);
  props.value = findValue(componentInfo, 'value');

  return (
    <Text styleId={props.styleId} styles={props.styles}>{props.value}</Text>
  );
}
