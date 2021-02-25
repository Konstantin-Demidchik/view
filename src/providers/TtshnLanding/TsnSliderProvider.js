import React from 'react';

import { TtshnLanding } from '../../components';

export default function TsnSliderProvider(componentInfo) {
  const {
    background,
    componentsDescription,
  } = componentInfo;

  if (componentsDescription) {
    return (
      <TtshnLanding.Slider
        backgroundSlider={background}
        buttonText={componentsDescription.buttonText}
        descriptionTitleImage={componentsDescription.image}
        videoLink={componentsDescription.source}
        titleImage={componentsDescription.titleImage}
        text={componentsDescription.value}
        buttonLink={componentsDescription.link}
        imageLink={componentsDescription.imageLink}
        maxWidth={componentsDescription.width}
        type={componentsDescription.type}
      />
    );
  }
  return null;
}
