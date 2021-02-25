import React from 'react';
import { EmailSubscriptionBox } from '../../components';

/**
 EmailSubscriptionBox принимает следующие props: icon, placeholder, buttonText, onButtonClick.
 1. icon - имя иконки
 2. placeholder - placeholder инпута
 3. buttonText - текст внутри кнопки
 4. onButtonClick - функция вызываемая на нажатие кнопки
 */

export default function EmailSubscriptionBoxProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    icon: null,
    placeholder: null,
    buttonText: null,
    onButtonClick: null,
    buttonStyle: null,
    styleId: style,
  };

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  list.forEach((item) => {
    if (item.typeName === 'icon') {
      props.icon = findValue(item, 'source');
      return true;
    }
    if (item.typeName === 'textField') {
      props.placeholder = findValue(item, 'placeHolder');
      return true;
    }
    if (item.typeName === 'button') {
      props.buttonStyle = item.style;
      props.buttonText = findValue(item, 'value');
      props.onButtonClick = () => findValue(item, 'link');
      return true;
    }
    return true;
  });

  return (
    <EmailSubscriptionBox {...props} />
  );
}
