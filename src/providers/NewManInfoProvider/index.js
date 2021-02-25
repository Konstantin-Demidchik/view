import React from 'react';

import {
  PartsWrapper,
  Privilege,
  PrivilegeContent,
} from '../../pages/HowToBecomeAMember/HowToBecomeAMemberPageStyles';

import {
  Text,
  Image,
  Description,
} from '../../components';

const getProperties = component => component.childrenList.reduce((obj, item) => {
  const newObj = { ...obj };
  newObj[item.typeName] = {
    style: item.style,
    ...item.componentsDescription,
  };
  return newObj;
}, {});

export default (componentInfo) => {
  const content = getProperties(componentInfo);
  return (
    <PartsWrapper>
      <Privilege styleId={componentInfo.style}>
        <Image url={content.image.source} styleId={content.image.style} />
        <PrivilegeContent>
          <Text h4 styleId={content.label.style}>{content.label.value}</Text>
          <Description styleId={content.description.style}>{content.description.value}</Description>
        </PrivilegeContent>
      </Privilege>
    </PartsWrapper>
  );
};
