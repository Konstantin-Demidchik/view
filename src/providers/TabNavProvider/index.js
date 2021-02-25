import React from 'react';
import { TabNav, TabNavItem, Icon } from '../../components';
import getHistory from '../../core/functions/global-history';
import { getWindow } from '../../core/functions/browser';
import {
  TabBarSectionContainer,
  HeadingBlock,
  TabHeadingMain,
  EmptyHeading,
  TabNavAside,
  TabNavAsideIcon,
  TabNavAsideText,
  AfishaSection,
} from '../../pages/MainPage/MainPageStyled';


import {  setFilterDay, } from '../../store/actions';
import { getBelarusDateTime } from '../../core/functions/datetime';

import {
  compose,
} from 'recompose';
import { connect } from 'react-redux';

function TabNavProvider(composeProps) {
  const { style, childrenList: list } = composeProps.componentInfo;
  let buttonTabs;
  const createDateView = (movieFullDate) => {
    const date = new Date(movieFullDate);
    const options = {
      month: 'long',
      day: 'numeric',
      timeZone: 'Europe/Minsk',
    };
    return date.toLocaleString('ru', options);
  };

  const findValue = (item, fieldName) => {
    if (fieldName in item.componentsDescription) {
      return item.componentsDescription[fieldName];
    }
    return null;
  }

  const items = list.map(item => {
    const props = {
      onSetActiveTab: null,
      activeTabId: null,
      small: false,
      tabId: null,
      labelStyle: null,
      styleId: null,
    };

    if (item.typeName === 'label') {
      props.labelStyle = item.style;
      props.tabId = findValue(item, 'eventFilterKey');
      props.styleId = item.style;
      return (
        <TabNavItem {...props}>
          {findValue(item, 'value')}
        </TabNavItem>
      )
    }

    if(item.typeName === 'button') {
      buttonTabs = item;
    }

    return null

  }).filter(item => !!item);

  /**
   * <TabHeadingMain>
        <EmptyHeading />
      </TabHeadingMain>
   */

  return (
    <TabBarSectionContainer>
      <HeadingBlock>
        {
          list.length > 0 && (
            <TabNav
              styleId={style}
              activeTabId={composeProps.activeTabId}
              onSetActiveTab={composeProps.setActiveTabId}
            >
              {items}
            </TabNav>
          )
        }

        {buttonTabs &&
          <TabNavAside
            styleId={buttonTabs.style}
            onClick={() => {
              const nowDateShort = `${getBelarusDateTime().getFullYear()}-${(`0${getBelarusDateTime().getMonth() + 1}`).slice(-2)}-${(`0${getBelarusDateTime().getDate()}`).slice(-2)}`;
              composeProps.setFilterDay(`cегодня, ${createDateView(getBelarusDateTime())}`, getBelarusDateTime().getDate(), nowDateShort);
              getWindow().location.href = buttonTabs.componentsDescription.link;
            }}
          >
            <TabNavAsideIcon>
              <Icon name="calendar" />   {/*ИМЯ */}
            </TabNavAsideIcon>
            <TabNavAsideText>
              {buttonTabs.componentsDescription.value}
            </TabNavAsideText>
          </TabNavAside>
      }
      </HeadingBlock>
    </TabBarSectionContainer>
  );
}



export default (componentInfo, activeTabId, setActiveTabId) => {
  const mapDispatchToProps = (dispatch) => ({
    setFilterDay: (day, key, date) => dispatch(setFilterDay(day, key, date)),
  });
  const TabNavProviderWrapper = compose(
    connect(null, mapDispatchToProps),
  )(TabNavProvider);
  return (<TabNavProviderWrapper componentInfo={componentInfo} activeTabId={activeTabId} setActiveTabId={setActiveTabId}/>)
}
