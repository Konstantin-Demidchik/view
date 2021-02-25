import React from 'react';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { BasketTickets } from '../../components';
import BasketTicket from '../../components/Booking/BasketTickets/BasketTicketView';
import { API_GET_INFO_PRODUCTS } from '../../core/rest/paths';
import { get } from '../../core/rest';
import { getWindow } from '../../core/functions/browser';

function PaymentFinalInfoBlockProviderView(componentInfo) {
  const props = {
    paymentFinalInfoBlockImage: false,
    paymentFinalInfoBlockLabel1: false,
    paymentFinalInfoBlockLabel2: false,
    paymentFinalInfoBlockSumLabel: false,
  };

  const findValue = (comp, fieldName, value) => {
    for (let item = 0; item < comp.childrenList.length; item++) {
      if (comp.childrenList[item][fieldName] === value) {
        return comp.childrenList[item][fieldName];
      }
    }
    return null;
  };

  if (findValue(componentInfo, 'name', 'paymentFinalInfoBlockImage')) {
    props.paymentFinalInfoBlockImage = !!findValue(componentInfo, 'name', 'paymentFinalInfoBlockImage');
  }

  if (findValue(componentInfo, 'name', 'paymentFinalInfoBlockLabel1')) {
    props.paymentFinalInfoBlockLabel1 = !!findValue(componentInfo, 'name', 'paymentFinalInfoBlockLabel1');
  }

  if (findValue(componentInfo, 'name', 'paymentFinalInfoBlockLabel2')) {
    props.paymentFinalInfoBlockLabel2 = !!findValue(componentInfo, 'name', 'paymentFinalInfoBlockLabel2');
  }

  if (findValue(componentInfo, 'name', 'paymentFinalInfoBlockSumLabel')) {
    props.paymentFinalInfoBlockSumLabel = !!findValue(componentInfo, 'name', 'paymentFinalInfoBlockSumLabel');
  }

  let session = {};
  for (const event in componentInfo.basket) {
    session = componentInfo.basket[event];
  }

  return (
    <BasketTickets>
      {session.checkContent && session.checkContent.map(ticket => (
        <BasketTicket
          theme="default"
          type={props.paymentFinalInfoBlockLabel1 ? ticket.typeSeat : ''}
          place={props.paymentFinalInfoBlockLabel1 ? ticket.name.slice(ticket.name.indexOf('/') + 1, ticket.name.length) : ''}
          row={props.paymentFinalInfoBlockLabel2 ? ticket.name.slice(0, ticket.name.indexOf('/')) : ''}
          price={props.paymentFinalInfoBlockSumLabel ? ticket.grossSumForOne.toFixed(2) : ''}
          image={props.paymentFinalInfoBlockImage}
          ticket={ticket}
          BYN
          products={componentInfo.products}
        />
      ))}
    </BasketTickets>
  );
}

export default function (componentInfo) {
  const mapStateToProps = state => ({
    basket: state.basket,
  });

  const mapDispatchToProps = dispatch => ({
  });

  const PaymentFinalInfoBlockProvider = compose(
    withState('products', 'setProducts', false),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
    lifecycle({
      componentWillMount() {
        const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');
        get(`${API_GET_INFO_PRODUCTS}${params.showID}`, {}, (res) => {
          this.props.setProducts(res);
        },
        (err) => {
          console.log('ERROR', err.response);
        });
      },
    }),
  )(PaymentFinalInfoBlockProviderView);

  return <PaymentFinalInfoBlockProvider {...componentInfo} />;
}
