import React from 'react';
import { AdvantagesHeader } from '../../components';

export default function CinemaAdvantagesHeader(componentInfo) {
  const { style, childrenList: list } = componentInfo;

  const props = {
    title: null,
    styleId: style,
    tabs: [],
    activeTab: null,
    borderBottom: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  list.forEach((item) => {
    props.activeTab = findValue(item, 'activeTab');
    if (item.typeName === 'label') {
      props.title = findValue(item, 'value');
      return true;
    }
    if (item.typeName === 'categoryFilter') {
      item.childrenList.forEach((tab) => {
        const headerTabs = {
          link: findValue(tab, 'link'),
          value: findValue(tab, 'value'),
        };
        props.tabs.push(headerTabs);
      });
      return true;
    }
    return true;
  });

  props.activeTab = parseInt(props.activeTab, 10);
  props.borderBottom = findValue(componentInfo, 'withoutBottomBorder');

  return (
    <AdvantagesHeader {...props} />
  );
}
