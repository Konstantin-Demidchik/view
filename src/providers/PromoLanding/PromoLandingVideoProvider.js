import React from 'react';

import { PromoLanding } from '../../components';

export default function PromoLandingVideoProvider(componentInfo) {
  const {
    componentsDescription,
  } = componentInfo;

  return (
    <PromoLanding.Video
      embedId={componentsDescription.source}
    />
  );
};