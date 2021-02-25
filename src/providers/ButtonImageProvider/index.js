import React from 'react';
import { ButtonImage } from '../../components';

export default function NewsSectionProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;

  const props = {
    link: null,
    source: null,
    width: null,
    height: null,
    styleId: style,
    float: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };
  props.link = findValue(componentInfo, 'link');
  props.source = findValue(componentInfo, 'source');
  props.width = findValue(componentInfo, 'width');
  props.height = findValue(componentInfo, 'height');
  props.float = findValue(componentInfo, 'float');
  if (props.float === 'true') props.float = true;

  return (
    <ButtonImage {...props} />
  );
}
