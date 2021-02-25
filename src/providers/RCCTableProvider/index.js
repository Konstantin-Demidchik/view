import React from 'react';

import RccStartTable from './rccStartTable';
import RccClubTable from './rccClubTable';

const getProperties = component => component.childrenList.reduce((obj, item) => {
  const newObj = { ...obj };
  if (newObj[item.typeName]) {
    newObj[`${item.typeName}1`] = {
      style: item.style,
      background: item.background,
      ...item.componentsDescription,
    };
    return newObj;
  }
  newObj[item.typeName] = {
    style: item.style,
    background: item.background,
    ...item.componentsDescription,
  };
  return newObj;
}, {});

const getCells = component => component.childrenList.map(item => ({
  style: item.style,
  background: item.background,
  ...item.componentsDescription,
  children: getProperties(item),
}));

const getRows = component => component.childrenList.map(item => ({
  style: item.style,
  background: item.background,
  ...item.componentsDescription,
  children: getCells(item),
}));

const getColumns = (content) => {
  const columns = [];
  content.forEach((item, parentIndex) => {
    item.children.forEach((child, index) => {
      if (columns[index]) columns[index][parentIndex] = child;
      else columns[index] = [child];
    });
  });
  return columns;
};

export const RCCStartTableProvider = (componentInfo) => {
  const content = getRows(componentInfo);
  const columns = getColumns(content);
  const description = columns.splice(0, 1);
  return <RccStartTable columns={columns} description={description} />;
};

export const RCCClubTableProvider = (componentInfo) => {
  const content = getRows(componentInfo);
  const columns = getColumns(content);
  const description = columns.splice(0, 1);
  return <RccClubTable columns={columns} description={description} />;
};
