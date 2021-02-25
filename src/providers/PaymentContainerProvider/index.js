import React from 'react';
import { compose, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import {
  ContentContainer,
  PaymentBody,
} from '../../pages/PaymentPage/PaymentPageStyled';
import { PaymentMethod } from '../../components';
import {
  AnyCard, Certificate,
  MyCard,
  Visa,
} from '../../components/PaymentMethod/Cards/CardsContainer';
import { setBasketCard } from '../../store/actions/basket';
import { setPaymentSaveCard } from '../../store/actions/payment';

const compareNumeric = (a, b) => {
  if (a.order > b.order) return 1;
  if (a.order < b.order) return -1;
};

function PaymentContainerProviderView(componentInfo) {
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

  const cards = componentInfo.childrenList.sort(compareNumeric).map((card, number, cards) => {
    const cardProps = {
      image: false,
      label: false,
      standartCardPartnersImage: false,
      discount: false,
      description: false,
      textForInput: false,
      placeholder: false,
      buttonText: false,
    };

    if (card.name === 'payAnyCardItem') {
      if (findValue(card, 'name', 'standartCardImage')) {
        cardProps.image = findChildren(card, 'name', 'standartCardImage');
      }

      if (findValue(card, 'name', 'standartCardLabel')) {
        cardProps.label = findChildren(card, 'name', 'standartCardLabel');
      }

      if (findValue(card, 'name', 'standartCardPartnersImage')) {
        cardProps.standartCardPartnersImage = findChildren(card, 'name', 'standartCardPartnersImage');
      }

      return (
        <AnyCard
          linkingCard={componentInfo.setLinkingCard}
          image={cardProps.image.componentsDescription.source}
          label={cardProps.label.componentsDescription.value}
          standartCardPartnersImage={cardProps.standartCardPartnersImage}
          last={number === cards.length - 1}
          authed={componentInfo.user}
          type="any"
        />
      );
    }


    if (card.name !== 'payAnyCardItem' && card.name !== 'payByGiftCardItem') {
      if (findValue(card, 'typeName', 'image')) {
        cardProps.image = findChildren(card, 'typeName', 'image');
      }

      if (findValue(card, 'typeName', 'label')) {
        cardProps.label = findAllChildren(card, 'typeName', 'label')[0];
        cardProps.discount = findAllChildren(card, 'typeName', 'label')[1];
      }

      if (findValue(card, 'typeName', 'description')) {
        cardProps.description = findChildren(card, 'typeName', 'description');
      }


      return (
        <Visa
          image={cardProps.image.componentsDescription.source}
          label={cardProps.label.componentsDescription.value}
          discount={cardProps.discount.componentsDescription.value}
          description={cardProps.description.componentsDescription.value}
          type={card.componentsDescription.cardtype}
          last={number === cards.length - 1}
          visa
        />
      );
    }

    if (card.name === 'payByGiftCardItem') {
      if (findValue(card, 'typeName', 'image')) {
        cardProps.image = findChildren(card, 'typeName', 'image');
      }

      if (findValue(card, 'typeName', 'label')) {
        cardProps.label = findAllChildren(card, 'typeName', 'label')[0];
        cardProps.textForInput = findAllChildren(card, 'typeName', 'label')[1];
        cardProps.description = findAllChildren(card, 'typeName', 'label')[2];
      }

      if (findValue(card, 'typeName', 'textField')) {
        cardProps.placeholder = findChildren(card, 'typeName', 'textField');
      }

      if (findValue(card, 'typeName', 'button')) {
        cardProps.buttonText = findChildren(card, 'typeName', 'button');
      }


      return (
        <Certificate
          image={cardProps.image.componentsDescription.source}
          label={cardProps.label.componentsDescription.value}
          description={cardProps.description.componentsDescription.value}
          placeholder={cardProps.placeholder.componentsDescription.placeHolder}
          textForInput={cardProps.textForInput.componentsDescription.value}
          buttonText={cardProps.buttonText.componentsDescription.value}
          last={number === cards.length - 1}
          type={cardProps.label.componentsDescription.value}
        />
      );
    }
  });

  const MyCards = componentInfo.user && componentInfo.user.recurrent ? componentInfo.user.recurrent.map(item => (
    <MyCard
      cardNumber={item.cardNumber.slice(item.cardNumber.length - 4, item.cardNumber.length)}
      type={`recurrent-${item.id}`}
    />
  )) : [];

  return (
    <ContentContainer>
      <PaymentBody>
        <PaymentMethod
          theme="default"
          value={componentInfo.cardType}
        >
          { MyCards }
          { cards }
        </PaymentMethod>
      </PaymentBody>
    </ContentContainer>
  );
}

export default function (componentInfo) {
  const mapStateToProps = state => ({
    basket: state.basket,
    user: state.user.user,
    linkingCard: state.payment.saveCard,
  });

  const mapDispatchToProps = dispatch => ({
    setBasketCard: (name, id) => dispatch(setBasketCard(name, id)),
    setLinkingCard: (save) => dispatch(setPaymentSaveCard(save)),
  });
  const PaymentContainerProvider = compose(
    withState('cardType', 'setCardTypes', 'any'),
    withState('certificate', 'setCertificate', ''),
    withState('cardNumber', 'setCardNumber', '1111'),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(PaymentContainerProviderView);

  return <PaymentContainerProvider {...componentInfo} />;
}
