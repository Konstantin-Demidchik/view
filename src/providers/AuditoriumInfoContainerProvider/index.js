import React from 'react';

import {
  compose, withState, lifecycle, withHandlers,
} from 'recompose';
import queryString from 'query-string';
import { connect } from 'react-redux';
import getHistory from '../../core/functions/global-history';
import { getWindow } from '../../core/functions/browser';
import {
  chooseCategoryPlaceName, findCheckId, findCheckContent, findCheck,
} from '../../core/functions/hall';

import API_URL from '../../core/rest/paths';

import {
  ContentContainer,
  SeatsContainer,
  BasketContainer,
  SeatsLegend,
  SeatsLegendItem,
  Notes,
  NotesList,
  NotesListItem,
  BookingAction,
  LoaderContainer,
} from '../../pages/PlaceChoosing/PlaceChoosingStyled';

import {
  Text,
  Icon,
  Button,
  Hall,
  HallSeat,
  HallLabels,
  SeatType,
  SeatTypeItem,
  Basket,
  BasketItem,
  BasketOption,
  AuthorizationD2,
  Registration,
  ModalWindow,
  Notification,
  Loader,
  ProductsSelection,
  ModalWindowCriticalError,
} from '../../components';

import { get, post, del } from '../../core/rest/index';
import {
  API_GET_SEATS,
  API_GET_ID_CHECK,
  API_ADD_ITEM_CHECK,
  API_PROMOCODE,
  API_GET_INFO_PRODUCTS,
  API_SOCKET,
} from '../../core/rest/paths';

import {
  MSG_FAIL_BOOK_PLACE,
  MSG_FAIL_CANSEL_BOOKING,
  MSG_COUNT_BASKET,
  MSG_NOT_FOUND_PROMO,
  MSG_FAIL_CANSEL_PROMO,
} from '../../core/configs/messages';
import { API_MESSAGES } from '../../core/configs/responses';
import { TOKEN, authTokenObject } from '../../core/configs/tokens';
import { STATUS_SEAT } from '../../core/configs/seats';
import {
  checkUser, addNewCheck, setCheckInfo, clearBasket, setTimerInfo, clearTimer,
} from '../../store/actions';
import { monthName, getBelarusDate, getRightDate } from '../../core/functions/datetime';
let socket;
const MOVIE = {
  poster: 'https://i.pinimg.com/736x/55/e3/d0/55e3d0767a7da472bddf53e882a47060.jpg',
  title: 'Пришельцы в доме',
  cinemaAddress: 'Silver Screen cinemas в ТРЦ ArenaCity, г. Минск, пр Победителей, 84',
  hall: 'Зал 2',
  date: 'среда, 17 октября',
  time: '12:00 – 13:35',
  videoFormat: '3D',
  audioFormat: 'Dolby Digital',
};

const HALL = {
  width: 398,
  heigth: 289,
  seats: [
    {
      x: 60,
      y: 85,
      type: 'love',
      typeName: 'Love Seats',
      ticketId: 115038,
      row: 1,
      place: 2,
      price: 11,
      currency: 'BYN',
      booked: false,
    },
  ],
  rows: [],
};


/* Функции поиска компонентов */
const getRootChildren = (component) => {
  if (!component) return {};
  return component.childrenList.reduce((obj, item) => {
    const newObj = { ...obj };
    newObj[item.typeName] = item;
    return newObj;
  }, {});
};
const getChildren = (component) => {
  if (!component) return [];
  return component.childrenList.map(item => ({
    style: item.style,
    childrenList: item.childrenList,
    ...item.componentsDescription,
  }));
};

const findValue = (comp, fieldName) => {
  if (fieldName in comp.componentsDescription) {
    return comp.componentsDescription[fieldName];
  }
  return null;
};
//= ==================================================================================

/* Отрисовка компонентов */
const renderBasketOption = (props, checkItem) => {
  let options = [];
  props.hall.typeSeats.forEach((type) => {
    if (type.id === checkItem.typeSeat) {
      if (type.ticketCategory.length > 1) {
        options = type.ticketCategory.map((category, index) => {
          let isCreateBasketOption = false;
          props.priceCategoriesSeat.forEach((priceCategory) => {
            if (priceCategory.idTicketCategory === category.id && priceCategory.grossPrice > 0) {
              isCreateBasketOption = true;
            }
          });
          if (isCreateBasketOption) {
            return (
              <BasketOption value={category.id} active={!index} name={category.name} />
            );
          }
          return null;
        }).filter(index => !!index);
      } else options = null;
    }
  });
  return options;
};

const renderSeatsHall = props => {
  return (
    <g key="seats">
      {props.seats.map((seat,index) => (
        <HallSeat
          {...seat}
          index={index}
          onChange={() => {
            if (getWindow().localStorage && !findCheckId(props.basket, props.id)) {
              getWindow().localStorage.setItem('chooseSeat', JSON.stringify(seat));
            }

            if (seat.booked === STATUS_SEAT.free) {
              if (!props.selectedSeat.length ) {
                props.selectSeat(seat);
              }
            }
            if (seat.booked === STATUS_SEAT.booked) {
              if (!props.deletedSeat.length) {
                props.deleteSeat(seat);
              }
            }
          }}
        />
      ))}
    </g>
  )
};
//= ==================================================================================

/* Функции isBasketLoader */
// функция isAddedItemInCheck проверяет,
// добавлено ли выбранное место (массив selectedSeats) в корзину из redux
// (checkContent для определенного чека)
// если условие проходит, то удаляем элемент из массива selectedSeats
// componentWillMount при каждом изменении корзины вызывает isAddedItemInCheck
// (чтобы удалить конкретный элемент из selectedSeat)

const isAddedItemInCheck = (checkContent, prevCheckContent, selectedSeats, props) => {
  const result = [...selectedSeats];

  checkContent.forEach((item) => {
    selectedSeats.map((selectSeat, index) => {
      if (item.ticket === selectSeat.ticket) {
        result.splice(index, 1);
      }
    }).filter(index => !!index);
  });
  props.setSelectedSeat(result);
};

const isDeletedItemInCheck = (checkContent, prevCheckContent, deletedSeats, props) => {
  const result = [...deletedSeats];
  result.splice(deletedSeats.length - 1, 1);
  props.setDeletedSeat(result);
};
//= ===========================================================

