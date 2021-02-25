import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { BannerItem } from '../../components';
import { providerByComponentTitle } from '../index';
import LabelProvider from '../LabelProvider';
import { colors, screens, themes } from '../../styles/variables';
import { getWindow } from '../../core/functions/browser';

const TagContainer = styled.div`
    margin: 18px 0;
    color: ${colors.color_gray_light_t};
    text-transform: uppercase;
`;

const ButtonWrapper = styled.div`
    margin-top: 30px;
    & > div > a > button {
      font-weight: 700!important;
    }
`;

export default function BannerItemProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const props = {
    background: null,
    text: null,
    textStyle: null,
    btnText: null,
    btnTextStyle: null,
    styleId: style,
    theme: 'dark',
    showShadow: false,
    url: null,
    gradient: null,
    description: null,
    descStyle: null,
    buttonLink: null,
    buttonValue: null,
    h1Tag: null,
  };


  props.gradient = findValue(componentInfo, 'gradient');
  props.background = componentInfo.background;
  props.theme = findValue(componentInfo, 'theme');
  props.showShadow = findValue(componentInfo, 'showShadow');
  props.movieDark = findValue(componentInfo, 'movieDark');

  const aside = list.map((component) => {
    if (component.typeName === 'label') {
      props.h1Tag = true;
      return LabelProvider(component, props.h1Tag);
    }

    if (component.typeName === 'tag') {
      return (
        <TagContainer>
          {providerByComponentTitle('label')(component)}
        </TagContainer>
      );
    }
    if (component.typeName === 'description') {
      return providerByComponentTitle(component.typeName)(component);
    }
    if (getWindow().location) {
      if (component.typeName === 'button' && getWindow().location.pathname.indexOf('afisha') >= 0) {
        props.buttonLink = findValue(component, 'link');
        props.buttonValue = findValue(component, 'value');
      } else {
        return (
          <ButtonWrapper>
            {providerByComponentTitle(component.typeName)(component)}
          </ButtonWrapper>
        );
      }
    }

    return null;
  });

  const mapStateToProps = state => ({
    movies: state.movies,
  });

  const BannerItemWithConnect = compose(
    connect(
      mapStateToProps,
      null,
    ),
  )(BannerItem);

  return (
    <BannerItemWithConnect {...props} aside={aside} />
  );
}
