import React from 'react';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { providerByComponentTitle } from '..';
import styled from 'styled-components';
import { API_GET_INFO_PRODUCTS } from '../../core/rest/paths';
import { get } from '../../core/rest';
import { screens } from '../../styles/variables';
import { getWindow } from '../../core/functions/browser';

const OrderList = styled.div`
  @media (max-width: ${screens.screen_md_min}) {
    margin-top: 25px;
  }
`;


function OrderListProviderView(componentInfo) {
  const params = queryString.parse(getWindow().location.pathname);
  return (
    <OrderList>
      {componentInfo.data}
    </OrderList>
  );
}

export default function (componentInfo, movies, eventsList) {
  const mapStateToProps = state => ({
    basket: state.basket,
  });

  const mapDispatchToProps = dispatch => ({
  });

  const OrderListProvider = compose(
    withState('products', 'setProducts', false),
    withState('data', 'setData', ''),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
    lifecycle({
      componentWillMount() {
        const data = componentInfo.childrenList.map((component) => {
          const { typeName } = component;
          return providerByComponentTitle(typeName)(
            component,
            {},
            {
              setPayment: () => this.props.setPayment(),
              ...eventsList,
            },
          );
        }).filter(item => !!item);
        this.props.setData(data);
        const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');
        get(`${API_GET_INFO_PRODUCTS}${params.showID}`, {}, (res) => {

          this.props.setProducts(res);
        },
        (err) => {
          console.log('ERROR', err.response);
        });
      },
    }),
  )(OrderListProviderView);

  return <OrderListProvider {...componentInfo} />;
}