/* Функции получения инфы */
const getPriceSeans = (props, priceSeans, typeSeat) => {
  let price;
  let defaultPriceId;
  props.hall.typeSeats.forEach((type) => {
    if (type.id === typeSeat) {
      type.ticketCategory.forEach((category) => {
        if (category.default) defaultPriceId = category.id;
      });
    }
  });
  priceSeans.forEach((priceItem) => {
    if (priceItem.idTicketCategory === defaultPriceId) {
      price = priceItem.grossPrice;
    }
  });
  return price;
};


// Получение инфы продуктов
const getTitleProduct = (productsInfoList, category) => {
  let title;
  productsInfoList.forEach(item => (item.id === category ? title = item.categoryName : title = 'Продукт'));
  return title;
};

const getPriceProduct = (productsInfoList, categoriesProduct) => {
  let price = 0;
  Object.keys(categoriesProduct).forEach((categoryId) => {
    productsInfoList.forEach((item) => {
      if (item.id === Number(categoryId)) {
        Object.keys(categoriesProduct[categoryId]).forEach((productId) => {
          const isFindProduct = item.products.find(product => product.id === Number(productId));
          if (isFindProduct) {
            price += categoriesProduct[categoryId][productId] * isFindProduct.price;
          }
        });
      }
    });
  });
  return price;
};

const getQuantityProduct = (category, categoriesProduct) => {
  let quantity = 0;
  Object.keys(categoriesProduct).forEach((categoryId) => {
    if (categoryId === category) {
      Object.keys(categoriesProduct[categoryId]).forEach((productId) => {
        quantity += categoriesProduct[categoryId][productId];
      });
    }
  });
  return quantity;
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

const uploadToAnalytics = (seat, answer, params, props) => {
  if (props.moviesList) {
    let productsList = [];
    const currentMovie = props.moviesList.find(movie => movie.eventId === Number(params.times.split('-').pop()));
    answer.checkContent.forEach((checkItem) => {
      if (checkItem.ticket === seat.ticket) {
          if (!checkItem.mode) {
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
              price: checkItem.grossSumWithoutDiscont,
              quantity: checkItem.quantity,
              seat: checkItem.name,
              type: seat.typeName,
            });
            if (props.productsInfoList && props.productsInfoList.products !== null) {

              const foundProduct = props.productsInfoList[0].products.find(product => product.default === 1);
              //const currentQuantityGlass = answer.checkContent.find(item => item.id === foundProduct.id && item.mode === 1).quantity;
              //const prevQuantityGlass = findCheckContent(props.basket, params.showID).length > 0 ? findCheckContent(props.basket, params.showID).find(item => item.id === foundProduct.id && item.mode === 1).quantity : null;
              productsList.push({
                id: '3d-glasses',
                name: foundProduct.name,
                category: getProductCategory(props.productsInfoList, foundProduct.id).categoryName,
                variant: foundProduct.name,
                price: foundProduct.price,
                quantity: chooseCategoryPlaceName(seat.seatType).places,
              });
            }
          }
      }
  });
    getWindow().dataLayer.push({
      event: 'onAddToCart',
      ecommerce: {
        currencyCode: 'BYN',
        add: {
          actionField: {
            list: 'Details',
          },
          products: productsList,
        }
      }
    });
  }
}

const unloadFromAnalytics = (seat, answer, params, props) => {
  if (props.moviesList) {
    let productsList = [];
    const currentMovie = props.moviesList.find(movie => movie.eventId === parseInt(params.times.split('-').pop()));
    findCheckContent(props.basket, params.showID).forEach((checkItem) => {
      if (checkItem.ticket === seat.ticket) {
          if (!checkItem.mode) {
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
              price:  checkItem.grossSumWithoutDiscont,
              quantity: checkItem.quantity,
              seat: checkItem.name,
              type: seat.typeName,
            });

            if (props.productsInfoList && props.productsInfoList.products !== null) {
              const foundProduct = props.productsInfoList[0].products.find(product => product.default === 1)
            //  const prevQuantityGlass = answer.checkContent ? answer.checkContent.find(item => item.id === foundProduct.id && item.mode === 1).quantity : 0;
            //  const currentQuantityGlass = findCheckContent(props.basket, params.showID).length > 0 ? findCheckContent(props.basket, params.showID).find(item => item.id === foundProduct.id && item.mode === 1).quantity : 0;

              productsList.push({
                id: '3d-glasses',
                name: foundProduct.name,
                category: getProductCategory(props.productsInfoList, foundProduct.id).categoryName,
                variant: foundProduct.name,
                price: foundProduct.price,
              //  quantity: currentQuantityGlass <= chooseCategoryPlaceName(seat.seatType).places ? chooseCategoryPlaceName(seat.seatType).places : currentQuantityGlass,
                quantity: chooseCategoryPlaceName(seat.seatType).places
              });
            }
          }
      }
    });
    getWindow().dataLayer.push({
      event: 'onRemoveFromCart',
      ecommerce: {
        currencyCode: 'BYN',
        remove: {
          actionField: {
            list: 'Details',
          },
          products: productsList,
        }
      }
    });
  }
}

