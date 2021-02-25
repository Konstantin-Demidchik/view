/**
 * Provider
 * Описание: Провайдер страницы после оплаты
 * Пример: /order/4B1019459736FD056206FD344768DC80
 * Ключевые слова: оплата, assistOrder, ассист орде
 */

import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import styled, { css } from 'styled-components';
import { getWindow } from '../../core/functions/browser';
import {
  Summary,
  SummaryContainer,
} from '../../pages/PaymentPage/PaymentPageStyled';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { colors, screens } from '../../styles/variables';

const TextLabel = styled.div`
  font-size: 0.875em;
  margin: 15px 0;

   &>span{
    margin: 15px 0;
   }

  ${props => props.last && css`
    margin: 0px 0;
     &>span{
      margin: 0px 0;
     }
  `}
  ${props => props.beforeLast && css`
    margin-bottom: 0px;
     &>span{
      margin-bottom: 0px;
     }
  `}

   &:nth-last-child(1){
    margin-bottom: 0;
  }

  &:nth-last-child(1)>span{
    margin-bottom: 0;
  }

  &:nth-last-child(2){
    margin-bottom: 0;
  }

  &:nth-last-child(2)>span{
    margin-bottom: 0;
  }
`;

export const ButtonWrapper = styled.div`
  width: calc(100% - 30px);
  margin: 15px;
  margin-top: 25px;

  & > * {
    width: auto;

    @media (max-width: ${screens.screen_xs_max}) {
      font-size: 0.875em;
    }
  }

  @media (max-width: ${screens.screen_sm_max}) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 20px 30px 20px 30px;
    margin: 0;
    margin-top: 15px;
    border-top: 1px solid ${colors.color_white_t_3};
    background: ${colors.color_gray_dark_t};
    z-index: 5;
  }
`;

export const SummaryText = styled.div`
  font-size: 0.875em;
  margin: 15px 0;
  & > *:first-child {
    margin-right: 10px;
  }
  & > *:last-child {
    margin-left: 4px;
    font-size: 1.25em;
  }
`;

export default function (componentInfo) {
  function AsideProviderView(props) {
    const propsNew = {
      title: false,
      resultLabelSum: false,
      paid: false,
      otherText: false,
      description: false,
    };

    const findValue = (comp, fieldName, value) => {
      for (let item = 0; item < comp.childrenList.length; item++) {
        if (comp.childrenList[item][fieldName] === value) {
          return comp.childrenList[item][fieldName];
        }
      }
      return null;
    };

    const findChildren = (comp, fieldName, value) => {
      for (let item = 0; item < comp.childrenList.length; item++) {
        if (comp.childrenList[item][fieldName] === value) {
          return comp.childrenList[item];
        }
      }
      return null;
    };

    const findAllChildren = (comp, fieldName, value) => {
      const childrens = [];
      for (let item = 0; item < comp.childrenList.length; item++) {
        if (comp.childrenList[item][fieldName] === value) {
          childrens.push(comp.childrenList[item]);
        }
      }
      return childrens;
    };


    if (findValue(componentInfo, 'typeName', 'label')) {
      propsNew.title = findAllChildren(componentInfo, 'typeName', 'label')[0].componentsDescription.value;
      propsNew.paid = findAllChildren(componentInfo, 'typeName', 'label')[1].componentsDescription.value;
      const otherText = findAllChildren(componentInfo, 'typeName', 'label');
      otherText.shift();
      otherText.shift();
      propsNew.otherText = otherText;
    }

    if (findValue(componentInfo, 'typeName', 'description')) {
      propsNew.description = findChildren(componentInfo, 'typeName', 'description').componentsDescription.value;
    }

    if (findValue(componentInfo, 'typeName', 'button')) {
      propsNew.button = findChildren(componentInfo, 'typeName', 'button');
    }

    return (
      <SummaryContainer payment>
        <Summary>
          <Text h4 style={{ fontSize: '1.375em' }}>{propsNew.title ? propsNew.title : '' }</Text>
          {(propsNew.paid) && (
            <SummaryText>
              <Text>{propsNew.paid ? propsNew.paid.replace('.', ',') : ''}</Text>
            </SummaryText>
          )}
          {(propsNew.otherText) && (
            <React.Fragment>
              {(propsNew.otherText.map((label, index) => (
                <TextLabel
                  last={index === (propsNew.otherText.length - 1)}
                  beforeLast={index === (propsNew.otherText.length - 2)}
                >
                  <Text gray>{(label.componentsDescription && label.componentsDescription.value) ? label.componentsDescription.value : ''}</Text>
                </TextLabel>
              )))}
            </React.Fragment>
          )}

          {propsNew.button && (
            <ButtonWrapper>
              <Button
                filled
                onClick={() => {
                  getWindow().open(propsNew.button.componentsDescription.link, '_blank');
                }}
              >
                {propsNew.button.componentsDescription.value ? propsNew.button.componentsDescription.value : ''}
              </Button>
            </ButtonWrapper>
          )}
          <TextLabel>
            <Text gray>{propsNew.description ? propsNew.description : ''}</Text>
          </TextLabel>
        </Summary>
      </SummaryContainer>
    );
  }
  const AsideContainerProvider = compose()(AsideProviderView);

  return <AsideContainerProvider {...componentInfo} />;
}
