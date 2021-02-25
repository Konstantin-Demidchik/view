import React from 'react';
import { Description } from '../../components';
import { getStylesByCamelList } from '../../core/functions/styles';

export default function DescriptionProvider(componentInfo) {
  const { style } = componentInfo;
  const props = {
    value: null,
    justify: null,
    styleId: style,
    styles: '',
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  props.value = findValue(componentInfo, 'value');
  props.justify = findValue(componentInfo, 'justify');
  if (props.justify === 'true') props.justif = true;

  props.styles = getStylesByCamelList(componentInfo.componentsDescription);

  return (
    <Description
      styleId={props.styleId}
      justify={props.justify}
      styles={props.styles}
    >
      {props.value}
    </Description>
  );
}
