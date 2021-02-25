import React from 'react';

import { PromoLanding } from '../../components';

export default function PromoLandingTextProdider(componentInfo) {
  const {
    componentsDescription,
  } = componentInfo;

  return (
    <PromoLanding.Text
      text={componentsDescription.value}
    />
  );
};