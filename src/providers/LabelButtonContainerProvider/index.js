import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components';
import LabelProvider from '../LabelProvider';
import { Link } from 'react-router-dom';
import {
  HeaderSection,
  ButtonsContainer,
} from '../../pages/GiftCards/GiftCardsStyled'


/*
<HeaderSection giftcard_info>
  <ContentWrapper>
    <Text h2>У вас уже есть подарочная карта ?</Text>
    <ButtonsContainer>
      <Link to="/giftcard_info">
        <Button>
            Узнать информацию по Подарочной карте
        </Button>
      </Link>
    </ButtonsContainer>
  </ContentWrapper>
</HeaderSection>
*/

const findValue = (comp, fieldName) => {
  if (comp.componentsDescription && fieldName in comp.componentsDescription) {
    return comp.componentsDescription[fieldName];
  }
  return null;
};

const getComponents = parentComponent => parentComponent.childrenList.map((component) => {
  switch (component.typeName) {
    case 'button':
      return (
        <ButtonsContainer>
          <Link to={findValue(component, 'link')}>
            <Button
              styleId={component.style}
              background={component.background}
            >
                {findValue(component, 'value')}
            </Button>
          </Link>
        </ButtonsContainer>
      );
    case 'label':
      return LabelProvider(component);
    default:
      return null;
  }
});


export default function LabelButtonContainerProvider(componentInfo) {
  const { style, background } = componentInfo;

  const styles = componentInfo.componentsDescription
    ? Object.entries(componentInfo.componentsDescription)
      .map(description => description.join(': ').replace(/_/, '-'))
      .join('; ')
    : '';

  return (
    <HeaderSection
      styleId={style}
      background={background}
      giftcard_info
    >
      {getComponents(componentInfo)}
    </HeaderSection>
  );
}
