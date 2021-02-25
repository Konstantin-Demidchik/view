/**
 * @flow
 */

import React from 'react';

import {
  PartsWrapper,
} from '../../pages/HowToBecomeAMember/HowToBecomeAMemberPageStyles';

import {
  Percentage,
  PercentageName,
  PrivilegeDescription,
  PrivilegePercentages,
  PrivilegeText,
  Shero,
  PercentageUnder,
  ShowSmSpan,
} from '../../pages/AboutRedCarpetClubPage/AboutRedCarpetClubPageStyled';

import { Text } from '../../components';

const getComponent = (component, index) => {
  if (component.image) return <img src={component.image.source} alt="" />;
  if (component.label && component.label1) {
    return (
      <React.Fragment>
        <PercentageName>
          <Text styleId={component.label.style}>{component.label.value}</Text>
        </PercentageName>
        <PercentageUnder>{component.label1.value}</PercentageUnder>
      </React.Fragment>
    );
  }
  if (component.label && index === 2) {
    return (
      <Percentage styleId={component.label.style}>
        <Text styleId={component.label.style}>
          {component.label.value}
        </Text>
        <ShowSmSpan>билетов*</ShowSmSpan>
      </Percentage>
    );
  }
  if (component.label && index === 3) {
    return (
      <Percentage styleId={component.label.style}>
        <Text styleId={component.label.style}>
          {component.label.value}
        </Text>
        <ShowSmSpan>скидка</ShowSmSpan>
      </Percentage>
    );
  }
  if (component.label) {
    return (
      <Percentage>
        <Text styleId={component.label.style}>{component.label.value}</Text>
      </Percentage>
    );
  }
  return <div />;
};

type RccStartTableTypes = {
  columns: Array<Object>,
  description: Array<Object>,
};

export default (props: RccStartTableTypes) => {
  const { columns, description } = props;
  return (
    <PartsWrapper padding="true">
      <PrivilegeDescription>
        <PrivilegeText>
          <div>
            {description[0].map(item => item.children.label && <p>{item.children.label.value}</p>)}
          </div>
        </PrivilegeText>
        <PrivilegePercentages>
          {columns.map(cell => (
            <Shero>
              {cell.map((component, index) => getComponent(component.children, index))}
            </Shero>
          ))}
        </PrivilegePercentages>
      </PrivilegeDescription>
    </PartsWrapper>
  );
};
