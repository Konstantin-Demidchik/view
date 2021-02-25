import React from 'react';
import { TabsHeader } from '../../components';

export default function TabsHeaderAfishaProvider(componentInfo, activeTabId, setActiveTabId) {
  const { style, childrenList: list } = componentInfo;

  const props = {
    title: null,
    styleId: style,
    tabs: [],
    activeTab: null,
    h1: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };
  list.forEach((item) => {
    if (item.typeName === 'label') {
      props.title = findValue(item, 'value');
      props.h1 = JSON.parse(findValue(item, 'h1'));
      return true;
    }
    if (item.typeName === 'categoryFilter') {
      item.childrenList.forEach((tab) => {
        const headerTabs = {
          link: findValue(tab, 'link'),
          value: findValue(tab, 'value'),
          key: findValue(tab, 'eventFilterKey'),
        };
        props.tabs.push(headerTabs);
      });
      return true;
    }
    return true;
  });

  return (
    <TabsHeader {...props} setActiveTabIdForSection={setActiveTabId} activeTabIdForSection={activeTabId}  />
  );
}
