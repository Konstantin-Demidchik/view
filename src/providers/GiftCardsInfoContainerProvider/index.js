import React from 'react';
import { Text, Icon, Description } from '../../components';
import {
  Section,
  AdvantagesSection,
  AdvantagesItem,
  AdvantagesItemIcon,
  AdvantagesItemTitle,
  AdvantagesItemText,
} from '../../pages/GiftCards/GiftCardsStyled';

const findValue = (comp, fieldName) => {
  if (fieldName in comp.componentsDescription) {
    return comp.componentsDescription[fieldName];
  }
  return null;
};

const getChildren = item => item.childrenList.map((component) => {
  if (component.typeName === 'label') {
    return (
      <AdvantagesItemTitle>
        <Text styleId={component.style}>{findValue(component, 'value')}</Text>
      </AdvantagesItemTitle>
    );
  }
  if (component.typeName === 'icon') {
    return (
      <AdvantagesItemIcon>
        <img src={findValue(component, 'source')} />
      </AdvantagesItemIcon>
    );
  }
  if (component.typeName === 'description') {
    return (
      <AdvantagesItemText>
        {findValue(component, 'value')}
      </AdvantagesItemText>
    );
  }
});

export default function GiftCardsInfoContainerProvider(componentInfo) {
  const { style, background, childrenList: list } = componentInfo;

  const contentProvider = list.map((item, index) => {
    const props = {
      isLast: null,
      styleId: null,
      background: null,
    };

    if (item.typeName === 'giftCardsInfoContainerItem') {
      props.isLast = (index === list.length - 1);
      props.styleId = item.style;
      props.background = item.background;

      return (
        <AdvantagesItem {...props}>
          {getChildren(item)}
        </AdvantagesItem>
      );
    }
  });

  return (
    <Section
      advantages
      styleId={style}
      background={background}
    >
      <AdvantagesSection>
        {contentProvider}
      </AdvantagesSection>
    </Section>
  );
}
