/**
 * Provider
 * Описание: Провайдер страницы выбора способа оплаты
 * Пример: /afisha/#times=mstiteli-final-631&showID=46877&payment=46877
 * Ключевые слова: оплата, оплатить заказ, способ оплаты, visa, сертификат, рекурент, assist, ассист
 */

import React from 'react';
import { compose, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { get } from '../../core/rest/index';

import { getWindow } from '../../core/functions/browser';
import {
  chooseCategoryPlaceName, findCheckId, findCheckContent, findCheck,
} from '../../core/functions/hall';
import {
  ButtonWrapper,
  CertificateInfo,
  Summary,
  SummaryCertificate,
  SummaryCertificateClose, SummaryContainer,
  SummaryText,
} from '../../pages/PaymentPage/PaymentPageStyled';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import { GeneratedForm, LoaderBlocker } from '../../components';
import Button from '../../components/Button';
import { resetBasketCardCertificate } from '../../store/actions/basket';
import {
  setPaymentData,
  setPaymentRedirect,
} from '../../store/actions';
import { post } from '../../core/rest';
import { API_PAYMENT_ASSIST, API_ASSIST } from '../../core/rest/paths';
import { API_GET_INFO_PRODUCTS } from '../../core/rest/paths';
import { SITE_ADDRESS } from '../../core/configs/site';
import { authTokenObject } from '../../core/configs/tokens';
import { monthName, getBelarusDate, getRightDate } from '../../core/functions/datetime';
import { API_MESSAGES } from '../../core/configs/responses';
import { PAYMENT_TYPES } from '../../core/configs/type';

/**
 * Парсит строку "Универсальная подарочная карта 10 сеансов_3_10"
 * @param {Object} description - описание сертификата, которое приходит с бэка
 * @returns {Object}
 */
const parserForPaymentDescription = (description) => {
  const arrayFromDescriptionText = description ? description.split('_') : [];
  return {
    // Название сертификата
    name: arrayFromDescriptionText[0],
    // Сколько использовано
    total: arrayFromDescriptionText[1],
    // Всего было/есть
    used: arrayFromDescriptionText[2],
  };
};

const findEventInfo = (movieInfo, showId) => {
  let resultEventInfo;
  Object.keys(movieInfo.showList).forEach((eventDate) => {
    movieInfo.showList[eventDate].forEach(eventItem => {
      if (eventItem.showId == showId) {
        resultEventInfo = eventItem;
      }
    })
  });
  return resultEventInfo;
}

const addSymbolForTimeFormat = (time) => {
  const timeString = String(time);
  if (timeString.length === 1) {
    return '0' + timeString;
  }
  else {
    return timeString;
  }
}

const getProductCategory = (productsInfoList, productId) => {
  let categoryInfoObject;
  productsInfoList.forEach(categoryItem => {
    categoryItem.products.forEach(productItem => {
      if (productItem.id === productId) {
        categoryInfoObject = categoryItem;
      }
    })
  })
  return categoryInfoObject;
}

const uploadAnalytics = (props, params, stepNumber, optionInfo) => {
  // Разность между массивами (1. массив-ответ из АПИ; 2. массив хранящийся в редаксе). Результат:
  // место(товар) которое добавилось. Отправляем в аналитику dataLayer

  if (props.moviesList) {
    let productsList = [];
    const currentCheckId = findCheckId(props.basket, params.showID || params.payment);
    const tickets = props.basket[currentCheckId];
    const currentMovie = props.moviesList.find(movie => movie.code === params.times);
      findCheckContent(props.basket, params.showID).forEach(item => {
        if (!item.mode) {
          const currentMovieEvent = findEventInfo(currentMovie, params.showID);
          const timeStartCurrentMovieEvent = addSymbolForTimeFormat(getRightDate(currentMovieEvent.start).getHours()) + ':' + addSymbolForTimeFormat(getRightDate(currentMovieEvent.start).getMinutes());
          const timeEndCurrentMovieEvent = addSymbolForTimeFormat(getRightDate(currentMovieEvent.end).getHours()) + ':' + addSymbolForTimeFormat(getRightDate(currentMovieEvent.end).getMinutes());
          const dateCurrentMovieEventInFormat = getRightDate(currentMovieEvent.start).getDate() + ' ' + monthName(getRightDate(currentMovieEvent.start));
          productsList.push({
            id: currentMovie.eventId,
            name: currentMovie.name,
            category: 'Билеты',
            variant: currentMovieEvent.theater.name + currentMovieEvent.theater.address,
            showtimes: dateCurrentMovieEventInFormat + ' / ' + timeStartCurrentMovieEvent + ' - ' + timeEndCurrentMovieEvent,
            format: currentMovieEvent.typeVideo.name + ' / ' + currentMovieEvent.typeAudio.name,
            price: item.discountForOne ? item.grossSumForOne : item.grossSumWithoutDiscont,
            quantity: item.quantity,
            seat: item.name,
            type: chooseCategoryPlaceName(item.typeSeat).name,
          })
        }
        else {
          productsList.push({
            id: '3d-glasses',
            name: item.name,
            category: getProductCategory(props.productsInfoList, item.id).categoryName,
            variant: getProductCategory(props.productsInfoList, item.id).products.find(productItem => productItem.id === item.id).name,
            price: item.discountForOne ? item.grossSumForOne : item.grossSumWithoutDiscont,
            quantity: item.quantity,
          })
        }

      })

    getWindow().dataLayer.push({
      event: 'onCheckout',
      ecommerce: {
        currencyCode: 'BYN',
        checkout: {
          actionField: {
            step: stepNumber,
            option: optionInfo,
            total: tickets.total,
          },
          products: productsList,
        }
      }
    });
  }
}

export default function (componentInfo) {
  function AsideProviderView(props) {
    const propsNew = {
      title: false,
      resultLabelSum: false,
      resultLabel: false,
      discount: false,
      discountName: false,
      button: false,
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

    /**
     * Определяет объект корзины сгенерированной для сеанса
     * @param {Object} fullBasket - Полная корзина со всеми чеками
     * @param {String} showId - Идентификатор сеанса, для которого сгенерирована корзина
     * @returns null если корзина для сеанса не найдена
     * @returns Объект корзины, сгенерированной для сеанса
     */
    const getBasketByShowId = (fullBasket, showId) => {
      let basket = null;

      Object.keys(fullBasket).map(item => {
        if (fullBasket[item].showId === showId) {
          basket = fullBasket[item];
        }
      });

      return basket;
    };

    /**
     * Возвращает сертификат если он был применен.
     * Возможность применения нескольких сертификатов одновременно не предусмотрена.
     * @param {Object} basket - Вся корзина
     * @returns null если сертификат не найден или не был применен
     * @returns Объект примененного типа оплаты "Сертификат"
     */
    const findCertificate = payments => {
      for (let i = 0; i < payments.length; i += 1) {
        if (payments[i].payment === 3) {
          return payments[i];
        }
      }

      return null;
    };

    /**
     * Закрывает чек
     * @param {String} checkId - идентификатор чека
     */
    const closeCheck = (checkId, callback, fail) => {
      const token = authTokenObject();

      post(
        '/wssite/webapi/check/close',
        {
          id: checkId,
        },
        {
          headers: {
            [token.type]: token.token,
          },
        },
        (res) => {
          if (callback) {
            callback(res);
          }
        },
        (err) => {
          if (fail) {
            fail(err);
          }
        },
      );
    };

    /**
     * Устанавливает данные для ухода на Assist в Redux
     */
    const setAssistData = (paymentData, showID, props) => {
      const token = authTokenObject();

      post(
        API_PAYMENT_ASSIST,
        paymentData,
        {
          headers: {
            [token.type]: token.token,
          },
        },
        (res) => {
          if (res.data.message && res.data.answer) {
            try {
              if (paymentData.recurrentId) {
                // Рекуррентная оплата. Перенаправляем на страницу проверки оплаты
                getWindow().location.href = `${SITE_ADDRESS}/payment/assist/ok?ordernumber=${paymentData.checkId}&showId=${showID}`;
              } else {
                const message = JSON.parse(res.data.message);
                const answer = JSON.parse(res.data.answer);

                const forAssist = {
                  Merchant_ID: message.Merchant_ID,
                  OrderNumber: answer.checkId,
                  OrderAmount: parseFloat(answer.total).toFixed(2),
                  OrderCurrency: message.OrderCurrency,
                  FirstName: message.FirstName === 'null' ? '' : message.FirstName,
                  LastName: message.LastName === 'null' ? '' : message.LastName,
                  Email: answer.clientEmail === 'null' ? '' : answer.clientEmail,
                  Delay: message.Delay,
                  CardPayment: message.CardPayment,
                  CheckValue: message.CheckValue,
                  URL_RETURN_OK: `${API_ASSIST.RETURN_URL_OK}?showId=${showID}`,
                  URL_RETURN_NO: `${API_ASSIST.RETURN_URL_OK}?showId=${showID}`,
                  RecurringIndicator: paymentData.isRecurrent ? 1 : 0,
                  RecurringMinAmount: message.RecurringMinAmount || null,
                  RecurringMaxAmount: message.RecurringMaxAmount || null,
                  RecurringPeriod: message.RecurringPeriod || null,
                  RecurringMaxDate: message.RecurringMaxDate || null,
                  PROMONAME: paymentData.promoName,
                };

                props.setPaymentData(forAssist);

                setTimeout(() => {
                  props.setPaymentRedirect('assist');
                }, 100);
              }
            } catch (err) {
              console.log('getAssistData JSON.parse > message or answer failed');

              getWindow().pushNotification({
                timeout: 6000,
                body: res.data.answer,
              });
            }
          } else {
            console.log('getAssistData > message or answer failed');

            getWindow().pushNotification({
              timeout: 6000,
              body: 'Ошибка сервера. Попробуйте немного позже',
            });
          }
        },
        (err) => {
          console.log('getAssistData > query error', err.response.data);
          console.log(err.response.data.answer);

          getWindow().pushNotification({
            timeout: 6000,
            body: 'Ошибка сервера. Попробуйте немного позже',
          });

          // huy
          props.setLoading(false);
        },
      );
    };

    /**
     * Возвращает код PROMONAME для Assist в зависимости от типа карты
     * @param {String} paymentType - тип карты
     */
    const getPromoName = (paymentType) => {
      switch (paymentType) {
        case PAYMENT_TYPES.GOLD:
          return 'VISAGOLD';
        case PAYMENT_TYPES.INFINITE:
          return 'VISAINFINITY';
        case PAYMENT_TYPES.PLATINUM:
          return 'VISAPLATINUM';
        default:
          return null;
      }
    };

    /**
     * Функция запускает процесс оплаты
     * @param {Object} data
     */
    const PaymentProcess = (basket, recurrent, saveCard, showID, props, paymentType) => {
      let paymentData = {
        checkId: basket.checkId,
        isRecurrent: saveCard || false,
        recurrentId: recurrent || null,
        promoName: getPromoName(paymentType),
      };

      const certificate = findCertificate(basket.payments);

      if (certificate) {
        /**
         * Был применен сертификат
         */
        if (certificate.sum > 0 && basket.total === 0) {
          /**
           * Сертификат покрыл всю оставшуюся после скидок сумму чека
           */
          if (paymentType === PAYMENT_TYPES.CERTIFICATE) {
            /**
             * Выбран способ оплаты сертификат, все корректно, можно выдавать билеты
             */
            closeCheck(
              paymentData.checkId,
              (res) => {
                if (res.data.message === API_MESSAGES.YES) {
                  getWindow().pushNotification({
                    timeout: 6000,
                    body: 'Успешно оплачено',
                  });

                  setTimeout(() => {
                    getWindow().location.href = `/order/${paymentData.checkId}`;
                  }, 2000);
                }
              },
              () => {
                props.setLoading(false);

                getWindow().pushNotification({
                  timeout: 6000,
                  body: 'Произошла ошибка при оплате сертификатом. Пожалуйста, обратитесь по контактным номерам или выберите другой способ оплаты',
                });
              },
            );
          } else {
            /**
             * Выбран другой способ оплаты, необходимо выбрать способ оплаты "сертификат"
             */
            props.setLoading(false);

            getWindow().pushNotification({
              timeout: 6000,
              body: 'Сертификат покрыл всю сумму, выберите способ оплаты "Сертификат"',
            });
          }
        } else {
          /**
           * Сертификат не покрыл всю сумму, необходима доплата
           */
          if (paymentType === PAYMENT_TYPES.CERTIFICATE) {
            props.setLoading(false);

            if (certificate.sum === 0) {
              /**
               * Сумма сертификата равна нулю, нужно выбрать другой способ оплаты
               */
              getWindow().pushNotification({
                timeout: 6000,
                body: 'Ничего не удалось списать сертификатом. Выберите другой способ оплаты',
              });
            } else {
              /**
               * Сумма сертификата не равна нулю, но нужна доплата
               */
              getWindow().pushNotification({
                timeout: 6000,
                body: 'Сертификат успешно покрыл часть суммы в чеке. Чтобы оплатить оставшуюся часть, выберите дополнительный способ оплаты',
              });
            }
          } else {
            /**
             * Необходима доплата и выбран корректный способ оплаты
             */
            setAssistData(paymentData, showID, props);
          }
        }
      } else {
        /**
         * Оплата без сертификата
         */
        if (paymentType !== PAYMENT_TYPES.CERTIFICATE) {
          setAssistData(paymentData, showID, props);
        } else {
          props.setLoading(false);

          getWindow().pushNotification({
            timeout: 6000,
            body: 'Сертификат не был применен, выберите другой способ оплаты',
          });
        }
      }
    };

    if (findValue(componentInfo, 'typeName', 'label')) {
      propsNew.title = findAllChildren(componentInfo, 'typeName', 'label')[0].componentsDescription.value;
      propsNew.resultLabel = findAllChildren(componentInfo, 'typeName', 'label')[1].componentsDescription.value;
      propsNew.resultLabelSum = findAllChildren(componentInfo, 'typeName', 'label')[2];
      propsNew.discount = findAllChildren(componentInfo, 'typeName', 'label')[3];
      propsNew.discountName = findAllChildren(componentInfo, 'typeName', 'label')[4];
    }

    if (findValue(componentInfo, 'typeName', 'button')) {
      propsNew.button = findChildren(componentInfo, 'typeName', 'button').componentsDescription.value;
    }

    const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');
    const checkID = findCheckId(props.basket, params.showID || params.payment);
    const tickets = props.basket[checkID];
    if (tickets) {
      return (
        <SummaryContainer payment={params.payment}>
          <Summary>
            <Text h41>{propsNew.title ? propsNew.title : '' }</Text>
            {(propsNew.resultLabelSum) && (
              <SummaryText>
                <Text gray>{propsNew.resultLabel ? propsNew.resultLabel : ''}</Text>
                <Text h3>
                  {(tickets) ? (tickets.total).toFixed(2).split('.').join(',') : ''}
                </Text>
                <Text>{propsNew.resultLabelSum ? 'BYN' : ''}</Text>
              </SummaryText>
            )}

            <SummaryCertificate
              certificate={(props.cardType === 'Certificate' && componentInfo.certificate)}
              visa={(tickets.loyaltyProgram && tickets.loyaltyProgram.length > 0) ? tickets.loyaltyProgram.find(item => item.lpName === 'VISA') : false}
            >
              {(tickets.payments.length > 0 || tickets.loyaltyProgram.length > 0) && tickets.grossSum !== tickets.total && (
                <strike>
                  <Text h4 gray>
                    {`${(tickets.grossSum).toFixed(2)} BYN`}
                  </Text>
                </strike>
              )}

              {(tickets.payments && tickets.payments.length > 0) && (
                tickets.payments.map(payment => (
                  <CertificateInfo>
                    <SummaryCertificateClose onClick={() => {
                      props.resetBasketCardCertificate(
                        checkID,
                        payment.un,
                        3,
                      );
                    }}
                    >
                      <Icon name="close" />
                    </SummaryCertificateClose>
                    <Text paymentInfo>{`Сертификат: ${parserForPaymentDescription(payment.description).name}`}</Text>
                    <Text paymentInfo>{`Общая сумма: ${parserForPaymentDescription(payment.description).total}`}</Text>
                    <Text paymentInfo>{`Осталось: ${parserForPaymentDescription(payment.description).used}`}</Text>
                    <Text>
                      {`Списано сертификатом: ${(payment.sum).toFixed(2)} BYN`}
                    </Text>
                  </CertificateInfo>
                )))}

              {(tickets.grossSumWithDiscount && tickets.loyaltyProgram.length > 0) && (
                tickets.loyaltyProgram.filter(item => item.isOK === 1).map(program => (
                  <Text paymentInfo>{`Скидка ${program.lpName} ${program.lpCategoryName} — ${(tickets.discount).toFixed(2)} BYN`}</Text>
                ))
              )}
            </SummaryCertificate>

            {propsNew.button && (
              <ButtonWrapper>
                <Button
                  filled
                  disabled={props.loading}
                  loading={props.loading}
                  onClick={() => {
                    const basket = getBasketByShowId(props.basket, params.showID || params.payment);

                    props.setLoading(true);

                    if (basket) {
                      if (props.payment.paymentType) {
                        const paymentType = props.payment.paymentType.toLowerCase();

                        switch (paymentType) {
                          case PAYMENT_TYPES.ANY:
                            PaymentProcess(basket, null, props.payment.saveCard, params.showID || params.payment, props, paymentType);
                            break;
                          case PAYMENT_TYPES.GOLD:
                            PaymentProcess(basket, null, null, params.showID || params.payment, props, paymentType);
                            break;
                          case PAYMENT_TYPES.PLATINUM:
                            PaymentProcess(basket, null, null, params.showID || params.payment, props, paymentType);
                            break;
                          case PAYMENT_TYPES.INFINITE:
                            PaymentProcess(basket, null, null, params.showID || params.payment, props, paymentType);
                            break;
                          case PAYMENT_TYPES.CERTIFICATE:
                            PaymentProcess(basket, null, null, params.showID || params.payment, props, paymentType);
                            break;
                          default:
                            const splitted = paymentType.split('-');

                            if (splitted[0] === PAYMENT_TYPES.RECURRENT) {
                              // Рекуррентная оплата
                              PaymentProcess(basket, splitted[1], null, params.showID || params.payment, props, paymentType);
                            }
                            break;
                        }
                      }
                    } else {
                      // Ошибка получения корзины
                    }
                  let optionInfoCard = props.payment.paymentType;
                  if (optionInfoCard !== 'any') {
                    optionInfoCard = `Visa ${optionInfoCard}`;
                  }
                  uploadAnalytics(props, params, 2, optionInfoCard);
                }}
              >
                {propsNew.button}
              </Button>
            </ButtonWrapper>
          )}

          {props.payment.redirect === 'assist' && (
            <React.Fragment>
              <GeneratedForm
                data={props.payment.data}
                method="POST"
                name="payment"
                action={API_ASSIST.ORDER}
              />
            </React.Fragment>
          )}
        </Summary>
      </SummaryContainer>
    );
    } else {
      return '';
    }

  }

  const mapStateToProps = state => ({
    basket: state.basket,
    payment: state.payment,
    moviesList: state.movies,
  });

  const mapDispatchToProps = dispatch => ({
    resetBasketCardCertificate: (checkId, un, payment) => dispatch(resetBasketCardCertificate(checkId, un, payment)),
    setPaymentData: data => dispatch(setPaymentData(data)),
    setPaymentRedirect: redirect => dispatch(setPaymentRedirect(redirect)),
  });

  const AsideContainerProvider = compose(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
    withState('loading', 'setLoading', false),
    withState('productsInfoList', 'setInfoProducts', null),
    lifecycle({
      componentDidMount() {
        const params = queryString.parse(getWindow().location.hash);
        get(API_GET_INFO_PRODUCTS + (params.showID || params.payment), {}, (res) => { // Получение продуктов
          this.props.setInfoProducts(res.data);
          uploadAnalytics(this.props, params, 1, '');
        }, () => this.props.setLoading(true));

      }
    }),
  )(AsideProviderView);

  return <AsideContainerProvider {...componentInfo} />;
}
