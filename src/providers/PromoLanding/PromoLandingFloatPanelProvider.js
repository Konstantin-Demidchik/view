import React from 'react';

import { PromoLanding, Button, LinkCleanStyles } from '../../components';

export default function PromoLandingTextProdider(componentInfo) {
  const {
    childrenList,
    componentsDescription,
  } = componentInfo;

  const items = childrenList.map(item => {
    if (item.typeName === 'button') {
      return (
        <LinkCleanStyles href={item.componentsDescription.link}>
          <Button>
            {item.componentsDescription.value}
          </Button>
        </LinkCleanStyles>
      );
    }
    return null;
  });

  return (
    <PromoLanding.FloatPanel>
      {items}
    </PromoLanding.FloatPanel>
  );
};