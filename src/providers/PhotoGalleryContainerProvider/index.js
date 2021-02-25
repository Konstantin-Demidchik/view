import React from 'react';

import {
  PhotoGallery,
} from '../../components';

import {
  Section,
} from '../../pages/CinemaPage/CinemaPageStyled';

const getChildren = component => component.childrenList.reduce((obj, item) => {
  const newObj = { ...obj };
  newObj[item.typeName] = {
    style: item.style,
    childrenList: item.childrenList,
    ...item.componentsDescription,
  };
  return newObj;
}, {});

const findValue = (comp, fieldName) => {
  if (comp.componentsDescription && fieldName in comp.componentsDescription) {
    return comp.componentsDescription[fieldName];
  }
  return null;
};

const getImages = parentComponent => parentComponent.childrenList.map(component => ({
  style: component.style,
  src: component.componentsDescription.source,
}));

export default (componentInfo) => {
  const {
    label: title,
    photoGalery,
  } = getChildren(componentInfo);

  const images = getImages(photoGalery);

  return (
    <Section paddingValue={photoGalery.paddingValue ? photoGalery.paddingValue : null}>
      <PhotoGallery
        styleId={componentInfo.style}
        theme="default"
        title={title}
        images={images}
      />
    </Section>
  );
};
