import React from 'react';

import { PopInfoBlock, PopInfoBlockItem } from '../../components';

export default function PopInfoBlockProvider(componentInfo) {
  const { style, background, childrenList: list } = componentInfo;

  const properties = {
    sectionTitle: null,
    sectionTitleStyle: null,
    background,
    styleId: style,
  };

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const blockItems = list.map((block) => {
    const blockItemProps = {
      iconUrl: null,
      title: null,
      description: null,
    };

    if (block.typeName === 'tag') {
      properties.sectionTitleStyle = block.style;
      properties.sectionTitle = findValue(block, 'value');
      return true;
    }

    block.childrenList.forEach((child) => {
      if (child.typeName === 'icon') {
        blockItemProps.iconUrl = findValue(child, 'source');
        return true;
      }
      if (child.typeName === 'label') {
        blockItemProps.title = findValue(child, 'value');
        return true;
      }
      if (child.typeName === 'description') {
        blockItemProps.description = findValue(child, 'value');
        return true;
      }
      return true;
    });

    return <PopInfoBlockItem {...blockItemProps} />;
  });

  return (
    <PopInfoBlock {...properties}>
      {blockItems}
    </PopInfoBlock>
  );
}