const AuditoriumInfoContainer = (props) => {
  const { componentInfo, event } = props;
  const {
    leftInformation,
    rightInformation,
    checkList,
  } = getRootChildren(componentInfo);
  const {
    leftInformationTop,
    leftInformationBottom,
  } = getRootChildren(leftInformation);

  const [
    rightBlockLabel,
    cinemaLabel,
    seatInfoContainer,
  ] = getChildren(rightInformation);

  const [
    checkLabel,
    cinemaCheckLabel,
    seatContainer,
    checkInfoContainer,
  ] = getChildren(checkList);

  let auditoriumFill = null;
  if (leftInformationTop) {
   auditoriumFill = leftInformationTop.childrenList.map((component) => {
     if (component.typeName === 'auditoriumFill') {
       if (props.isPageLoader || props.isMovieListLoader) {
         return (
           <LoaderContainer>
             <Loader centered />
           </LoaderContainer>
         );
       }

         return (
           <Hall
             schemeWidth={props.hall.width}
             schemeHeight={props.hall.height}
             isLoader={props.isCreateCheck === false}
             logo={props.hall.svg}
             seats={props.seats}
           >
             {renderSeatsHall(props)}
             <g key="labels">
               <HallLabels>
                 {props.hall.rows.map(row => row.nameLeft && (
                   <text
                     x={(String(row.rowName).length >= 2) ? (row.minX - (row.maxY - row.minY) * (String(row.rowName).length - 1)) : (row.minX - (row.maxY - row.minY) / 2 - 10)}
                     y={row.maxY - (row.maxY - row.minY) / 3} fill="currentColor" style={{ fontSize: `${(row.maxY - row.minY) / 2}px`, lineHeight: `${(row.maxY - row.minY)}px` }}
                     fontWeight="400"
                   >
                   {row.rowName}
                   </text>
                 ))}
                 {props.hall.rows.map(row => row.nameRight && (
                 <text x={row.maxX + 20} y={row.maxY - (row.maxY - row.minY) / 3} fill="currentColor" fontSize={(row.maxY - row.minY) / 2}>
                   {row.rowName}
                 </text>
                 ))}
               </HallLabels>
             </g>
             <g key="stikyLabels">
               {props.hall.rows.map(row => (
                 <text x={10} y={(row.maxY - (row.maxY - row.minY) / 4) / 2} fill="currentColor">
                   {row.rowName}
                 </text>
               ))}
             </g>
           </Hall>
          );
      }
    });
  }

  let leftInformationBottomSeatsLegendItems; let leftInformationBottomLabels; let
    leftInformationBottomNotesList;
  if (leftInformationBottom) {
    leftInformationBottomSeatsLegendItems = leftInformationBottom.childrenList.map((component) => {
      if (component.typeName === 'group') {
        const group = component.childrenList.map((item) => {
          if (item.typeName === 'label') {
            return (
              <Text footerBottom>
                {findValue(item, 'value')}
              </Text>
            );
          }
          if (item.typeName === 'icon') {
            switch (findValue(item, 'key')) {
              case 'freeseat':
                return (<Icon name="seat-standard" width="24" height="24" />);
              case 'busyseat':
                return (<Icon name="seat-standard-o" width="24" height="24" />);
              case 'invalidseat':
                return (<Icon name="invalid" width="24" height="24" />);
              default:
                return (<Icon name="seat-standard" width="24" height="24" />);
            }
          }
        });
        return (<SeatsLegendItem>{group}</SeatsLegendItem>);
      }
    });

    leftInformationBottomLabels = leftInformationBottom.childrenList.map((component) => {
      if (component.typeName === 'label') {
        return (
          <Text footerBottom>
            {findValue(component, 'value')}
          </Text>
        );
      }
      return null;
    });

    leftInformationBottomNotesList = leftInformationBottom.childrenList.map((component) => {
      if (component.typeName === 'description') {
        return (
          <NotesListItem>
            <Text footerBottom>{findValue(component, 'value')}</Text>
          </NotesListItem>
        );
      }
      return null;
    });
  }

  const propsSeatType = {
    image: null,
    seatType: null,
    description: null,
    seatPrice: null,
    rccLabel: null,
    button: null,
  };
  if (seatInfoContainer) {
    seatInfoContainer.childrenList.map((item) => {
      if (item.typeName === 'image') {
        propsSeatType.image = true;
      }

      if (item.typeName === 'label') {
        if (findValue(item, 'key') === 'seatType') {
          propsSeatType.seatType = true;
        }

        if (findValue(item, 'key') === 'seatPrice') {
          propsSeatType.seatPrice = true;
        }
        if (findValue(item, 'key') === 'rccLabel') {
          propsSeatType.rccLabel = findValue(item, 'value');
        }
      }
      if (item.typeName === 'description') {
        propsSeatType.description = true;
      }
      if (item.typeName === 'button') {
        propsSeatType.button = findValue(item, 'value');
      }
    });
  }


  return (
    <ContentContainer>
      <SeatsContainer>
        {auditoriumFill}
        <SeatsLegend>
          {leftInformationBottomSeatsLegendItems}
        </SeatsLegend>

        <Notes>
          {leftInformationBottomLabels}
        </Notes>

        <NotesList>
          {leftInformationBottomNotesList}
        </NotesList>
      </SeatsContainer>

      <BasketContainer>
        {findCheckContent(props.basket, props.id).length === 0 && (
          <SeatType
            note={propsSeatType.rccLabel}
            cinemaTitle={cinemaLabel.value}
            heading={rightBlockLabel.value}
          >
            {props.hall.typeSeats && props.hall.typeSeats.map(typeSeat => (
              <SeatTypeItem
                type={chooseCategoryPlaceName(typeSeat.id).type}
                price={props.priceCategoriesSeat && getPriceSeans(props, props.priceCategoriesSeat, typeSeat.id)}
                title={chooseCategoryPlaceName(typeSeat.id).name}
                description={typeSeat.description}
                propsSeatType={propsSeatType}
              />
            ))}
          </SeatType>
        )}
        {findCheckContent(props.basket, props.id).length > 0 && (
          <Basket
            cinemaTitle={cinemaLabel.value}
            showId={props.id}
            savedPromo={props.savedPromo}
            isBasketLoader={props.isBasketLoader || props.isBasketSyncLoader}
            setIsBasketSyncLoader={props.setIsBasketSyncLoader}
            activationPromocode={props.activationPromocode}
            deactivationPromocode={props.deactivationPromocode}
            activePromocode={props.activePromocode}
          >
            {findCheckContent(props.basket, props.id).map(item => item.mode === 0 && (
              <BasketItem
                headers={props.headers}
                showId={props.id}
                type={chooseCategoryPlaceName(item.typeSeat).type}
                priceCategoriesSeat={props.priceCategoriesSeat}
                placeName={item.name}
                ticketId={item.ticket}
                typeName={chooseCategoryPlaceName(item.typeSeat).name}
                onClose={
                  () => props.deleteSeat(props.hall.seats.find(seatItem => seatItem.ticket === item.ticket))
                }
              >
                {renderBasketOption(props, item)}
              </BasketItem>
            )).filter(index => !!index)}
            {Array.isArray(props.productsInfoList) &&
              Object.keys(props.categoryProducts).length === 0 ? (
                <BasketItem
                  type="glasses"
                  headers={props.headers}
                  productTitle="3D очки"
                  productQuantity={0}
                  setProductsModal={props.setProductsModal}
                />
              ) :
              Object.keys(props.categoryProducts).map(category => (
                <BasketItem
                  type="glasses"
                  headers={props.headers}
                  productTitle={getTitleProduct(props.productsInfoList, Number(category))}
                  id={Number(category)}
                  priceProduct={getPriceProduct(props.productsInfoList, props.categoryProducts)}
                  productQuantity={getQuantityProduct(category, props.categoryProducts)}
                  setProductsModal={props.setProductsModal}
                  onClose={() => props.deleteCategoryProduct(category)}
                />
              )).filter(index => !!index)
            }
          </Basket>
        )}

        <BookingAction active={(findCheckContent(props.basket, props.id).length > 0) && (!props.isBasketLoader && !props.isBasketSyncLoader)}>
          {findCheckContent(props.basket, props.id).length === 0 && propsSeatType.button && (
            <Button>
              {propsSeatType.button}
            </Button>
          )}
          {findCheckContent(props.basket, props.id).length > 0 && (
            <Button
              onClick={() => {
                const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');
                getHistory().push(`${getWindow().location ? getWindow().location.hash : ''}&payment=${params.showID}`);
                event.setPayment();
              }}
            >
              {(!props.isBasketLoader && !props.isBasketSyncLoader) ? 'Подтвердить и перейти к оплате' : 'Расчет скидок...'}
            </Button>
          )}
        </BookingAction>
      </BasketContainer>

      <ModalWindow
        open={props.isAuthModalOpened}
        closeButton
        onCloseClick={() => {
          if (getWindow().localStorage) {
            getWindow().localStorage.removeItem('chooseSeat');
            props.setAuthModalOpened(false);
          }
        }}
      >
        {props.isAuthModalOpened && (
          <AuthorizationD2
            createCheck={props.createCheck}
            onOpenRegModalClick={props.setRegModalOpened}
            setIsConfirmEmail={props.setIsConfirmEmail}
            onModalCloseClick={() => props.setAuthModalOpened(false)}
          />
        )}

      </ModalWindow>

      {props.isRegModalOpened && (
        <ModalWindow
          open
          closeButton
          onCloseClick={() => props.setRegModalOpened(false)}
          registrationModal
        >
          <Registration
            onOpenRegModalClick={props.setRegModalOpened}
            close={() => props.setRegModalOpened(false)}
            isRegModalOpened={props.isRegModalOpened}
          />
        </ModalWindow>
      )}
      {Array.isArray(props.productsInfoList) && (
      <ModalWindow
        open={props.productsModal}
        closeButton
        onCloseClick={() => props.setProductsModal(false)}
      >
        {props.productsModal && (
        <ProductsSelection
          checkContent={findCheckContent(props.basket, props.id)}
          checkId={findCheckId(props.basket, props.id)}
          productsInfoList={props.productsInfoList}
          categoryProducts={props.categoryProducts}
          headers={props.headers}
          setProductsModal={props.setProductsModal}
          setIsBasketSyncLoader={props.setIsBasketSyncLoader}
        />
        )}
      </ModalWindow>
      )}

      <ModalWindowCriticalError
        open={props.isCriticalErrorModalOpened}
        afishaButton
      />
    </ContentContainer>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  moviesList: state.movies,
  basket: state.basket,
});

