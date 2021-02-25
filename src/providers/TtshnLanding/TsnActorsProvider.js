import React from 'react';

import { TtshnLanding } from '../../components';

export default function TsnActorsProvider(componentInfo) {
  const {
    background,
    componentsDescription,
    childrenList,
  } = componentInfo;

  const actorsList = childrenList.map((item) => ({
      firstTitle: item.componentsDescription ? item.componentsDescription.firstTitle : '',
      secondTitle: item.componentsDescription ? item.componentsDescription.secondTitle : '',
      image: item.componentsDescription ? item.componentsDescription.source : '',
  }));
  return (
    <TtshnLanding.Actors
      backgroundActors={background}
      title={componentsDescription && componentsDescription.title}
      actors={actorsList}
    />
  );
}
