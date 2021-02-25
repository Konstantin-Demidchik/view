import React from 'react';
import styled, { css } from 'styled-components';

import { providerByComponentTitle } from '..';
import GiftCardsInfoContainerProvider from '../GiftCardsInfoContainerProvider';
import PatternInfoGiftCardsProvider from '../PatternInfoGiftCardsProvider';
import LabelButtonContainerProvider from '../LabelButtonContainerProvider';
import LabelContainerProvider from '../LabelContainerProvider';


import {
  HeaderSection,
} from '../../pages/GiftCards/GiftCardsStyled';


const InfoBlockWrapper = styled.div`
  ${props => props.styleId === '1' && css`
    background-color: red;
  `}
`;


export default function InfoBlockProvider(componentInfo) {
  const data = componentInfo.childrenList.map((component) => {
    const { typeName } = component;
    switch (typeName) {
      case 'giftCardsInfoContainer':
        return GiftCardsInfoContainerProvider(component);
      case 'patternInfoGiftCards':
        return PatternInfoGiftCardsProvider(component);
      case 'LabelButtonContainer':
        return LabelButtonContainerProvider(component);
      case 'labelContainer':
        return (
          <HeaderSection>
            {LabelContainerProvider(component)}
          </HeaderSection>
        )
      default:
        return providerByComponentTitle(typeName)(component);
    }
  }).filter(item => !!item);

  return (
      <InfoBlockWrapper
        styleId={componentInfo.style}
        background={componentInfo.background}
      >
        {data}
      </InfoBlockWrapper>
  );
}
