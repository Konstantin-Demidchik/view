import React from 'react';
import styled, { css } from 'styled-components';
import {
  LabelProvider,
} from '..';
import "../../assets/styles/main.css";

import { isStringPixels } from '../../core/functions/semantics';
import { screens } from '../../styles/variables';

export const TitleContainer = styled.div`
  ${props => props.styles}
  ${props => isStringPixels(props.paddingBottom) && css`
    padding-bottom: ${props.paddingBottom};
  `}
  ${props => props.borderB && css`
    border-bottom: 1px solid #48484b;
  `}

  @media (max-width: ${screens.screen_2xs_max}) {
    text-align: center;
  }
`;

const getComponents = parentComponent => parentComponent
  .childrenList.map(component => LabelProvider(component));

export default function SectionMainProvider(componentInfo) {
  const {
    componentsDescription,
  } = componentInfo;
  const styles = componentInfo.componentsDescription
    ? Object.entries(componentInfo.componentsDescription)
      .map(description => description.join(': ').replace(/_/, '-'))
      .join('; ')
    : '';

  return (
    <TitleContainer
      styles={styles}
      paddingBottom={componentsDescription.paddingBottom}
      borderB={componentsDescription.borderBottom}
      className="titleContainer"
    >
      {getComponents(componentInfo)}
    </TitleContainer>
  );
}
