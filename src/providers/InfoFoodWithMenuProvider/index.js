import React from 'react';
import { compose, withState } from 'recompose';

import {
  TabNav,
  TabNavItem,
  TabContent,
  TabPane,
  Text,
  Description,
} from '../../components';


import {
  PopcornPromoContainer,
  PopcornPromoWrapper,
  PoprornPromoLayout,
  PoprornPromoLayoutMain,
  PopcornPromoLayoutAside,
  PopcornPromoBackground,
  PopcornPromoTab,
  PopcornPromoImage,
  PopcornPromoTabTav,
  PopcornPromoDescription,
} from '../../pages/PopcornPromo/PopcornPromoStyles';

const getProperties = component => component.childrenList.reduce((obj, item) => {
  const newObj = { ...obj };
  newObj[item.typeName] = {
    style: item.style,
    ...item.componentsDescription,
  };
  return newObj;
}, {});

type PopcornPromoViewPropsType = {
  activeTabId: number,
  setActiveTab: (number) => void,
  componentInfo: Object,
};

const getTabs = component => component
  .childrenList.map(tab => ({
    ...getProperties(tab),
    ...tab.componentsDescription,
    style: tab.style,
  }));

const InfoFoodWithMenu = (props: PopcornPromoViewPropsType) => {
  const { activeTabId, setActiveTab, componentInfo } = props;
  const tabs = getTabs(componentInfo);
  return (
    <PopcornPromoContainer>
      <PoprornPromoLayout>
        <PopcornPromoBackground styleId={componentInfo.style} url={componentInfo.background} />

        <PopcornPromoWrapper>
          <PopcornPromoLayoutAside />

          <PoprornPromoLayoutMain>
            <PopcornPromoTabTav>
              <TabNav
                borderBottom
                small
                activeTabId={activeTabId}
                onSetActiveTab={setActiveTab}
              >
                {tabs.map((tab, index) => <TabNavItem tabId={index + 1}>{tab.value}</TabNavItem>)}
              </TabNav>
            </PopcornPromoTabTav>

            <TabContent activeTabId={activeTabId}>
              {tabs.map((tab, index) => (
                <TabPane tabId={index + 1}>
                  <PopcornPromoTab>
                    <PopcornPromoImage styleId={tab.icon.style}>
                      <img src={tab.icon.source} alt="popcorn" />
                    </PopcornPromoImage>

                    <Text styleId={tab.label.style}>{tab.label.value}</Text>
                    
                    <PopcornPromoDescription>
                      <Description styleId={tab.description.style}>
                        {tab.description.value}
                      </Description>
                    </PopcornPromoDescription>
                  </PopcornPromoTab>
                </TabPane>
              ))}
            </TabContent>
          </PoprornPromoLayoutMain>
        </PopcornPromoWrapper>
      </PoprornPromoLayout>
    </PopcornPromoContainer>
  );
};

const InfoFoodWithMenuProvider = compose(
  withState('activeTabId', 'setActiveTab', 1),
  withState('modalPopcornOpened', 'setModalPopcornOpened', false),
)(InfoFoodWithMenu);

export default componentInfo => <InfoFoodWithMenuProvider componentInfo={componentInfo} />;
