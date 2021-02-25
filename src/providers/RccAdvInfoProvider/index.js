import React from 'react';
import styled from 'styled-components';
import { RccAdvInfo } from '../../components';

export const Container = styled.div`

  a {
    color: #1c9cdf;
    cursor: pointer;
    border: none;
    text-decoration: none;
    transition: .2s;
    outline: 0;
  }
  a:hover {
    color: #d40754;
  }
`;

export default function RccAdvInfoProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    children: null,
    image: null,
    reverse: null,
    styleId: style,
    last: null,
    first: null,
    label: null,
    align: null,
  };

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  props.first = JSON.parse(findValue(componentInfo, 'first'));
  props.last = JSON.parse(findValue(componentInfo, 'last'));
  props.reverse = JSON.parse(findValue(componentInfo, 'reverse'));
  list.forEach((item) => {
    if (item.typeName === 'label') {
      props.label = (findValue(item, 'value'));
      props.styleId = item.style;
      return true;
    }
    if (item.typeName === 'image') {
      props.image = (findValue(item, 'source'));
      return true;
    }
    if (item.typeName === 'description') {
      props.children = (findValue(item, 'value'));
      props.align = (findValue(item, 'align'));
      return true;
    }
    return true;
  });

  return (
    <Container>
      <RccAdvInfo {...props} />
    </Container>
  );
}
