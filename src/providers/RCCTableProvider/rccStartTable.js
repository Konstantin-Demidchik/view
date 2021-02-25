/**
 * @flow
 */

import React from 'react';

import {
  PartsWrapper,
  PrivilegeDescription,
  PrivilegeText,
  PrivilegePercentages,
  Shero,
  Percentage,
  PercentageName,
  ElementContainer,
  NumberWrapper,
} from '../../pages/HowToBecomeAMember/HowToBecomeAMemberPageStyles';

import { Text } from '../../components';

const getComponent = (component, index) => {
  if (component.image) return <img src={component.image.source} alt="" />;
  if (component.label && index === 1) {
    return (
      <PercentageName>
        <Text styleId={component.label.style}>{component.label.value}</Text>
      </PercentageName>
    );
  }
  if (component.label && component.label.value === '+') {
    return (
      <Percentage red>
        <Text styleId={component.label.style}>{component.label.value}</Text>
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
    <PartsWrapper>
      <PrivilegeDescription>
        <PrivilegeText>
          {description[0].map(item => item.children.label && <p>{item.children.label.value}</p>)}
        </PrivilegeText>
        <NumberWrapper>
          <ElementContainer>1.</ElementContainer>
          <ElementContainer>2.</ElementContainer>
          <ElementContainer>3.</ElementContainer>
          <ElementContainer>4.</ElementContainer>
          <ElementContainer>5.</ElementContainer>
        </NumberWrapper>
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
