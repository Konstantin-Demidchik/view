import React from 'react';
import getHistory from '../../core/functions/global-history';
import { NavigationMain, Button } from '../../components';

/**
 NavigationMainProvider принимает следующие props: link, title.
 1. link - ссылка
 2. btnTitle - название
 */

export default function NavigationMainProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const button = list.map((item) => {
    const props = {
      btnTitle: null,
      url: null,
      buttonStyle: null,
    };

    props.url = findValue(item, 'link');
    props.btnTitle = findValue(item, 'value');

    return (
      <Button
        navigationMainLinkItem
        styleId={item.style}
        onClick={() => getHistory().push(props.url)}
      >
        {props.btnTitle}
      </Button>
    );
  });

  return (
    <NavigationMain styleId={style}>
      {button}
    </NavigationMain>
  );
}
