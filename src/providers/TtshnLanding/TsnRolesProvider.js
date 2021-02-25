import React from 'react';

import { TtshnLanding } from '../../components';

export default function TsnRolesProvider(componentInfo) {

  const {
    background,
    componentsDescription,
    childrenList,
  } = componentInfo;

  const actorsList = childrenList.map((list) => {
    let resultList = null;
    if (list.typeName === 'TsnRolesList') {
      resultList = list.childrenList.map((item) => {
        if (item.typeName === 'TsnRoleItem') {
          return item.componentsDescription ? item.componentsDescription.value : '';
        }
      })
    }
    return resultList;
  })
  return (
    <TtshnLanding.Roles
      backgroundRoles={background}
      title={componentsDescription && componentsDescription.title}
      poster={componentsDescription && componentsDescription.image}
      actors={actorsList}
    />
  );
}
