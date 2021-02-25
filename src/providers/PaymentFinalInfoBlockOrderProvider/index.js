import React from 'react';
import { compose } from 'recompose';

import BasketTicket from '../../components/Booking/BasketTickets/BasketTicketView';

/**
 * Провайдер для отображения заказов
*/

function PaymentFinalInfoBlockProviderView(componentInfo) {

  const props = {
    orderFinalInfoBlockImage: false,
    orderFinalInfoBlockImageType: false,
    orderFinalInfoBlockImageMode: false,
    orderFinalInfoBlockImageLink: false,
    orderFinalInfoBlockLabel1: false,
    orderFinalInfoBlockLabel1Value: false,
    orderFinalInfoBlockLabel2: false,
    orderFinalInfoBlockLabel2Value: false,
    orderFinalInfoBlockSumLabel: false,
    orderFinalInfoBlockSumLabelValue: false,
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

  /**
   * Находит значения в componentsDescription в компоненте по указанному полю"
   * @param {Object} comp - компонент, в котором происходит поиск значения по указанному полю
   * @param {fieldName} fieldName - поле в componentsDescription
   * @returns {any} - результат поиска
   */

  const findComponentsDescriptionValue = (comp, fieldName) => {
    if (comp.componentsDescription) {
      if (comp.componentsDescription[fieldName] || comp.componentsDescription[fieldName] === 0) {
        return comp.componentsDescription[fieldName];
      }
    }
    return false;
  };

  if (findValue(componentInfo, 'name', 'orderFinalInfoBlockImage')) {
    props.orderFinalInfoBlockImage = findChildren(componentInfo, 'name', 'orderFinalInfoBlockImage');
    props.orderFinalInfoBlockImageType = findComponentsDescriptionValue(props.orderFinalInfoBlockImage, 'type');
    props.orderFinalInfoBlockImageMode = findComponentsDescriptionValue(props.orderFinalInfoBlockImage, 'mode');
    props.orderFinalInfoBlockImageLink = findComponentsDescriptionValue(props.orderFinalInfoBlockImage, 'link');
  }

  if (findValue(componentInfo, 'name', 'orderFinalInfoBlockLabel1')) {
    props.orderFinalInfoBlockLabel1 = findChildren(componentInfo, 'name', 'orderFinalInfoBlockLabel1');
    props.orderFinalInfoBlockLabel1Value = findComponentsDescriptionValue(props.orderFinalInfoBlockLabel1, 'value');
  }

  if (findValue(componentInfo, 'name', 'orderFinalInfoBlockLabel2')) {
    props.orderFinalInfoBlockLabel2 = findChildren(componentInfo, 'name', 'orderFinalInfoBlockLabel2');
    props.orderFinalInfoBlockLabel2Value = findComponentsDescriptionValue(props.orderFinalInfoBlockLabel2, 'value');
  }

  if (findValue(componentInfo, 'name', 'orderFinalInfoBlockSumLabel')) {
    props.orderFinalInfoBlockSumLabel = findChildren(componentInfo, 'name', 'orderFinalInfoBlockSumLabel');
    props.orderFinalInfoBlockSumLabelValue = findComponentsDescriptionValue(props.orderFinalInfoBlockSumLabel, 'value');
  }

  let session = {};
  for (const event in componentInfo.basket) {
    session = componentInfo.basket[event];
  }

  if (props.orderFinalInfoBlockImageMode === 0) {
    const copyOrderListInfo = [...componentInfo.orderListInfo];
    copyOrderListInfo.push({
      type: props.orderFinalInfoBlockImageType,
      place: props.orderFinalInfoBlockLabel1Value ? props.orderFinalInfoBlockLabel1Value.slice(props.orderFinalInfoBlockLabel1Value.indexOf('/') + 1,
        props.orderFinalInfoBlockLabel1Value.length) : '',
      row: props.orderFinalInfoBlockLabel1Value ? props.orderFinalInfoBlockLabel1Value.slice(0, props.orderFinalInfoBlockLabel1Value.indexOf('/')) : '',
      mode: 0,
      price: props.orderFinalInfoBlockSumLabelValue || '',
      products: componentInfo.products,
    })
    componentInfo.setOrderListInfo(copyOrderListInfo);
    return (
      <BasketTicket
        theme="default"
        type={props.orderFinalInfoBlockImageType || ''}
        place={props.orderFinalInfoBlockLabel1Value ? props.orderFinalInfoBlockLabel1Value.slice(props.orderFinalInfoBlockLabel1Value.indexOf('/') + 1,
          props.orderFinalInfoBlockLabel1Value.length) : ''}
        row={props.orderFinalInfoBlockLabel1Value ? props.orderFinalInfoBlockLabel1Value.slice(0, props.orderFinalInfoBlockLabel1Value.indexOf('/')) : ''}
        ticket={{ mode: 0 }}
        price={props.orderFinalInfoBlockSumLabelValue || ''}
        image={props.orderFinalInfoBlockImage}
        products={componentInfo.products}
        icon={componentInfo.products}
      />
    );
  }

  const ticket = {
    mode: props.orderFinalInfoBlockImageMode || '',
    type: props.orderFinalInfoBlockImageType || null,
    quantity: props.orderFinalInfoBlockLabel2Value || null,
    name: props.orderFinalInfoBlockLabel1Value || null,
  };

  if (props.orderFinalInfoBlockImageMode === 1) {
    const copyOrderListInfo = [...componentInfo.orderListInfo];
    copyOrderListInfo.push({
      type: props.orderFinalInfoBlockImageType,
      ticket: ticket,
      price: props.orderFinalInfoBlockSumLabelValue || '',
      products: componentInfo.products,
      row: props.orderFinalInfoBlockLabel1,
    })
    componentInfo.setOrderListInfo(copyOrderListInfo);
    return (
      <BasketTicket
        theme="default"
        type={props.orderFinalInfoBlockImageType || ''}
        ticket={ticket}
        price={props.orderFinalInfoBlockSumLabelValue || ''}
        image={props.orderFinalInfoBlockImageLink || ''}
        products={componentInfo.products}
        row={props.orderFinalInfoBlockLabel1}
        icon={componentInfo.products}
      />
    );
  }
}

export default function (componentInfo, {}, eventList) {
  const PaymentFinalInfoBlockProvider = compose()(PaymentFinalInfoBlockProviderView);

  return <PaymentFinalInfoBlockProvider {...componentInfo} {...eventList} />;
}
