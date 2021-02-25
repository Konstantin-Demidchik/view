import React from 'react';
import {
  SectionContainer,
  InfoItem,
  InfoImageContainer,
  SliderContainer,
  InfoContentContainer,
  InfoContent,
} from '../../pages/Career/CareerStyled';
import { Text, VerticalSlider, Description } from '../../components';

/**
 InfoPatternSliderProvider принимает следующие props: icon, placeholder, buttonText, onButtonClick.
 1. title - заголовок
 2. body - текст
 3. background - фон
 4. images - картинки слайдера
 */

export default function InfoPatternSliderProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    title: null,
    children: null,
    images: [],
    background: null,
    styleId: style,
  };

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };
  props.background = componentInfo.background;

  list.forEach((item) => {
    if (item.typeName === 'photoVerticalSlider') {
      item.childrenList.forEach((af) => {
        if (af.typeName === 'image') {
          props.images.push ({ src: (findValue(af, 'source')) });
          return true;
        }
        return true;
      });
      return true;
    }
    if (item.typeName === 'description') {
      props.children = findValue(item, 'value');
      return true;
    }
    if (item.typeName === 'label') {
      props.title = findValue(item, 'value');
      return true;
    }
    return true;
  });

  return (
    <SectionContainer background={props.background}>
      <InfoItem>
        <InfoImageContainer>
          <SliderContainer>
            <VerticalSlider
              theme="default"
              images={props.images}
            />
          </SliderContainer>
        </InfoImageContainer>
        <InfoContentContainer>
          <Text h2>{props.title}</Text>
          <InfoContent>
            <Description {...props} />
          </InfoContent>
        </InfoContentContainer>
      </InfoItem>
    </SectionContainer>
  );
}
