/* eslint-disable import/no-cycle */
import React from 'react';
import { CinemaProperty } from '../../components';

export default function CinemaPropertyView(componentInfo) {
  const getProperties = component => component.childrenList.reduce((obj, item) => {
    const newObj = { ...obj };
    newObj[item.typeName] = {
      ...item.componentsDescription,
    };
    return newObj;
  }, {});

  const getCinemaPropertyChildren = component => component
    .childrenList.map(cinemaProperty => getProperties(cinemaProperty));

  const cinemaPropertyChildren = getCinemaPropertyChildren(componentInfo);
  return (<CinemaProperty childrenList={cinemaPropertyChildren} />);
}
