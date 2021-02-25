import React from 'react';

import {
  SectionContainer,
  Section,
  CinemaView,
} from '../../pages/CinemaPage/CinemaPageStyled';

export default function IframeProvider(componentInfo) {
  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
      return null;
    };

  const props = {
    src: null,
    frameBorder: "0",
    allowFullscreen: "",
  };

  props.src = findValue(componentInfo, 'source');

  return (
    <SectionContainer styleId={componentInfo.style} background={componentInfo.background}>
      <Section>
        <CinemaView {...props} />
      </Section>
    </SectionContainer>
  );
}