const mapDispatchToProps = dispatch => ({
  checkUser: token => dispatch(checkUser(token)),
  addNewCheck: (id, showId) => dispatch(addNewCheck(id, showId)),
  setCheckInfo: (id, info) => dispatch(setCheckInfo(id, info)),
  clearBasket: () => dispatch(clearBasket()),
  setTimerInfo: (checkId, time) => dispatch(setTimerInfo(checkId, time)),
  clearTimer: checkId => dispatch(clearTimer(checkId)),
});

const AuditoriumInfoProvider = compose(
  withState('movie', 'setMovie', MOVIE),
  withState('hall', 'setHall', HALL),
  withState('seats', 'setSeats', HALL.seats),
  withState('priceCategoriesSeat', 'setPriceCategoriesSeat', null),
  withState('productsInfoList', 'setInfoProducts', null),
  withState('categoryProducts', 'setCategoryProducts', {}),
  withState('changeSeats', 'setChangeSeats', []), // for socket
  withState('selectedSeat', 'setSelectedSeat', []),
  withState('deletedSeat', 'setDeletedSeat', []),
  withState('isPageLoader', 'setIsPageLoader', true),
  withState('isBasketLoader', 'setIsBasketLoader', false),
  withState('isBasketSyncLoader', 'setIsBasketSyncLoader', false),
  withState('isMovieListLoader', 'setIsMovieListLoader', false),
  withState('isAuthModalOpened', 'setAuthModalOpened', false),
  withState('isRegModalOpened', 'setRegModalOpened', false),
  withState('isCriticalErrorModalOpened', 'setCriticalErrorModalOpened', false),
  withState('productsModal', 'setProductsModal', false),
  withState('ticketId', 'setTicketId', ''),
  withState('isCreateCheck', 'setIsCreateCheck', null),
  withState('id', 'setId', ''),
  withState('headers', 'setHeaders', null),
  withState('sizeNumberRow', 'setSizeNumberRow', null),
  withState('activePromocode', 'setStatusPromocode', false),
  withState('isConfirmEmail', 'setIsConfirmEmail', false),
  withState('placeLimitNotification', 'setPlaceLimitNotification', false),
  // для хранения содержимого инпута после Unmount <Basket />
  withState('savedPromo', 'setSavedPromo', ''),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withHandlers({
    createCheck: props => (seat) => {
      const token = authTokenObject();
      const params = queryString.parse(getWindow().location.hash);
      const header = {
        headers: {
          [token.type]: token.token,
        },
      };
      let checkId;
      props.setIsCreateCheck(false);
      props.setHeaders(header);
      post(API_GET_ID_CHECK, {}, header, (res) => {
        checkId = res.data.checkId;
        const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');
        let id;
        if (params.showID) {
          id = params.showID;
        }
        // redux
        props.addNewCheck(res.data.checkId, id);
        socket.send(JSON.stringify({
          type: 'SET_OWNER',
          body: res.data.checkId,
        }));
        const requestData = {
          id: checkId,
          checkContent: {
            newPosition: {
              mode: 0,
              id: seat.defaulTicketCategory,
              quantity: 1,
              ticket: seat.ticket,
              ticketCategory: seat.defaulTicketCategory,
            },
          },
        };

        post(API_ADD_ITEM_CHECK, requestData, header, (res) => {
          // добавление контента для определенного чека
          const answer = JSON.parse(res.data.answer);
          const { message } = res.data;

          // nowDateInSecondsFormat - текущее время в секундах
          // setTimerInfo (redux) устанавливаем время создания таймера ({checkId : {time: nowDateInSecondsFormat}})
          // Значение берется из редакса и вычисляется по формуле:
          // 300сек(5 мин) - текущее время(сек) - время создания таймера(сек)
          const nowDateInSecondsFormat = new Date().getTime() / 1000;
          props.setTimerInfo(answer.checkId, nowDateInSecondsFormat);

          props.setCheckInfo(answer.checkId, answer); // redux перезапись корзины
          props.setIsCreateCheck(true);

          const copySeats = [...props.seats];
          const isBookedPlace = answer.checkContent.find(place => place.ticket === seat.ticket);
          const seatWithNewStatus = copySeats.find(seatItem => isBookedPlace.ticket === seatItem.ticket);
          if (getWindow().localStorage && isBookedPlace !== undefined && message === API_MESSAGES.YES) { // проверка: добавилось ли выбранное место в API
            seatWithNewStatus.booked = STATUS_SEAT.booked; // перевод в статус "забронированно"


            // Аналитика для выбора места
            uploadToAnalytics(seat, answer, params, props);
            const number = copySeats.indexOf(seatWithNewStatus);
            copySeats[number] = seatWithNewStatus;
            props.setSeats(copySeats);
            getWindow().localStorage.removeItem('chooseSeat');
          } else {
            props.setIsCreateCheck(true);
            seatWithNewStatus.booked = STATUS_SEAT.sales; // перевод в статус "свободно"
            const number = copySeats.indexOf(seatWithNewStatus);
            copySeats[number] = seatWithNewStatus;
            props.setSeats(copySeats);
            props.setSelectedSeat([]);
          }
        },
        () => {
          const copySeats = [...props.seats];
          const unlockPlace = copySeats.find(seatItem => seatItem.ticket === seat.ticket);
          const seatWithNewStatus = copySeats.find(seatItem => unlockPlace.ticket === seatItem.ticket);
          props.setIsCreateCheck(true);
          if (unlockPlace !== undefined) {
            seatWithNewStatus.booked = STATUS_SEAT.free; // перевод в статус "куплено" (серый)
            const number = copySeats.indexOf(seatWithNewStatus);
            copySeats[number] = seatWithNewStatus;
            props.setSeats(copySeats);
            props.setSelectedSeat([]);
          }
          getWindow().pushNotification({
            timeout: 6000,
            body: MSG_FAIL_BOOK_PLACE,
          });
        });
      }, () => {
        const copySeats = [...props.seats];
        const unlockPlace = copySeats.find(seatItem => seatItem.ticket === seat.ticket);
        const seatWithNewStatus = copySeats.find(seatItem => unlockPlace.ticket === seatItem.ticket);
        if (unlockPlace !== undefined) {
          seatWithNewStatus.booked = STATUS_SEAT.free; // перевод в статус "забронированно"
          const number = copySeats.indexOf(seatWithNewStatus);
          copySeats[number] = seatWithNewStatus;
          props.setSeats(copySeats);
          props.setSelectedSeat([]);
        }
        // удаление тех мест, которые мы выбирали(тем самым показывая статус isBasketLoader)
        // const newSelectedSeat = props.selectedSeat.filter(seatItem =>
        //  seatItem.ticket !== seat.ticket);
        //    props.setSelectedSeat(newSelectedSeat);
        getWindow().pushNotification({
          timeout: 6000,
          body: MSG_FAIL_BOOK_PLACE,
        });
      });
    },
  }),
  withHandlers({
    getInfoHall: props => () => {
      const callback = (res) => {
        const response = res.data;
        const HALL = {
          width: response.width,
          height: response.height,
          svg: response.svg,
          rows: [...response.rows],
          typeSeats: [...response.typeSeats],
        };
        HALL.seats = [];

        const getSeatSize = (seatType) => {
          let result;
          response.typeSeats.forEach((type) => {
            if (type.id === seatType) {
              result = type;
            }
          });

          return {
            width: result.width * 100,
            height: result.height * 100, // перевод из метров в см
          };
        };
        response.rows.forEach((row) => {
          row.seats.forEach((seat, index) => {
            if (index === 0) {
              props.setSizeNumberRow(getSeatSize(seat.seatType).height); // для размеров цифр рядов
            }
            HALL.seats = [...HALL.seats, {
              x: seat.X,
              y: seat.Y,
              width: getSeatSize(seat.seatType).width,
              height: getSeatSize(seat.seatType).height,
              row: row.rowName,
              // описание места standart - Стандарт
              typeName: chooseCategoryPlaceName(seat.seatType).name,
              // name сиденья 'standart'
              type: chooseCategoryPlaceName(seat.seatType).type,
              // id Сиденья loaveseats, standart
              seatType: seat.seatType,
              // id места
              ticket: seat.ticket,
              // Имя место 1 ряд 1 место
              place: seat.seatName,
              // статусы 3 - свободно 5 - куплено 7 забронированно
              booked: seat.status === STATUS_SEAT.booked ? STATUS_SEAT.sales : seat.status,
              degree: seat.angle,
            }];
          });
        });
        const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');
        let id;
        if (params.showID) {
          id = params.showID;
        }
        get(`${API_URL}/wssite/webapi/tickets/${id}/price`, {}, (res) => {
          HALL.seats.forEach((seat) => {
            let defaultPriceId;
            HALL.typeSeats.forEach((type) => {
              if (type.id === seat.seatType) {
                type.ticketCategory.forEach((category) => {
                  if (category.default) defaultPriceId = category.id;
                });
              }
            });

            res.data.forEach((priceItem) => {
              if (priceItem.idTicketCategory === defaultPriceId) {
                seat.price = priceItem.grossPrice;
                seat.defaulTicketCategory = defaultPriceId;
              }
            });
          });

          // проверка, если нет цен на сеанс - выкидываем модальное окно ModalCriticalError
          if (!res.data || res.data.length === 0) {
            props.setCriticalErrorModalOpened(true);
          }
          props.setPriceCategoriesSeat(res.data);
          /*
            Если мы авторизовались и пришли из соц. сетей в localStorage
            должно быть последнне выбранное место + не должно быть чека
          */
          if (
            getWindow().localStorage && getWindow().localStorage.getItem('chooseSeat') && !findCheckId(props.basket, props.id) &&
            (getWindow().localStorage.getItem(TOKEN.VK) || getWindow().localStorage.getItem(TOKEN.FB))
          ) {
            props.createCheck(JSON.parse(getWindow().localStorage.getItem('chooseSeat')));
            getWindow().localStorage.removeItem('chooseSeat');
          }
        }, () => {
          props.setCriticalErrorModalOpened(true);
        });

        props.setHall(HALL);
        props.setSeats(HALL.seats);
        props.setIsPageLoader(false);
      };

      const fail = () => {
        if (getWindow().localStorage) {
          getWindow().localStorage.removeItem('chooseSeat');
          props.setCriticalErrorModalOpened(true);
        }
      };

      const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');

      let id;
      if (params.showID) {
        id = params.showID;
      }
      get(`${API_GET_SEATS}${id}`, {}, callback, fail);
    },
    listenSocket: props => () => {
      const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');

      let id;
      if (params.showID) {
        id = params.showID;
      } else {
        id = props.match.params.showtimeId;
      }
      socket = new WebSocket(API_SOCKET + id);
      socket.onopen = () => {
        socket.onmessage = (event) => {
          const res = JSON.parse(event.data);
          const body = JSON.parse(res.body);
          props.setChangeSeats(body);
        };
        socket.onerror = () => {
          props.setIsBasketSyncLoader(true);
        };
      };
    },
    deleteSeat: props => (seat) => {
      const token = authTokenObject();
      Object.keys(props.basket).forEach(async (item) => {
        const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');

        let id;
        if (params.showID) {
          id = params.showID;
        }
        if (props.basket[item].showId === id) { // поиск чека в корзине редакса
          if (seat.booked === STATUS_SEAT.booked) {
            const requestData = {
              id: props.basket[item].checkId,
              checkContent: {
                newPosition: {
                  mode: 0,
                  id: props.basket[item].checkContent.find(item => item.ticket === seat.ticket).ticketCategory,
                  quantity: 1,
                  ticket: seat.ticket,
                  ticketCategory: props.basket[item].checkContent.find(item => item.ticket === seat.ticket).ticketCategory,
                },
              },
            };
            const header = {
              headers: {
                [token.type]: token.token,
              },
              data: requestData,
            };

            // Временная блокировка бронирования - перевод в статус забронированное
            const seatsWithNewStatus = [...props.seats];
            const lockPlace = seatsWithNewStatus.find(seatItem => seatItem.ticket === seat.ticket);
            if (lockPlace !== undefined) {
              lockPlace.booked = STATUS_SEAT.sales;
              const number = seatsWithNewStatus.indexOf(lockPlace);
              seatsWithNewStatus[number] = lockPlace;
              props.setSeats(seatsWithNewStatus);
            } else {
              getWindow().pushNotification({
                timeout: 6000,
                body: MSG_FAIL_BOOK_PLACE,
              });
              return;
            }

            /* Функционал выбора места для удаления */
            if (props.deletedSeat.length === 0) {
              // массив с удаленными местами, чтобы ориентироватся на этот массив для состояния isBasketLoader.
              // При выборе места он добавляет элемент места,
              // при полном удалении он будет из массива удалятся
              // если он пустой, то лоадер isBasketLoader - не показывается, иначе показываем
              props.setDeletedSeat([
                ...props.deletedSeat,
                seat,
              ]);
            }

            props.deletedSeat.forEach((item) => {
              if (item.ticket !== seat.ticket) {
                props.setDeletedSeat([
                  seat,
                ]);
              }
            });
            /* ------------------------------ */


            del(API_ADD_ITEM_CHECK, header, (res) => {
              const answer = JSON.parse(res.data.answer);
              const { message } = res.data;

              const copySeats = [...props.seats];
              const unlockPlace = copySeats.find(seatItem => seatItem.ticket === seat.ticket);
              if (message === API_MESSAGES.YES && (unlockPlace !== undefined)) {
                unloadFromAnalytics(seat, answer, params, props);
                unlockPlace.booked = STATUS_SEAT.free;
                const number = copySeats.indexOf(unlockPlace);
                copySeats[number] = unlockPlace;
                props.setCheckInfo(answer.checkId, answer); // redux
                props.setSeats(copySeats);
                if (answer.message === API_MESSAGES.CHECK_IS_NULL) {
                  // nowDateInSecondsFormat - текущее время в секундах
                  // setTimerInfo (redux) устанавливаем время создания таймера ({checkId : {time: nowDateInSecondsFormat}})
                  // Значение берется из редакса и вычисляется по формуле:
                  // 300сек(5 мин) - текущее время(сек) - время создания таймера(сек)
                  // 300 -( N - N) = 300 сек
                  const nowDateInSecondsFormat = new Date().getTime() / 1000;
                  props.setTimerInfo(answer.checkId, nowDateInSecondsFormat);
                }
              }
            }, () => {
              const copySeats = [...props.seats];
              const unlockPlace = copySeats.find(seatItem => seatItem.ticket === seat.ticket);
              unlockPlace.booked = STATUS_SEAT.booked;
              const number = copySeats.indexOf(unlockPlace);
              copySeats[number] = unlockPlace;
              props.setSeats(copySeats);

              getWindow().pushNotification({
                timeout: 6000,
                body: MSG_FAIL_CANSEL_BOOKING,
              });
              props.setDeletedSeat([]);
            });

          }
        }
      });
    },

    selectSeat: props => async (seat) => {
      const token = authTokenObject();

      if (token) {
        await props.checkUser(token); // Проверка на токен
      }

      // При входе на определенный эвент, проверяем - если у нас публичный токен ,
      // то пользователь должен его подтвердить(показываем модалку)
      // статус isConfirmEmail(true/false) показывает подтверждена ли почта или нет
      // Передается в пропс AuthorizationD2
      if (getWindow().localStorage && getWindow().localStorage.getItem(TOKEN.PUBLIC) && !props.isConfirmEmail) {
        props.setAuthModalOpened(true);
        return null;
      }
      // Показ модалки авторизации - создание токена.
      if (getWindow().localStorage && Object.keys(props.user).length === 0 && !(getWindow().localStorage.getItem(TOKEN.PUBLIC))) {
        props.setAuthModalOpened(true);
      } else {
        const header = {
          headers: {
            [token.type]: token.token,
          },
        };
        // Временная блокировка бронирования - перевод в статус забронированное
        const seatsWithNewStatus = [...props.seats];
        const lockPlace = seatsWithNewStatus.find(seatItem => seatItem.ticket === seat.ticket);
        let flagRestrictionPlace = false; // флаг на ограничение 10-ти мест
        if (findCheckContent(props.basket, props.id).filter(item => item.mode === 0).length + props.selectedSeat.length + 1 > 10) {
            getWindow().pushNotification({
              timeout: 6000,
              singleNotification: true,
              title: 'Покупаете много билетов?',
              body: MSG_COUNT_BASKET,
            });
          flagRestrictionPlace = true;
          //    return;
        }
        if (flagRestrictionPlace) return;

        // массив с выбранными местами, чтобы ориентироватся на массив для состояния isBasketLoader.
        // При выборе места он добавляет элемент места,
        // при полном бронировании он будет из массива удалятся
        // если он пустой, то лоадер isBasketLoader - не показывается, иначе показываем
        props.setSelectedSeat([
          ...props.selectedSeat,
          seat,
        ]);

        if (lockPlace !== undefined) {
          lockPlace.booked = STATUS_SEAT.sales;
          const number = seatsWithNewStatus.indexOf(lockPlace);
          seatsWithNewStatus[number] = lockPlace;
          props.setSeats(seatsWithNewStatus);
        } else {
          getWindow().pushNotification({
            timeout: 6000,
            body: MSG_FAIL_BOOK_PLACE,
          });
          props.setSelectedSeat([]);
          return;
        }
        Object.keys(props.basket).forEach((item) => {
          const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');

          let id;
          if (params.showID) {
            id = params.showID;
          }
          if (props.basket[item].showId.indexOf(id) !== -1) {
            props.setIsCreateCheck(true);
          }
        });

        //  Если чека нет на определенный зал в редаксе - создаем
        if (props.isCreateCheck === null) {
          props.createCheck(seat);
        } else if (props.isCreateCheck) {
          Object.keys(props.basket).forEach((item) => {
            const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');

            let id;
            if (params.showID) {
              id = params.showID;
            }
            // поиск чека в корзине редакса
            if (props.basket[item].showId === id) {
              const requestData = {
                id: item,
                checkContent: {
                  newPosition: {
                    mode: 0,
                    id: seat.defaulTicketCategory,
                    quantity: 1,
                    ticket: seat.ticket,
                    ticketCategory: seat.defaulTicketCategory,
                  },
                },
              };
              post(API_ADD_ITEM_CHECK, requestData, header, (res) => {
                const answer = JSON.parse(res.data.answer);
                const { message } = res.data;

                const copySeats = [...props.seats];
                const isBookedPlace = answer.checkContent.find(place => place.ticket === seat.ticket);
                const seatWithNewStatus = copySeats.find(seatItem => isBookedPlace.ticket === seatItem.ticket);

                // проверка: добавилось ли выбранное место в API
                // перевод в статус "забронированно"
                if (isBookedPlace !== undefined && message === API_MESSAGES.YES) {
                  seatWithNewStatus.booked = STATUS_SEAT.booked;
                  const number = copySeats.indexOf(seatWithNewStatus);
                  copySeats[number] = seatWithNewStatus;
                  props.setSeats(copySeats);

                  if (props.basket[answer.checkId].message === API_MESSAGES.CHECK_IS_NULL) {
                    // nowDateInSecondsFormat - текущее время в секундах
                    // setTimerInfo (redux) устанавливаем время создания таймера ({checkId : {time: nowDateInSecondsFormat}})
                    // Значение берется из редакса и вычисляется по формуле:
                    // 300сек(5 мин) - текущее время(сек) - время создания таймера(сек)
                    // 300 -( N - N) = 300 сек
                    const nowDateInSecondsFormat = new Date().getTime() / 1000;
                    props.setTimerInfo(answer.checkId, nowDateInSecondsFormat);
                  }
                  if (!findCheckContent(props.basket, props.id).length) {
                    const nowDateInSecondsFormat = new Date().getTime() / 1000;
                    props.setTimerInfo(answer.checkId, nowDateInSecondsFormat);
                  }
                  // Аналитика при выборе места
                  uploadToAnalytics(seat, answer, params, props);
                  props.setCheckInfo(answer.checkId, answer); // redux
                } else {
                  seatWithNewStatus.booked = STATUS_SEAT.sales; // перевод в статус "забронированно"
                  const number = copySeats.indexOf(seatWithNewStatus);
                  copySeats[number] = seatWithNewStatus;
                  props.setSeats(copySeats);
                  props.setSelectedSeat([]);
                }
              },
              () => {
                const copySeats = [...props.seats];
                const unlockPlace = copySeats.find(seatItem => seatItem.ticket === seat.ticket);
                const seatWithNewStatus = copySeats.find(seatItem => unlockPlace.ticket === seatItem.ticket);
                if (unlockPlace !== undefined) {
                  seatWithNewStatus.booked = STATUS_SEAT.free; // перевод в статус "забронированно"
                  const number = copySeats.indexOf(seatWithNewStatus);
                  copySeats[number] = seatWithNewStatus;
                  props.setSeats(copySeats);
                  props.setSelectedSeat([]);
                }

                getWindow().pushNotification({
                  timeout: 6000,
                  body: MSG_FAIL_BOOK_PLACE,
                });
              });
            }
          });
        }
      }
    },
    deleteCategoryProduct: props => (categoryId) => {
      Object.keys(props.categoryProducts[categoryId]).forEach((productId) => {
        const token = authTokenObject();
        const requestData = {
          id: findCheckId(props.basket, props.id),
          checkContent: {
            newPosition: {
              mode: 1,
              id: Number(productId),
              quantity: Number(props.categoryProducts[categoryId][productId]),
            },
          },
        };
        const header = {
          headers: {
            [token.type]: token.token,
          },
          data: requestData,
        };
        props.setIsBasketSyncLoader(true);
        del(API_ADD_ITEM_CHECK, header, (res) => {
          const answer = JSON.parse(res.data.answer);
          const { message } = res.data;
          if (message === API_MESSAGES.YES) {
            props.setCheckInfo(answer.checkId, answer); // redux
            props.setCategoryProducts({});
            props.setIsBasketSyncLoader(false);
          } else {
            throw new Error('Error');
          }
        }, () => {
          getWindow().pushNotification({
            timeout: 6000,
            body: 'Не удалить товар',
          });
        });
      });
    },
    setNewSeats: props => () => {
      if (Array.from(props.changeSeats).length !== 0) {
        const seatsWithNewStatus = [...props.seats];
        Array.from(props.changeSeats).forEach((changeSeat) => {
          const result = seatsWithNewStatus.find(seat => seat.ticket === changeSeat.id && changeSeat.status !== 7);
          if (result !== undefined) {
            const number = seatsWithNewStatus.indexOf(result);
            result.booked = changeSeat.status;
            seatsWithNewStatus[number] = result;
            props.setSeats(seatsWithNewStatus);
          }
        });
      }
    },
    activationPromocode: props => (code) => {
      if (code.length > 0) {
        const token = authTokenObject();
        const header = {
          headers: {
            [token.type]: token.token,
          },
        };
        const requestData = {
          id: findCheckId(props.basket, props.id),
          checkContent: {
            promocode: code,
          },
        };
        props.setIsBasketSyncLoader(true);
        post(API_PROMOCODE, requestData, header, (res) => {
          const answer = JSON.parse(res.data.answer);
          const { message } = res.data;
          if (message === API_MESSAGES.YES) {
            props.setCheckInfo(answer.checkId, answer); // redux
            // setSavedPromo при активированном промокоде мы сохраняем промокод так как
            // мы должны знать его содержимое при чистом чеке (Check Is NULL)
            // <Basket /> Unmount и мы теряем содержимое инпута "Промокод"
            props.setSavedPromo(code);
            props.setStatusPromocode(true);
            props.setIsBasketSyncLoader(false);
          } else {
            getWindow().pushNotification({
              timeout: 6000,
              title: 'Ошибка промокода',
              body: MSG_NOT_FOUND_PROMO,
            });
            props.setIsBasketSyncLoader(false);
          }
        },
        (e) => {
          getWindow().pushNotification({
            timeout: 6000,
            title: 'Ошибка промокода',
            body: e.response.data.answer,
          });
          props.setIsBasketSyncLoader(false);
        });
      } else {
        getWindow().pushNotification({
          timeout: 6000,
          body: 'Введите свой промокод',
        });
      }
    },
    deactivationPromocode: props => (code) => {
      const token = authTokenObject();

      const requestData = {
        id: findCheckId(props.basket, props.id),
        checkContent: {
          promocode: code,
        },
      };

      const header = {
        headers: {
          [token.type]: token.token,
        },
        data: requestData,
      };
      props.setIsBasketSyncLoader(true);
      del(API_PROMOCODE, header, (res) => {
        const answer = JSON.parse(res.data.answer);
        const { message } = res.data;

        if (message === API_MESSAGES.YES) {
          props.setCheckInfo(answer.checkId, answer); // redux
          // setSavedPromo при не активированном промокоде мы удаляем промокод
          // хранить значение инпута "Промокод" не надо
          props.setSavedPromo('');
          props.setStatusPromocode(false);
          props.setIsBasketSyncLoader(false);
        } else {
          getWindow().pushNotification({
            timeout: 6000,
            title: 'Промокод',
            body: MSG_FAIL_CANSEL_PROMO,
          });
          props.setIsBasketSyncLoader(false);
        }
      },
      () => {
        getWindow().pushNotification({
          timeout: 6000,
          title: 'Промокод',
          body: MSG_FAIL_CANSEL_PROMO,
        });
        props.setIsBasketSyncLoader(false);
      });
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {

      if (Object.keys(prevProps.moviesList).length === 0 && Object.keys(this.props.moviesList).length > 0) {
        this.props.setIsMovieListLoader(true);
      }
      else {
        if (Object.keys(this.props.moviesList).length > 0 && this.props.isMovieListLoader) {
          this.props.setIsMovieListLoader(false);
        }

      }

      if (prevProps.changeSeats !== this.props.changeSeats) {
        this.props.setNewSeats(this.props);
      }

      if (this.props.basket !== prevProps.basket) {
        isAddedItemInCheck(
          findCheckContent(this.props.basket, this.props.id),
          findCheckContent(prevProps.basket, this.props.id), this.props.selectedSeat, this.props,
        );
        isDeletedItemInCheck(
          findCheckContent(this.props.basket, this.props.id),
          findCheckContent(prevProps.basket, this.props.id), this.props.deletedSeat, this.props,
        );
      }

      // Делается для того, чтобы из нескольких обектов(товаров) из редакс корзины
      // можно было собрать в одну категорию и отрисовать одним BasketItem'ом
      /*
        props.categoryProducts представляет из себя объект в виде
        {
          ид_категории_товара_1: {
            ид_товара_1_1: количество_товара,
            ид_товара_1_2 количество_товара,
            ид_товара_1_3: количество_товара,
          },
          ид_категории_товара_2: {
            ид_товара_2_1: количество_товара,
          },
        }

        productsInfoList берется из API продуктов на конкретный сеанс представляет из себя объект
        {
          0: {
            categoryName: "3D-очки"
            icon: "https://svgshare.com/i/DuU.svg"
            // id категории продуктов
            id: 4084
            // список всех продуктов данной категории(к примеру все очки)
            products: (3) [{…}, {…}, {…}]
          }
        }
      */
      if (this.props.basket !== prevProps.basket) { // Если корзина изменилась
        const copyCategoryProducts = {};

        // Проходим по checkContent определенного евента
        findCheckContent(this.props.basket, this.props.id).forEach((item) => {
          // mode = 1 (это значит что это товар)
          if (item.mode === 1) {
            // Проходим по productsInfoList (описание смотреть выше)
            this.props.productsInfoList.forEach((productList) => {
              // ищем по массиву products из productsInfoList
              const isFindCategory = productList.products.find(product => product.id === item.id);
              // если существует, добавляем в объект copyCategoryProducts
              if (isFindCategory) {
                // если не существует ид категории, создаем
                if (!copyCategoryProducts[productList.id]) {
                  copyCategoryProducts[productList.id] = {};
                }
                // пихаем в категориюю товара - ид продукта и его количество
                copyCategoryProducts[productList.id][item.id] = item.quantity;
              }
            });
          }
        });

        this.props.setCategoryProducts(copyCategoryProducts); // обновляем объект с категориями
      }

      if (this.props.selectedSeat.length === 0 && this.props.deletedSeat.length === 0) {
        this.props.setIsBasketLoader(false);
      } else this.props.setIsBasketLoader(true);
    },
    componentWillMount() {
      const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');
      let id;
      if (params.showID) {
        id = params.showID;
      }
      this.props.setId(id);

      this.props.listenSocket(this.props);
      this.props.getInfoHall(this.props); // отрисовка зала
      if (params.showID) {
        id = params.showID;
      }
      get(API_GET_INFO_PRODUCTS + id, {}, (res) => { // Получение продуктов
        this.props.setInfoProducts(res.data);
      }, () => this.props.setCriticalErrorModalOpened(true));
    },
    // dataLayer для отслеживания событий расширенной электронной торговли на сайте silverscreen.by
    componentWillUnmount() {
      socket.close();
    },
  }),
)(AuditoriumInfoContainer);

export default (componentInfo, movies, event) => (
  <AuditoriumInfoProvider componentInfo={componentInfo} event={event} />
);
