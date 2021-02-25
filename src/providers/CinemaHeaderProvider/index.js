import React from 'react';
import { CinemaHeader } from '../../components';

/**
 Принимает пропсы:
 1. background - ссылка на бекграунд
 2. halls - количество залов
 3. name - наименование кинотеатра
 4. address - адрес
 5. leftButtonTitle - название левой кнопки
 6. rightButtonTitle - название правой кнопки
 */

export default function CinemaHeaderProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;

  const props = {
    background: null,
    halls: null,
    name: null,
    address: null,
    leftButtonTitle: null,
    leftButtonLink: null,
    rightButtonTitle: null,
    rightButtonLink: null,
    styleId: style,
    leftButtonStyle: null,
    rightButtonStyle: null,
    hallsStyle: null,
    nameStyle: null,
    addressStyle: null,
    h1: null,
  };

  props.background = componentInfo.background;

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  list.forEach((item) => {
    if (item.typeName === 'tag') {
      props.hallsStyle = item.style;
      props.halls = findValue(item, 'value');
      return true;
    }
    if (item.typeName === 'label') {
      props.nameStyle = item.style;
      props.h1 = JSON.parse(findValue(item, 'h1'));
      props.name = findValue(item, 'value');
      return true;
    }
    if (item.typeName === 'description') {
      props.addressStyle = item.style;
      props.address = findValue(item, 'value');
      return true;
    }
    // eslint-disable-next-line react/prop-types
    if (item.typeName === 'button' && !props.leftButtonTitle) {
      props.leftButtonStyle = item.style;
      props.leftButtonTitle = findValue(item, 'value');
      props.leftButtonLink = findValue(item, 'link');
      return true;
    }
    // eslint-disable-next-line react/prop-types
    if (item.typeName === 'button' && !props.rightButtonTitle) {
      props.rightButtonStyle = item.style;
      props.rightButtonTitle = findValue(item, 'value');
      props.rightButtonLink = findValue(item, 'link');
      return true;
    }
    return true;
  });

  return (
    <CinemaHeader {...props} />
  );
}
