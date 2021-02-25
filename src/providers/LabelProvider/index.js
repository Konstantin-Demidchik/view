import React from 'react';
import { Text } from '../../components';
import { getStylesByCamelList } from '../../core/functions/styles';
import "../../assets/styles/main.css";
/*
 SectionMainProvider принимает следующие props: value.
 1. title - текст
 */

export default function LabelProvider(componentInfo, tag) {
  const { style, componentsDescription } = componentInfo;
  const props = {
    value: null,
    styleId: style,
    center: null,
    justify: null,
    styles: '',
  };

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };
  props.styles = getStylesByCamelList(componentInfo.componentsDescription);

  props.justify = JSON.parse(findValue(componentInfo, 'justify'));
  props.value = findValue(componentInfo, 'value');
  props.center = JSON.parse(findValue(componentInfo, 'center'));
  props.h1 = JSON.parse(findValue(componentInfo, 'h1'));
  props.h2 = JSON.parse(findValue(componentInfo, 'h2'));

  return (
    <Text
      h1={props.h1}
      h2={props.h2}
      styleId={props.styleId}
      center={props.center}
      justify={props.justify}
      styles={props.styles}
      className="label"
      tag={tag ? "h1" : "none"}
    >
      {props.value}
    </Text>
  );
}
