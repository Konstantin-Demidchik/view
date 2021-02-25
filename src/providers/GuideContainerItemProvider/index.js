import React from 'react';
import styled from 'styled-components';
import {
  colors,
  screens,
} from '../../styles/variables';

import {
  ImageProvider,
  DescriptionProvider,
} from '..';

const GuideIconsItem = styled.div`
    width: 360px;
    text-align: center;
    margin: 15px;
    p{
        &:last-child{
            margin-bottom: 0;
        }
    }
    img{
        width: 60%;
        margin: auto;
    }
    a {
        color: ${colors.color_alt_t};
        cursor: pointer;
        border: none;
        text-decoration: none;
        transition: .2s;
        &:hover {
           outline: 0;    
           color: ${colors.color_primary_t};
        }
      }
    @media (max-width: ${screens.screen_sm_max}) {
        margin: auto;
            padding-top: 25px;
    }
`;

const getComponents = parentComponent => parentComponent.childrenList.map((component) => {
  switch (component.typeName) {
    case 'description':
      return DescriptionProvider(component);
    case 'image':
      return ImageProvider(component);
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
    <GuideIconsItem styleId={componentInfo.style} styles={styles} className="labelContainer">
      {getComponents(componentInfo)}
    </GuideIconsItem>
  );
}
