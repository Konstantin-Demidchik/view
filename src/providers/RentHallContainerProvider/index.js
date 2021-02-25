import React from 'react';
import { RentHallContainer } from '../../components';

export default function RentHallContainerProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    image: null,
    name: null,
    styleName: null,
    address: null,
    styleAddress: null,
    info: null,
    styleInfo: null,
    mapsUrl: null,
    icon: null,
    styleId: style,
  };

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  list.forEach((item) => {
    if (item.typeName === 'image') {
      if (props.icon === null) {
        props.icon = findValue(item, 'source');
      } else {
        props.image = findValue(item, 'source');
      }
      return true;
    }
    if (item.typeName === 'label') {
      props.styleName = item.style;
      props.name = findValue(item, 'value');
      return true;
    }
    if (item.typeName === 'description') {
      if (props.address === null) {
        props.styleAddress = item.style;
        props.address = findValue(item, 'value');
      } else {
        props.styleInfo = item.style;
        props.info = findValue(item, 'value');
      }
      return true;
    }
    if (item.typeName === 'iframe') {
      props.mapsUrl = findValue(item, 'source');
    }
    return true;
  });


  return (
    <RentHallContainer {...props} />
  );
}
