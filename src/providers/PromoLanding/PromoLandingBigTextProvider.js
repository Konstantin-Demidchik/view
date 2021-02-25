import React from 'react';

import { PromoLanding } from '../../components';

export default function PromoLandingBigTextProvider(componentInfo) {
  const {
    componentsDescription,
  } = componentInfo;

  return (
    <PromoLanding.BigText
      text={componentsDescription.value}
    />
  );
};