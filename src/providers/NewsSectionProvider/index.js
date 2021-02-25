import React from 'react';
import { NewsSection } from '../../components';

export default function NewsSectionProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    tag: null,
    tagStyle: null,
    label: null,
    labelStyle: null,
    description: null,
    descriptionStyle: null,
    background: null,
    theme: null,
    btnTitle: null,
    btnTitleStyle: null,
    url: null,
    locked: null,
    reverse: false,
    image: null,
    styleId: style,
    borderBottom: null,
    alignItems: null,
    paddingTop: null,
    marginBottomMain: null,
    marginBottomAside: null,
    pictures: [],
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  props.background = componentInfo.background;
  props.reverse = findValue(componentInfo, 'reverse');
  props.locked = findValue(componentInfo, 'lock');
  props.theme = findValue(componentInfo, 'theme');
  props.borderBottom = JSON.parse(findValue(componentInfo, 'borderBottom'));
  props.alignItems = findValue(componentInfo, 'alignItems');
  props.paddingTop = findValue(componentInfo, 'paddingTop');
  props.paddingBottom = findValue(componentInfo, 'paddingBottom');
  props.marginBottomAside = findValue(componentInfo, 'marginBottomAside');
  props.marginBottomMain = findValue(componentInfo, 'marginBottomMain');

  list.forEach((child) => {
    if (child.typeName === 'tag') {
      props.tagStyle = child.style;
      props.tag = findValue(child, 'value');
      return true;
    }
    if (child.typeName === 'label') {
      props.labelStyle = child.style;
      props.label = findValue(child, 'value');
      return true;
    }
    if (child.typeName === 'description') {
      props.descriptionStyle = child.style;
      props.description = findValue(child, 'value');
      return true;
    }
    if (child.typeName === 'button') {
      props.btnTitleStyle = child.style;
      props.url = findValue(child, 'link');
      props.btnTitle = findValue(child, 'value');
      return true;
    }
    if (child.typeName === 'image') {
      props.image = findValue(child, 'source');
      return true;
    }
    if (child.typeName === 'asideImage') {
      props.pictures.push({
        asideSource: findValue(child, 'source'),
        asideLink: findValue(child, 'link'),
        asideWidth: findValue(child, 'width'),
      });
      return true;
    }
    return true;
  });
  return (
    <NewsSection {...props} />
  );
}
