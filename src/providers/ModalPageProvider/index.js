import React from 'react';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import queryString from 'query-string';
import ModalPage from '../../components/ModalPage/ModalPageContainer';
import { removeParam } from '../../core/functions/checkURL';
import { DEFAULT_TIME } from '../../store/actions/actionsTypes';
import { getWindow } from '../../core/functions/browser';
import { del } from '../../core/rest/index';
import { API_DELETE_BASKET } from '../../core/rest/paths';
import { TOKEN, authTokenObject } from '../../core/configs/tokens';

import { providerByComponentTitle } from '..';
import { findCheckContent, findCheck, findCheckId } from '../../core/functions/hall';

const clearBasketFromAPI = (componentInfo, params) => {
  const token = authTokenObject();
  const header = {
    headers: {
      [token.type]: token.token,
    },
    data: {
      id: findCheckId(componentInfo.basket, params.showID)
    },
  };

  del(API_DELETE_BASKET, header, (res) => {
    removeParam('payment');
    removeParam('showID');
    if (!params.showID && params.times)
      removeParam('times');
    componentInfo.close();
  }, (err) => {
  })
}

function ModalPageProviderView(componentInfo) {
  const params = queryString.parse(getWindow().location ? getWindow().location.hash : ''); // для id евента из url
  const props = {
    buttonBack: false,
    buttonClose: false,
    filmName: false,
    filmHead: false,
  };

  // для страницы /order
  let order = false;
  if (getWindow().location.pathname.indexOf('/order') !== (-1)) {
    order = true;
  }

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
  const getTimerTime = () => {
    let TIMER_VALUE;
    if (componentInfo.timersList[findCheckId(componentInfo.basket, params.showID || params.payment)]) {
      TIMER_VALUE = (DEFAULT_TIME + componentInfo.timersList[findCheckId(componentInfo.basket, params.showID || params.payment)].time).toFixed();
    }
    return TIMER_VALUE
  }


  if (findValue(componentInfo, 'typeName', 'filmHead')) {
    props.filmHead = !!findValue(componentInfo, 'typeName', 'filmHead');
    if (props.filmHead) {
      if (findValue(componentInfo.childrenList[0], 'name', 'buttonClose')) {
        props.buttonClose = !!findValue(componentInfo.childrenList[0], 'name', 'buttonClose');
      }

      if (findValue(componentInfo.childrenList[0], 'name', 'buttonBack')) {
        props.buttonBack = !!findValue(componentInfo.childrenList[0], 'name', 'buttonBack');
      }

      if (findValue(componentInfo.childrenList[0], 'name', 'filmName')) {
        props.filmName = findChildren(componentInfo.childrenList[0], 'name', 'filmName');
      }

      if (findValue(componentInfo.childrenList[0], 'name', 'timer')) {
        props.timer = findChildren(componentInfo.childrenList[0], 'name', 'timer');
      }

      if (findValue(componentInfo.childrenList[0], 'name', 'orderLabel')) {
        props.orderLabel = findChildren(componentInfo.childrenList[0], 'name', 'orderLabel');
      }
    }
  }
  if (props.filmHead) {
    const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');


    // props ModalPage
    // timerState - состояние таймера, в данном случае зависит от содержимого CheckContent(массив)
    // если пустой для нашего эвента - тайммер не идент
    // timerTime - зачение таймера в секундах
    // Формула для timerTime (300сек(5мин) - (текущая дата(сек) - дата создания таймера(сек, redux))
    return (
      <ModalPage
        theme="default"
        title={props.filmName ? props.filmName.componentsDescription.value : props.orderLabel ? props.orderLabel.componentsDescription.value : ''}
        backButton={props.buttonBack}
        closeButton={props.buttonClose}
        background={componentInfo.background ? componentInfo.background : ''}
        timerState={props.timer ? findCheckContent(componentInfo.basket, params.showID || params.payment) : []}
        dataModal={componentInfo.data}
        timerTime={getTimerTime()} // таймер в секундах
        onBackClick={() => {
          const scroll = getWindow().location.hash;
          const params = queryString.parse(getWindow().location.hash); // для id евента из url
          componentInfo.comeBack();
          removeParam('payment');
          if (params.showID && !params.payment && findCheckContent(componentInfo.basket, params.showID).length > 0) {
            clearBasketFromAPI(componentInfo, params);
          }

          scroll.indexOf('showID') >= 0 && scroll.indexOf('payment') <= 0 ? removeParam('showID') : '';
        }}
        payment={componentInfo.paymentModal || order}
        onCloseClick={() => {
          if (findCheckContent(componentInfo.basket, params.showID).length > 0) {
            clearBasketFromAPI(componentInfo, params);
          }
          else {
            removeParam('payment');
            removeParam('showID');
            removeParam('times');
            componentInfo.close();
          }
          if (order) { getWindow().location.href = '/'; }
        }}
      >
        { componentInfo.data }
      </ModalPage>
    );
  }
  return (
    <React.Fragment>
      { componentInfo.data }
    </React.Fragment>
  );
}


export default function (componentInfo, {}, event) {
  const mapStateToProps = state => ({
    basket: state.basket,
    timersList: state.timer,
  });

  const ModalPageContainer = compose(
    withState('data', 'setData', ''),
    withState('paymentModal', 'setPaymentModal', false),
    connect(
      mapStateToProps,
    ),
    lifecycle({
      componentWillMount() {
        const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');
        this.props.setPaymentModal(params.payment);

        if (getWindow().addEventListener) {
          getWindow().addEventListener('hashchange', () => {
            const paramsNew = queryString.parse(getWindow().location ? getWindow().location.hash : '');
            this.props.setPaymentModal(paramsNew.payment);
          });
        }

        const data = componentInfo.childrenList.map((component) => {
          const { typeName } = component;
          return providerByComponentTitle(typeName)(
            component,
            {},
            {
              setPayment: () => this.props.setPayment(),
              eventId: componentInfo.componentsDescription ? componentInfo.componentsDescription.value : null,
              ...event
            },
          );
        }).filter(item => !!item);
        this.props.setData(data);
      },
    }),
  )(ModalPageProviderView);

  return <ModalPageContainer {...componentInfo} {...event} />;
}
