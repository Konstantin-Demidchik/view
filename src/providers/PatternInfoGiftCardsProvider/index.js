import React from 'react';

import { CardSection } from '../../components';
import { Section } from '../../pages/GiftCards/GiftCardsStyled';

export default function PatternInfoGiftCardsProvider(componentInfo) {
  const { style, background, childrenList: list } = componentInfo;

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const props = {
    subtitle: null,
    title: null,
    description: null,
    reverse: null,
    price: null,
    image: null,
    icon: null,
    imageStyle: null,
    labelStyle: null,
    subtitleStyle: null,
    descriptionStyle: null,
    iconStyle: null,
  };

  props.reverse = findValue(componentInfo, 'reverse');

  list.forEach((component) => {
    if (component.typeName === 'image') {
      props.image = findValue(component, 'source');
      props.imageStyle = component.style;
      return true;
    }

    if (component.typeName === 'tag') {
      props.subtitle = findValue(component, 'value');
      props.subtitleStyle = component.style;
      return true;
    }

    if (component.typeName === 'label' && !(component.componentsDescription.type === 'price')) {
      props.title = findValue(component, 'value');
      props.labelStyle = component.style;
      return true;
    }

    if (component.componentsDescription.type === 'price') {
      props.price = findValue(component, 'value');
      return true;
    }

    if (component.typeName === 'description') {
      props.description = findValue(component, 'value');
      props.descriptionStyle = component.style;
      return true;
    }

    if (component.typeName === 'icon') {
      props.icon = findValue(component, 'source');
      props.iconStyle = component.style;
      return true;
    }
  });

  return (
    <Section
      card
      styleId={style}
      background={background}
    >
      <CardSection {...props} />
    </Section>
  );
}
