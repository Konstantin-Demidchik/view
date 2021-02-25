import React from 'react';

import { Image } from '../../components';
import { getStylesByCamelList } from '../../core/functions/styles';


export default function ImageProvider(componentInfo) {
  const { style, componentsDescription } = componentInfo;
  const props = {
    source: null,
    styleId: style,
    width: null,
    height: null,
    center: null,
    styles: '',
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };
  props.source = findValue(componentInfo, 'source');
  props.width = findValue(componentInfo, 'width');
  props.height = findValue(componentInfo, 'height');
  props.center = findValue(componentInfo, 'center');

  if (props.center === 'true') props.center = true;
  props.styles = getStylesByCamelList(componentsDescription);

  return (
    <Image
      assetPath={props.source}
      styleId={props.styleId}
      width={props.width}
      height={props.height}
      center={props.center}
      styles={props.styles}
    />
  );
}
