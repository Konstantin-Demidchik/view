import React from 'react';
import { CareerDoublePatternInfo } from '../../components';

export default function DoublePatternInfoProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const props = {
    data: [],
    styleId: style,
  };

  list.forEach((item) => {
    const content = {
      video: null,
      videoImage: null,
      videoName: null,
      title: null,
      description: null,
      button: {
        link: null,
        value: null,
      },
      image: null,
      imageText: null,
      social: [],
      paddingBottom: null,
      paddingTop: null,
    };
    item.childrenList.forEach((el) => {
      props.paddingBottom = findValue(item, 'paddingBottom');
      props.paddingTop = findValue(item, 'paddingTop');
      el.childrenList.forEach((element) => {
        if (element.typeName === 'video') {
          content.video = findValue(element, 'source');
          content.videoImage = findValue(element, 'image');
          content.videoName = findValue(element, 'value');
          return true;
        }
        if (element.typeName === 'image') {
          content.image = findValue(element, 'source');
          return true;
        }
        if (element.typeName === 'label') {
          content.title = findValue(element, 'value');
          return true;
        }
        if (element.typeName === 'description') {
          if (el.childrenList[0].typeName === 'video') {
            content.imageText = findValue(element, 'value');
          } else {
            content.description = findValue(element, 'value');
          }
          return true;
        }
        if (element.typeName === 'button') {
          content.button.value = findValue(element, 'value');
          content.button.link = findValue(element, 'link');
          return true;
        }
        if (element.typeName === 'icon') {
          const icon = {
            link: findValue(element, 'link'),
            source: findValue(element, 'key'),
          };
          content.social.push(icon);
          return true;
        }
        return true;
      });
    });
    props.data.push(content);
  });

  return (
    <CareerDoublePatternInfo {...props} />
  );
}
