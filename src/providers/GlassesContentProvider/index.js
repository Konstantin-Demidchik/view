import React from 'react';

import {
  GlassesContentWrapper,
  Container,
  Content,
} from '../../pages/GlassesPage/GlassesPageStyled';

import TextProvider from '../TextProvider';
import ImageProvider from '../ImageProvider';
import DescriptionProvider from '../DescriptionProvider';
import AccordionProvider from '../AccordionProvider';


export default function GlassesContentProvider(componentInfo) {
  const { childrenList: list } = componentInfo;

  // const findValue = (comp, fieldName) => {
  //   if (fieldName in comp.componentsDescription) {
  //     return comp.componentsDescription[fieldName];
  //   }
  //   return null;
  // };

  const content = list.map((item) => {
    if (item.typeName === 'label') {
      return TextProvider(item);
    }
    if (item.typeName === 'image') {
      return ImageProvider(item);
    }

    if (item.typeName === 'description') {
      return DescriptionProvider(item);
    }

    if (item.typeName === 'accordeon') {
      return AccordionProvider(item);
    }

    return null;
  }).filter(item => !!item);
  return (
    <GlassesContentWrapper styleId={componentInfo.style} backgroundId={componentInfo.background}>
      <Container>
        <Content>
          {content}
        </Content>
      </Container>
    </GlassesContentWrapper>
  );
}
