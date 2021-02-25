import React from 'react';
import styled from 'styled-components';
import {
  GuideContainerItemProvider,
} from '..';

export const GuideContainer = styled.div`
    ${props => props.styles}
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    img{
        &:last-child{
            margin-top: 10px;
        }
    }
    div:last-child{
        img{
            width: 60%;
            margin-top: 10px;
        }
    }
`;

const getComponents = parentComponent => parentComponent
  .childrenList.map(component => GuideContainerItemProvider(component));

export default function SectionMainProvider(componentInfo) {
  const styles = componentInfo.componentsDescription
    ? Object.entries(componentInfo.componentsDescription)
      .map(description => description.join(': ').replace(/_/, '-'))
      .join('; ')
    : '';

  return (
    <GuideContainer styles={styles} className="guideContainer">
      {getComponents(componentInfo)}
    </GuideContainer>
  );
}
