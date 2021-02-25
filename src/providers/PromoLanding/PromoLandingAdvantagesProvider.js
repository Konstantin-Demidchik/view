import React from 'react';

import { PromoLanding } from '../../components';

export default function PromoLandingBigTextProvider(componentInfo) {
  const {
    childrenList,
    componentsDescription,
  } = componentInfo;

  const items = childrenList.map(item => {
    if (item.typeName === 'advantagesItem') {
      return {
        number: item.componentsDescription.number,
        animation: item.componentsDescription.animation ? item.componentsDescription.animation : null,
        description: item.componentsDescription.description,
      };
    }
  });

  return (
    <PromoLanding.Advantages
      items={items}
    />
  );
};