import React from 'react';
import styled, { css } from 'styled-components';
import { isStringPixels } from '../../core/functions/semantics';
import { colors } from '../../styles/variables';
import { Button } from '../../components';

const ButtonInfo = styled.a`
  color: inherit !important;
  &:hover {
    color: ${colors.color_white};
  }
  ${props => props.secondary && css`
    color: ${colors.color_white_t} !important;

    &:hover {
      color: ${colors.color_black} !important;
    }
  `}

  ${props => (props.styleId === 2) && css`
    color: ${colors.color_white_t} !important;

    &:hover {
      color: ${colors.color_black} !important;
    }
  `}

  ${props => props.navigationMainLinkItem && css`
    color: ${colors.color_alt};

    &:hover {
      color: ${colors.color_primary_t};
    }
  `}

`;

const ButtonContainer = styled.div`
${props => isStringPixels(props.marginTop) && css`
  margin-top: ${props.marginTop};
`}

${props => isStringPixels(props.marginBottom) && css`
  margin-bottom: ${props.marginBottom};
`}
${props => props.center && css`
  max-width: fit-content;
  margin: 0 auto;
`}
`;

export default function ButtonProvider(componentInfo) {
  const { style } = componentInfo;
  const props = {
    value: null,
    link: null,
    key: null,
    styleId: style,
    primary: null,
    marginBottom: null,
    marginTop: null,
    center: null,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription) {
      if (fieldName in comp.componentsDescription) {
        return comp.componentsDescription[fieldName];
      }
      return null;
    }

    return null;
  };
  props.link = findValue(componentInfo, 'link');
  props.value = findValue(componentInfo, 'value');
  props.key = findValue(componentInfo, 'key');
  props.primary = findValue(componentInfo, 'primary');
  props.marginTop = findValue(componentInfo, 'marginTop');
  props.marginBottom = findValue(componentInfo, 'marginBottom');
  props.center = findValue(componentInfo, 'center');

  return (
    <ButtonContainer marginBottom={props.marginBottom} marginTop={props.marginTop} center={props.center}>
      <ButtonInfo styleId={props.styleId} href={props.link}>
        <Button primary={props.primary} styleId={props.styleId} icon={props.key}>{props.value}</Button>
      </ButtonInfo>
    </ButtonContainer>
  );
}
