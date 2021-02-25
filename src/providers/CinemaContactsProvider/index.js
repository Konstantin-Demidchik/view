import React from 'react';
import {
  Section, Cinema, CinemaHeader, IFrame,
} from '../../pages/ContactsPage/ContactsPageStyled';
import DescriptionProvider from '../DescriptionProvider';
import TextProvider from '../TextProvider';

export default function CinemaHeaderProvider(componentInfo) {
  const { style, background, childrenList: list } = componentInfo;

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const cinemaHeaderContent = list.map((component) => {
    if (component.typeName === 'label') {
      return (
        TextProvider(component)
      );
    }

    if (component.typeName === 'description') {
      return (
        DescriptionProvider(component)
      );
    }
  }).filter(item => !!item);

  const cinemaContent = list.map((component) => {
    if (component.typeName === 'googleMap') {
      return (
        <IFrame
          src={findValue(component, 'source')}
          allowfullscreen=""
        />
      );
    }
  }).filter(item => !!item);
  return (
    <Section
      styleId={style}
      background={background}
    >
      <Cinema>
        <CinemaHeader>
          {cinemaHeaderContent}
        </CinemaHeader>
        {cinemaContent}
      </Cinema>
    </Section>
  );
}
