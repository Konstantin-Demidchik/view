import React from 'react';

import { DolbyAtmos } from '../../components';
import { providerByComponentTitle } from '../index'
import styled from 'styled-components';

const DolbyAtmosAfishaWrapper = styled.div`
  background: #1F232D;
`

export default function FloatButtonProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    afishaTitle: null,
    descriptionText: null,
    movieRoller: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };


  list.forEach((item) => {
    if (item.typeName === 'label') {
      props.afishaTitle = findValue(item, 'value');
      return true;
    }

    if (item.typeName === 'description') {
      props.descriptionText = findValue(item, 'value');
      return true;
    }

    if (item.typeName === 'section') {
      props.movieRoller = providerByComponentTitle(item.typeName)(item);
      return;
    }
    return true;

  });

  return (
    <DolbyAtmosAfishaWrapper>
      <DolbyAtmos.Afisha
        afishaTitle={props.afishaTitle}
        descriptionText={props.descriptionText}
      />
      {props.movieRoller}
    </DolbyAtmosAfishaWrapper>
  );
}
