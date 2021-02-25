import React from 'react';

import { TtshnLanding } from '../../components';

export default function TsnInfoProvider(componentInfo) {
  const {
    background,
    componentsDescription,
    childrenList,
  } = componentInfo;

  const factsList = childrenList.map((list) => {
    let resultList = null;
    if (list.typeName === 'TsnInfoList') {
      resultList = list.childrenList.map((item) => {
        if (item.typeName === 'TsnInfoItem' && item.componentsDescription) {
          return {
            description: item.componentsDescription.description,
            image: item.componentsDescription.image,
          }
        }
      })
    }
    return resultList;
  })
  return (
    <TtshnLanding.Info
      title={componentsDescription ? componentsDescription.title : ''}
      buttonText={componentsDescription ? componentsDescription.buttonText : ''}
      backgroundInfo={background}
      facts={factsList}
    />
  );
}
