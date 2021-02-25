import React from 'react';
import { MapInfo } from '../../components';

export default function MapInfoProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;

  const props = {
    mapView: null,
    text: null,
    subtitle: null,
    styleSubtitle: null,
    styleText: null,
    styleId: style,
    mapContainerStyle: null,
  };

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  props.mapView = findValue(componentInfo, 'source');
  list.forEach((item) => {
    if (item.typeName === 'infoContainer') {
      props.mapContainerStyle = item.style;
      item.childrenList.forEach((info) => {
        if (info.typeName === 'label') {
          // eslint-disable-next-line react/prop-types
          if (props.subtitle === null) {
            props.styleSubtitle = item.style;
            props.subtitle = findValue(info, 'value');
          } else {
            props.styleText = info.style;
            props.text = findValue(info, 'value');
          }
        }
      });
    }
    return true;
  });

  return (
    <MapInfo {...props} className="mapInfo" />
  );
}
