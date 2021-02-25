import React from 'react';

import { TtshnLanding } from '../../components';

export default function TsnRedactorsProvider(componentInfo) {
  const {
    background,
    componentsDescription,
  } = componentInfo;
  return (
    <TtshnLanding.Redactors
      description={componentsDescription ? componentsDescription.description : ''}
      backgroundRedactors={background}
    />
  );
}
