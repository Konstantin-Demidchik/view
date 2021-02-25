import React from 'react';
import { SecondNewsSection } from '../../components';

export default function SecondNewsSectionProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;

  const props = {
    label: null,
    description: null,
    reverse: null,
    image: null,
    align: null,
    styleId: style,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  props.reverse = findValue(componentInfo, 'reverse');

  list.forEach((child) => {
    if (child.typeName === 'label') {
      props.label = (findValue(child, 'value'));
      return true;
    }
    if (child.typeName === 'description') {
      props.description = (findValue(child, 'value'));
      props.align = (findValue(child, 'align'));
      return true;
    }
    if (child.typeName === 'image') {
      props.image = (findValue(child, 'source'));
      return true;
    }
    return true;
  });
  return (
    <SecondNewsSection {...props} />
  );
}
