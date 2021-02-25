import React from 'react';

import {
  TabContent,
  TabPane,
  MoviesRoller,
} from '../../components';
import FilmPatternContainerProvider from '../FilmPatternContainerProvider';

export default function MovieRollerProvider(componentInfo, activeTabId, movies, event) {
  const { style, childrenList: list } = componentInfo;
  let emptyFilmPattern;

  const data = componentInfo.childrenList.map((component) => {
    if (component.typeName === 'filmPattern') {
      return FilmPatternContainerProvider(component, activeTabId, movies, event);
    }
    if (component.typeName === 'emptyFilmPattern') {
      emptyFilmPattern = component;
      return null;
    }
  }).filter(item => !!item);

  return (
    <TabContent activeTabId={activeTabId} styleId={style}>
      <TabPane tabId={activeTabId}>
        <MoviesRoller
          emptyFilmPattern={emptyFilmPattern}
          activeTabId={activeTabId}
          // setTomorrow={setTomorrow}
        >
          {data}
        </MoviesRoller>
      </TabPane>
    </TabContent>
  );
}
