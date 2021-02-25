import React from 'react';
import { FoodSection } from '../../components/Section';

export default function InfoFoodItemProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    reverse: null,
    styleId: style,
    background: null,
    label: null,
    title: null,
    btnTitle: null,
    video: null,
    textColor: null,
    gradient: null,
    exclusive: null,
    paddingTop: null,
    upperGradient: null,
    lightBackground: null,
    backgroundSize: null,
    heightSection: null,
    backgroundSecondSize: null,
  };

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  props.background = componentInfo.background;
  props.lightBackground = JSON.parse(findValue(componentInfo, 'lightBackground'));
  props.upperGradient = JSON.parse(findValue(componentInfo, 'upperGradient'));
  props.backgroundSize = JSON.parse(findValue(componentInfo, 'backgroundSize'));
  props.backgroundSecondSize = JSON.parse(findValue(componentInfo, 'backgroundSecondSize'));
  props.exclusive = JSON.parse(findValue(componentInfo, 'exclusive'));
  props.gradient = JSON.parse(findValue(componentInfo, 'gradient'));
  props.reverse = JSON.parse(findValue(componentInfo, 'reverse'));
  props.textColor = (findValue(componentInfo, 'theme'));
  props.paddingTop = (findValue(componentInfo, 'paddingTop'));
  props.heightSection = (findValue(componentInfo, 'heightSection'));

  list.forEach((item) => {
    if (item.typeName === 'image') {
      props.lable = (findValue(item, 'source'));
      return true;
    }
    if (item.typeName === 'label') {
      props.title = (findValue(item, 'value'));
      props.styleId = item.style;
      return true;
    }
    if (item.typeName === 'description') {
      props.description = (findValue(item, 'value'));
      return true;
    }
    if (item.typeName === 'button') {
      props.btnTitle = (findValue(item, 'value'));
      return true;
    }
    if (item.typeName === 'video') {
      props.video = (findValue(item, 'source'));
      return true;
    }
    return true;
  });

  if (props.textColor === 'light') {
    props.textColor = 'rgba(39, 39, 42, .9)';
  }
  return (
    <FoodSection {...props} />
  );
}
