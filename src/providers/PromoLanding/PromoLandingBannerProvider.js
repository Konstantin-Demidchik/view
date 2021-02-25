import React from 'react';

import { PromoLanding } from '../../components';

export default function PromoLandingBannerProvider(componentInfo) {
  const {
    childrenList,
    background,
    componentsDescription,
  } = componentInfo;

  const button = {
    link:
        childrenList[0].typeName === 'button' && childrenList[0].componentsDescription
      ? childrenList[0].componentsDescription.link
      : '',
    text:
        childrenList[0].typeName === 'button' && childrenList[0].componentsDescription
      ? childrenList[0].componentsDescription.value
      : '',
  };

  return (
    <PromoLanding.Banner
      backgroundUrl={background}
      firstTitle={componentsDescription.firstTitle}
      secondTitle={componentsDescription.secondTitle}
      description={componentsDescription.description}
      button={button}
    />
  );
}
