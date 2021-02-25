import React from 'react';

import { TtshnLanding } from '../../components';

export default function TsnBannerProvider(componentInfo) {
  const {
    background,
    childrenList,
  } = componentInfo;


  const bannerCards = childrenList.map((item) => {
    if (item.typeName === 'TsnBanner') {
      if (item.order === 1) {
        return {
          styleId: item.style,
          buttonText: item.componentsDescription ? item.componentsDescription.buttonText : null,
          leftImage: item.componentsDescription ? item.componentsDescription.leftImage : null,
          title: item.componentsDescription ? item.componentsDescription.title : null,
          value: item.componentsDescription ? item.componentsDescription.value : null,
          logoUrls: item.childrenList.map(logo => logo.componentsDescription.source),
        };
      }
      return {
        styleId: item.style,
        title: item.componentsDescription ? item.componentsDescription.title : null,
        value: item.componentsDescription ? item.componentsDescription.value : null,
        logoUrls: item.childrenList.map(logo => logo.componentsDescription.source),
      };
    }
  });
  return (
    <TtshnLanding.Banner
      bannerInfo={bannerCards}
      backgroundBanner={background}
      asideTitle={componentInfo && componentInfo.componentsDescription ? componentInfo.componentsDescription.title : null}
    />
  );
}
