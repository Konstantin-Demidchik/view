import React from 'react';
import styled, { css } from 'styled-components';
import {
  colors,
  screens,
  transition,
  container,
} from '../../styles/variables';

import {
  LabelProvider,
  DescriptionProvider,
} from '..';

export const DescriptionContainer = styled.div`
  span p {
    margin: 0;
  }
  * {
  ${(props) => {
    switch (props.styleId) {
      case 1:
        return css`
          text-align: start;
        `;
      case 2:
        return css`
          text-align: center;
        `;
      case 3:
        return css`
          text-align: end;
        `;
      default:
        return '';
    }
  }}
  }
  ${props => props.styles}

  ${props => props.styleId === 'giftPage_check' && css`
    width: 100%;
    padding: 70px 30px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    max-width: ${container.container_width};

    @media (max-width: ${screens.screen_xs_max}) {
      padding-left: 20px;
      padding-right: 20px;
    }

    padding-left: 0px;
    padding-right: 0px;

    p{
        margin: 18px 0;
    }
    a{
        text-decoration: none;
        color: ${colors.color_alt_t};
        transition: ${transition.transition_base};
        outline: 0;
        &:hover {
          color: ${colors.color_primary_t};
        }
    }

  `}
`;

const getComponents = parentComponent => parentComponent.childrenList.map((component) => {
  switch (component.typeName) {
    case 'description':
      return DescriptionProvider(component);
    case 'label':
      return LabelProvider(component);
    default:
      return null;
  }
});

export default function SectionMainProvider(componentInfo) {
  const styles = componentInfo.componentsDescription
    ? Object.entries(componentInfo.componentsDescription)
      .map(description => description.join(': ').replace(/_/, '-'))
      .join('; ')
    : '';

  return (
    <DescriptionContainer styleId={componentInfo.style} styles={styles} className="labelContainer">
      {getComponents(componentInfo)}
    </DescriptionContainer>
  );
}
