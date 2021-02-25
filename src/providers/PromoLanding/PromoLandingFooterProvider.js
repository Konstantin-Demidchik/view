import React from 'react';

import { PromoLanding } from '../../components';

export default function PromoLandingFooterProvider(componentInfo) {
  const {
    childrenList,
    componentsDescription,
  } = componentInfo;

  const items = childrenList.map(item => {
    if (item.typeName === 'PromoLandingFooterItem') {
      return {
        iconName: item.componentsDescription.icon,
        text: item.componentsDescription.value,
      };
    }
  });

  return (
    <PromoLanding.Footer
      items={items}
    />
  );
};