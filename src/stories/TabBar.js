/**
 * @flow
 */
import React from 'react';
import { compose, withState } from 'recompose';
import {
  TabNav,
  TabNavItem,
  TabContent,
  TabPane,
} from '../components';

type TabBarPropsType = {
  activeTabId: number,
  setActiveTab: (number) => void,
  small?: boolean,
};

const TabBar = (props: TabBarPropsType) => {
  if (props.small) {
    return (
      <div>
        <TabNav small activeTabId={props.activeTabId} onSetActiveTab={props.setActiveTab}>
          <TabNavItem tabId={1}>Мой RCC</TabNavItem>
          <TabNavItem tabId={2}>Профиль</TabNavItem>
        </TabNav>

        <TabContent activeTabId={props.activeTabId}>
          <TabPane tabId={1}>
              Вкладка ... Мой RCC
          </TabPane>

          <TabPane tabId={2}>
              Вкладка ... Профиль
          </TabPane>
        </TabContent>
      </div>
    );
  }

  return (
    <div>
      <TabNav activeTabId={props.activeTabId} onSetActiveTab={props.setActiveTab}>
        <TabNavItem tabId={1}>Сейчас в кино</TabNavItem>
        <TabNavItem tabId={2}>Скоро</TabNavItem>
        <TabNavItem tabId={3}>Спецпроекты</TabNavItem>
      </TabNav>

      <TabContent activeTabId={props.activeTabId}>
        <TabPane tabId={1}>
            Вкладка ... Сейчас в кино
        </TabPane>

        <TabPane tabId={2}>
            Вкладка ... Скоро
        </TabPane>

        <TabPane tabId={3}>
            Вкладка ... Спецпроекты
        </TabPane>
      </TabContent>
    </div>
  );
};

TabBar.defaultProps = {
  small: false,
};

export default compose(
  withState('activeTabId', 'setActiveTab', 1),
)(TabBar);
