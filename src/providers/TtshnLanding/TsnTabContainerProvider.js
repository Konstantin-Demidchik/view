import React from 'react';
import { compose } from 'recompose';
import { TtshnLanding } from '../../components';

const TtshnTabContainer = (componentInfo) => {
  const { style, background, childrenList: list } = componentInfo;
  const props = {
    styleId: style,
    landing: null,
    items: null,
    background,
  };

  list.forEach((item) => {
    if (item.typeName === 'tabNavBlock') {
      props.items = item.childrenList;
      return true;
    }
    return true;
  });

  return (
    <TtshnLanding.TtshnTab
      items={props.items}
      background={props.background}
    />
  );
};

export default (componentInfo) => {
  const TtshnTabView = compose()(TtshnTabContainer);
  return <TtshnTabView {...componentInfo} />;
};
