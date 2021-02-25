import React from 'react';
import { HomeSlider, Slide } from '../../components';

/**
  Slide принимает следующие пропсы:
  1. theme - упарвляет цветом контента внутри слайда
  2. tag - строка, список жанров
  3. title - строка, название фильма
  4. backgroundImage - строка, ссылка на картинку
  5. backgroundVideo - строка, ссылка на видео
  6. btnTitle - строка, название кнопки
  7. url - строка, ссылка по которой ведет кнопка
 */

export default function HomeSliderProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const slides = list.map((banner) => {
    const props = {
      theme: 'dark',
      tag: null,
      title: null,
      backgroundImage: null,
      backgroundVideo: null,
      btnTitle: null,
      url: null,
      key: null,
      buttonStyle: null,
      labelStyle: null,
      tagStyle: null,
    };

    if (banner.typeName !== 'bannerItem') return false;

    props.theme = findValue(banner, 'theme');

    banner.childrenList.forEach((child) => {
      if (child.typeName === 'tag') {
        props.tagStyle = child.style;
        props.tag = findValue(child, 'value');
        return true;
      }
      if (child.typeName === 'label') {
        props.labelStyle = child.style;
        props.title = findValue(child, 'value');
        return true;
      }
      if (child.typeName === 'video') {
        props.labelStyle = child.style;
        props.backgroundVideo = findValue(child, 'source');
        return true;
      }
      if (child.typeName === 'image') {
        props.labelStyle = child.style;
        props.backgroundImage = findValue(child, 'source');
        return true;
      }
      if (child.typeName === 'button') {
        props.buttonStyle = child.style;
        props.url = findValue(child, 'link');
        props.btnTitle = findValue(child, 'value');
        return true;
      }
      return true;
    });

    return <Slide {...props} />;
  });

  return (
    <HomeSlider styleId={style}>
      {slides}
    </HomeSlider>
  );
}
