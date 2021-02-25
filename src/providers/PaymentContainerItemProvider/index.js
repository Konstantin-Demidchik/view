import React from 'react';
import {
  ButtonWrapper,
  CertificateInfo, ContentContainer,
  PaymentBody,
  Summary,
  SummaryCertificate, SummaryCertificateClose,
  SummaryContainer,
  SummaryText
} from "../../pages/PaymentPage/PaymentPageStyled";
import {PaymentMethod} from "../../components";
import {
  AnyCard, Certificate,
  MyCard,
  VisaGold,
  VisaInfinite,
  VisaPlatinum
} from "../../components/PaymentMethod/Cards/CardsContainer";
import BasketTickets from "../../components/Booking/BasketTickets/BasketTicketsContainer";
import BasketTicket from "../../components/Booking/BasketTickets/BasketTicketView";
import Text from "../../components/Text";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import getHistory from '../../core/functions/global-history';
import {compose, withState} from "recompose";
import { connect } from 'react-redux';
import {providerByComponentTitle} from "../index";


export default function PaymentContainerItemProviderView(componentInfo) {

  const props = {

  }

  const findValue = (comp, fieldName, value) => {
    for (let item = 0; item < comp.childrenList.length; item++) {
      if (comp.childrenList[item][fieldName] === value) {
        return comp.childrenList[item][fieldName];
      }
    }
    return null;
  };


  return (
      <PaymentMethod
          theme="default"
          value={props.cardType}
        >
      </PaymentMethod>
  );
}

export default function (componentInfo) {
  const mapStateToProps = state => ({
  });

  const mapDispatchToProps = dispatch => ({
  });

  const PaymentContainerItemProvider = compose(
    withState('cardType', 'setCardType', 'Any card'),
    withState('linkingCard', 'setLinkingCard', false),
    withState('certificate', 'setCertificate', ''),
    withState('cardNumber', 'setCardNumber', '1111'),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(PaymentContainerItemProviderView);

  return <PaymentContainerItemProvider {...componentInfo} />;
}
