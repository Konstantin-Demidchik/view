import React from 'react';

import { providerByComponentTitle } from '../index';

import { ResponsiveWrapper } from '../../components';
import { getStylesByCamelList } from '../../core/functions/styles';

export default function ResponsiveWrapperProvider(componentInfo) {
  const {
    style,
    background,
    componentsDescription,
    name,
    childrenList: list,
  } = componentInfo;

  const data = list.map((component) => {
    if (providerByComponentTitle(component.typeName)) {
      return providerByComponentTitle(component.typeName)(component);
    }

    return null;
  });

  if (componentsDescription) {
    return (
      <ResponsiveWrapper
        key={name}
        styleId={style}
        centered={componentsDescription.center}
        paddingTop={componentsDescription.paddingTop}
        paddingBottom={componentsDescription.paddingBottom}
        marginTop={componentsDescription.marginTop}
        marginBottom={componentsDescription.marginBottom}
        borderTop={componentsDescription.borderTop}
        borderBottom={componentsDescription.borderBottom}
        styles={getStylesByCamelList(componentsDescription)}
      >
        {data}
      </ResponsiveWrapper>
    );
  }

  return (
    <ResponsiveWrapper
      key={name}
      styleId={style}
      background={componentInfo.background}
    >
      {data}
    </ResponsiveWrapper>
  );
}
