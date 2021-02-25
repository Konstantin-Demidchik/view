/**
 * @flow
 */
import React from 'react';

import { storiesOf, configure, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import backgroundColor from 'react-storybook-decorator-background';
import root from 'window-or-global';

import {
  Button,
  Text,
  Icon,
  Image,
  TextInput,
  TextInputTransparent,
  HomeSlider,
  Slide,
  SearchInput,
  SeatType,
  SeatTypeItem,
  Basket,
  BasketItem,
  BasketOption,
  BookingHeader,
  Hall,
  HallSeat,
  HallLabels,
  Header,
  HeaderItem,
  HeaderAside,
  HeaderLists,
  HeaderList,
  HeaderListItem,
  PromoSection,
  CardSection,
  NewsSection,
  FoodSection,
  SecondNewsSection,
  CompletedSection,
  Checkbox,
  EmailSubscriptionBox,
  MovieSessionHeader,
  MovieSessionTrailer,
  ShowTimes,
  ShowTimesItem,
  DayFilter,
  MovieItem,
  MoviesRoller,
  Authorization,
  Title,
  ModalWindow,
  NewPassword,
  SetEmail,
  SetEmailRemindPassword,
  ModalWindowCriticalError,
  ModalWindowInactivity,
  ProfileTable,
  Footer,
  FooterLinkGroup,
  FooterLinkItem,
  PaymentMethod,
  ModalWindowTrailer,
  ModalPage,
  Vacancy,
  Notification,
  CardsList,
  RCCDiagram,
  Select,
  SelectOption,
  Pagination,
  BasketTickets,
  BasketTicket,
  VerticalSlider,
  PhotoGallery,
  MovieAfisha,
  Registration,
  AuthorizationD2,
  Review,
  NavigationMain,
  NavigationMainLinkItem,
  Table,
  TableHead,
  TableBody,
  Td,
  Tr,
  Loader,
  RccAdvInfo,
  ButtonModalVacancy,
  ButtonModalRenthall,
  ButtonImage,
  Description,
  CinemaHeader,
  ProductsSelection,
  LoaderBlocker,
  PromoLanding,
} from '../components';

import {
  PickerUsage1,
  PickerUsage2,
  PickerUsage3,
  PickerUsage4,
} from './Picker';

import TabBar from './TabBar';

import MainPage from '../pages/MainPage/MainPageContainer';

import {
  ProfileArchiveWithoutUpcoming,
  ProfileArchiveWithoutHistory,
  ProfileArchiveFull,
} from './ProfileArchive';

import {
  VisaGold,
  VisaPlatinum,
  VisaInfinite,
  MyCard,
  AnyCard,
  Certificate,
} from '../components/PaymentMethod/Cards/CardsContainer';

import {
  StartTable,
  ClubTable,
} from './RccTables';

addDecorator(backgroundColor(['#27272a', '#999999', '#ffffff', '#000000']));

configure(() => {
  storiesOf('Button', module)
    .add('Primary Button', () => <Button onClick={action('clicked')}>Hello Button</Button>)
    .add('Secondary Button', () => <Button onClick={action('clicked')} secondary>Hello Button</Button>)
    .add('Navigation Button', () => <Button onClick={action('clicked')} navigationMainLinkItem>Hello Button</Button>)
    .add('Icon Button', () => (
      <Button onClick={action('clicked')} icon>
        <svg id="svg-icon-soc-instagram" viewBox="0 0 40 40" width="100%" height="100%">
          <path fill="currentColor" d="M26.875 35h-13.75A8.134 8.134 0 0 1 5 26.874v-13.75A8.134 8.134 0 0 1 13.125 5h13.75A8.134 8.134 0 0 1 35 13.123v13.75A8.134 8.134 0 0 1 26.875 35zM32.5 13.123A5.63 5.63 0 0 0 26.875 7.5h-13.75A5.63 5.63 0 0 0 7.5 13.123v13.75a5.632 5.632 0 0 0 5.625 5.627h13.75a5.632 5.632 0 0 0 5.625-5.626v-13.75zm-4.53.626a1.72 1.72 0 1 1 1.718-1.72 1.72 1.72 0 0 1-1.72 1.72zM20 27.5a7.5 7.5 0 1 1 7.5-7.5 7.508 7.508 0 0 1-7.5 7.5zM20 15a5 5 0 1 0 5 5 5.005 5.005 0 0 0-5-5z" />
        </svg>
      </Button>
    ));

  storiesOf('Text', module)
    .add('Text', () => <Text>Sample Text</Text>)
    .add('H1', () => <Text tag="h1" h1>Sample Text</Text>)
    .add('H2', () => <Text tag="h2" h2>Sample Text</Text>)
    .add('H3', () => <Text tag="h3" h3>Sample Text</Text>)
    .add('H4', () => <Text tag="h4" h4>Sample Text</Text>)
    .add('H5', () => <Text tag="h5" h5>Sample Text</Text>)
    .add('H6', () => <Text tag="h6" h6>Sample Text</Text>)
    .add('Strong', () => <Text strong>Sample Text</Text>)
    .add('Meta', () => <Text meta>Sample Text</Text>)
    .add('Justify', () => <Text justify>Sample Text</Text>)
    .add('Black', () => <Text black>Sample Text</Text>)
    .add('Footer Legal', () => <Text footerLegal>Sample Text</Text>)
    .add('Footer Bottom Text', () => <Text footerBottom>Sample Text</Text>)
    .add('Menu Group Title', () => <Text menuGroupTitle>Sample Text</Text>)
    .add('Accordeon Title', () => <Text accordeonTitle>Sample Text</Text>)
    .add('Advantage Title', () => <Text advantageTitle>Sample Text</Text>)
    .add('Advantage Text', () => <Text advantageText>Sample Text</Text>)
    .add('Poster Title', () => <Text posterTitle>Sample Text</Text>)
    .add('Poster Status', () => <Text posterStatus>Sample Text</Text>)
    .add('Poster Genre', () => <Text posterGenre>Sample Text</Text>);

  storiesOf('Description', module)
    .add('1', () => <Description styleId={1}>Description</Description>)
    .add('2', () => <Description styleId={2}>Description</Description>)
    .add('4', () => <Description styleId={4}>Description</Description>)
    .add('5', () => <Description styleId={5}>Description</Description>)
    .add('7', () => <Description styleId={7}>Description</Description>);

  storiesOf('Icon', module)
    .add('Arrow left', () => <Icon name="arrow-left" />)
    .add('Arrow right', () => <Icon name="arrow-right" />)
    .add('Arrow down', () => <Icon name="arrow-down" />)
    .add('Vkontakte', () => <Icon name="vk" />)
    .add('Facebook', () => <Icon name="fb" />)
    .add('Instagram', () => <Icon name="instagram" />)
    .add('Search', () => <Icon name="search" />)
    .add('Envelope', () => <Icon name="envelope" />)
    .add('Close', () => <Icon name="close" />)
    .add('Menu', () => <Icon name="menu" />)
    .add('Silver logo', () => <Icon name="silver_logo" />)
    .add('Screen logo', () => <Icon name="screen_logo" />)
    .add('S logo', () => <Icon name="s_logo" />)
    .add('Cinemas logo', () => <Icon name="cinemas_logo" />)
    .add('Location', () => <Icon name="location" />)
    .add('Clock', () => <Icon name="clock" />)
    .add('Glasses', () => <Icon name="glasses" />)
    .add('Camera', () => <Icon name="camera" />)
    .add('Calendar', () => <Icon name="calendar" />)
    .add('4k', () => <Icon name="4k" />)
    .add('Rent', () => <Icon name="rent" />)
    .add('Conditioner', () => <Icon name="conditioner" />)
    .add('Displays', () => <Icon name="displays" />)
    .add('Dolby', () => <Icon name="dolby" />)
    .add('Map', () => <Icon name="map" />)
    .add('Parking', () => <Icon name="parking" />)
    .add('Smiles', () => <Icon name="smiles" />)
    .add('Sofas', () => <Icon name="sofas" />)
    .add('Star', () => <Icon name="star" />)
    .add('ActiveStar', () => <Icon name="activestar" />)
    .add('Wifi', () => <Icon name="wifi" />)
    .add('Halls', () => <Icon name="halls" />)
    .add('Chef', () => <Icon name="chef" />)
    .add('Corn', () => <Icon name="corn" />)
    .add('Popcornchar', () => <Icon name="popcornchar" />)
    .add('Popcorn', () => <Icon name="popcorn" />)
    .add('Video camera', () => <Icon name="video-camera" />)
    .add('Wallet', () => <Icon name="wallet" />)
    .add('Gift', () => <Icon name="gift" />)
    .add('Heart', () => <Icon name="heart" />)
    .add('Card', () => <Icon name="card" />)
    .add('Completed', () => <Icon name="completed" />)
    .add('Paperclip', () => <Icon name="paperclip" />)
    .add('Back arrow', () => <Icon name="back-arrow" />)
    .add('Play', () => <Icon name="play" />)
    .add('Bar', () => <Icon name="bar" />)
    .add('Seat Standard', () => <Icon name="seat-standard" />)
    .add('Seat Love', () => <Icon name="seat-love" />)
    .add('Seat Comfort', () => <Icon name="seat-comfort" />)
    .add('Seat Wheelchair', () => <Icon name="seat-wheelchair" />)
    .add('Seat Recliner', () => <Icon name="seat-recliner" />)
    .add('Seat Love Comfort', () => <Icon name="seat-love-comfort" />)
    .add('Seat Love Recliner', () => <Icon name="seat-love-recliner" />)
    .add('Seat Premier', () => <Icon name="seat-premier" />)
    .add('Invalid', () => <Icon name="invalid" />)
    .add('Arrow Down Simple', () => <Icon name="arrow-down-simple" />)
    .add('Red Carpet Club', () => <Icon name="rcc" />)
    .add('Visa Card', () => <Icon name="pay-visa" />)
    .add('Mastercard', () => <Icon name="pay-mastercard" />)
    .add('Vbvisa', () => <Icon name="pay-vbvisa" />)
    .add('Mcsc', () => <Icon name="pay-mcsc" />)
    .add('Belcard', () => <Icon name="pay-belcard" />)
    .add('Pay assist', () => <Icon name="pay-assist" />)
    .add('Lovers seat', () => <Icon name="lovers-seat" />)
    .add('Premier sofa', () => <Icon name="premier-sofa" />)
    .add('Recliner', () => <Icon name="recliner" />)
    .add('Roker', () => <Icon name="roker" />)
    .add('Visa white', () => <Icon name="visa-white" />)
    .add('Any card', () => <Icon name="any-card" />)
    .add('Gift card', () => <Icon name="gift-card" />)
    .add('Game', () => <Icon name="game" />)
    .add('Cloud', () => <Icon name="cloud" />)
    .add('VIP', () => <Icon name="vip" />);

  storiesOf('Picker', module)
    .add('Single Select', () => (
      <div style={{ display: 'flex' }}>
        <PickerUsage1 />
      </div>
    ))
    .add('Multi Select', () => (
      <div style={{ display: 'flex' }}>
        <PickerUsage2 />
      </div>
    ))
    .add('Example', () => (
      <div style={{ display: 'flex' }}>
        <PickerUsage1 />
        <PickerUsage3 />
        <PickerUsage4 />
        <PickerUsage2 />
      </div>
    ));

  storiesOf('Text Input', module)
    .add('Default text input', () => <TextInput labelText="Type here" />)
    .add('Default text input with value', () => <TextInput value="Pavel" labelText="Name" forSubmit={action(inputValue => (inputValue))} />)
    .add('Search text input', () => <TextInput search placeholder="Search" forSubmit={action(inputValue => (inputValue))} />)
    .add('Email text input', () => <TextInput type="email" labelText="E-mail" forSubmit={action(inputValue => (inputValue))} />)
    .add('Password text input with start value', () => <TextInput type="password" labelText="Password" forSubmit={action(inputValue => (inputValue))} />);

  storiesOf('Text Input transparent', module)
    .add('Transparent search', () => <TextInputTransparent placeholder="Поиск" forSubmit={action(inputValue => (inputValue))} />)
    .add('Transparent email subscription', () => <TextInputTransparent placeholder="Email для акций и новостей" forSubmit={action(inputValue => (inputValue))} />);

  storiesOf('TabBar', module)
    .add('Default view', () => <TabBar />);

  storiesOf('TabBar', module)
    .add('Small view', () => <TabBar small />);

  storiesOf('Table', module)
    .add('Table Component', () => (
      <Table>
        <TableHead>
          <Tr>
            <Td>Обозначение</Td>
            <Td>Текстовое предупреждение</Td>
            <Td>Описание</Td>
          </Tr>
        </TableHead>
        <TableBody>
          <Tr>
            <Td centerText>0+</Td>
            <Td>Без возрастных ограничений</Td>
            <Td>
              Данный рейтинг получают фильмы, в содержании которых не присутствует сцен,
              которые могут хоть каким-то образом повлиять на детскую психику.
              Тем не менее, если картина получает рейтинг 0+, то никоим образом нельзя утверждать,
              что фильм предназначен только для детей.
              Преимущественно, рейтинг 0+ присваивают классическим семейным комедиям и мультфильмам.
              Разрешён к просмотру любой категории зрителей.
              Подходит для просмотра самым маленьким любителям кино.
            </Td>
          </Tr>
          <Tr>
            <Td>6+</Td>
            <Td>Показ фильма разрешен  зрителям старше 6 лет.</Td>
            <Td>
              Семейный или детский фильм, но в нём могут быть моменты,
              которые могут напугать малышей.
            </Td>
          </Tr>
        </TableBody>
      </Table>
    ));

  storiesOf('Image', module)
    .add('url', () => <Image url="https://firebasestorage.googleapis.com/v0/b/parking-raik.appspot.com/o/images%2Faca1aaee06c2c97e2a640b728af9bce6.jpeg?alt=media&token=6fc69995-3227-4f02-ade3-ce6e79e763b0" />)
    .add('assetPath', () => <Image assetPath="/images/assetPathImage.jpg" />);

  storiesOf('Slider', module)
    .add('HomeSlider', () => (
      <HomeSlider>
        <Slide
          theme="dark"
          tag="Фентези, драма, комедия, 12+"
          title="Человек, который убил Дон Кихота"
          url=""
          backgroundImage="https://silverscreen.by/cache/aa3/ce3/836d9937aa7b4a939396c8225e9c1105.jpg"
          btnTitle="Купить билет"
        />
        <Slide
          theme="light"
          tag="Триллер, ужасы, 18+"
          title="Проклятие монахини"
          url=""
          backgroundImage="https://silverscreen.by/cache/aec/60f/9bc066cc5682c7e785109d9412570d16.jpg"
          btnTitle="Купить билет"
        />
        <Slide
          theme="dark"
          tag="фэнтэзи, фантастика, 12+"
          title="Тайна дома с часами"
          url=""
          backgroundImage="https://silverscreen.by/cache/a4d/552/d3b8f79dbfd4e91aa96f2a976937d494.jpg"
          btnTitle="Купить билет"
        />
        <Slide
          theme="dark"
          tag=""
          title="Теперь и online! Детские и льготные билеты"
          url=""
          backgroundVideo="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          btnTitle="Подробнее"
        />
      </HomeSlider>
    ))
    .add('MovieRoller', () => (
      <MoviesRoller
        nextTapLink="https://silverscreen.by/"
        nextTabTitle="Спецпроекты"
      >
        {Array(20).fill(
          <MovieItem
            poster="https://silverscreen.by/cache/f82/a62/dee16a7e9a99231e915f1867b24ab60c.jpg"
            title="Звезда родилась"
            genre="драма, мюзикл"
            ageLimit="16+"
            language="RU"
            movieLink="" // ссылка на страницу фильма с описанием
            afishaLink="" // ссылка на страницу с покупко билетов
          />,
        )}
      </MoviesRoller>
    ));

  storiesOf('Search Input', module)
    .add('Default view', () => <SearchInput placeholder="Поиск" onSearch={action(inputValue => (inputValue))} />);

  storiesOf('Booking', module)
    .add('Seat Type Block', () => (
      <SeatType
        note="Скидки киноклуба Red Carpet Club будут рассчитаны после выбора мест."
      >
        <SeatTypeItem
          type="standard"
          price={7}
          title="Стандарт"
          description="Одноместное комфортное широкое кресло с подстаканником"
        />
        <SeatTypeItem
          type="love"
          price={11}
          title="LoveSeats"
          description="Удобные двойные диванчики. Цена указана за 2 места."
        />
      </SeatType>
    ))
    .add('Basket Block', () => (
      <Basket>
        <BasketItem
          type="standard"
          price={7}
          row={2}
          seat={17}
          typeName="Стандарт"
        >
          <BasketOption value={234} name="Стандартный" />
          <BasketOption value={23} active name="Пенсионный" />
          <BasketOption value={456} name="Детский" />
        </BasketItem>
        <BasketItem
          type="glasses"
          price={2}
          productTitle="3D-очки"
          productQuantity={1}
        />
      </Basket>
    ))
    .add('Booking Header', () => (
      <BookingHeader
        background="https://silverscreen.by/cache/07b/fb7/39232acf4e8ea0d2cb254732a25d82d3.jpg"
        title="Пришельцы в доме"
        cinemaAddress="Silver Screen cinemas в ТРЦ 'ArenaCity', г. Минск, пр Победителей, 84"
        hall="Зал 2"
        date="среда, 17 октября"
        time="12:00 – 13:35"
        videoFormat="3D"
        audioFormat="Dolby Digital"
      />
    ))
    .add('Hall', () => (
      <div
        style={{
          paddingLeft: '30px',
          paddingRight: '30px',
          paddingTop: '30px',
          paddingBottom: '30px',
          boxSizing: 'border-box',
        }}
      >
        <Hall
          schemeWidth={398}
          schemeHeight={238}
        >
          <g key="seats">
            <HallSeat
              x={60}
              y={85}
              type="love"
              ticketId={115038}
              row={1}
              place={2}
              price={9}
              currency="BYN"
            />
            <HallSeat
              x={120}
              y={85}
              type="love"
              ticketId={115558}
              row={1}
              place={3}
              price={9}
              currency="BYN"
            />
            <HallSeat
              x={180}
              y={85}
              type="standard"
              ticketId={114438}
              row={1}
              place={4}
              price={4}
              currency="BYN"
            />
            <HallSeat
              x={210}
              y={85}
              type="standard"
              ticketId={114438}
              row={1}
              place={5}
              price={4}
              currency="BYN"
            />
            <HallSeat
              x={180}
              y={115}
              type="standard"
              ticketId={114438}
              row={2}
              place={4}
              price={4}
              currency="BYN"
            />
            <HallSeat
              x={210}
              y={115}
              type="standard"
              ticketId={114438}
              row={2}
              place={5}
              price={4}
              currency="BYN"
            />
          </g>
          <g key="labels">
            <HallLabels>
              <text
                x={30}
                y={100}
                fill="currentColor"
              >
                1
              </text>
              <text
                x={350}
                y={100}
                fill="currentColor"
              >
                1
              </text>
              <text
                x={30}
                y={130}
                fill="currentColor"
              >
                2
              </text>
              <text
                x={350}
                y={130}
                fill="currentColor"
              >
                2
              </text>
            </HallLabels>
          </g>
          <g key="stikyLabels">
            <text y={100} x={10}>1</text>
            <text y={130} x={10}>2</text>
          </g>
        </Hall>
      </div>
    ))
    .add('Tickets', () => (
      <BasketTickets
        theme="default"
        title="мои билеты"
      >
        <BasketTicket type="love" row={4} place={6} price="17,00" currency="BYN" />
        <BasketTicket type="standard" row={4} place={6} price="17,00" currency="BYN" />
        <BasketTicket type="wheelchair" row={4} place={6} price="17,00" currency="BYN" />
        <BasketTicket type="reclainer" row={4} place={6} price="17,00" currency="BYN" />
        <BasketTicket type="love_comfort" row={4} place={6} price="17,00" currency="BYN" />
        <BasketTicket type="love_recliner" row={4} place={6} price="17,00" currency="BYN" />
        <BasketTicket type="premier" row={4} place={6} price="17,00" currency="BYN" />
      </BasketTickets>
    ));
  storiesOf('Header', module)
    .add('Header', () => (
      <Header>
        <HeaderItem
          name="Афиша"
          backgroundColor="linear-gradient(15deg, #51102b, #000 66%, #000)"
          id="1"
        >
          <HeaderAside
            url="https://silverscreen.by/#/afisha/venom-296/"
            btnTitle="Купить билет"
            image="https://silverscreen.by/cache/4f0/c94/1753b6aef8974fbf88745e588f65c6cd.jpg"
            title="Веном"
            text="ужасы, фантастика, боевик, триллер, 16+"
          />
          <HeaderLists>
            <HeaderList name="Афиша">
              <HeaderListItem url="https://silverscreen.by/afisha/" name="Arena City" />
              <HeaderListItem url="https://silverscreen.by/afisha/#/view/upcoming/" name="Скоро" />
              <HeaderListItem url="https://silverscreen.by/afisha/#/view/special/" name="Спецпроекты" />
            </HeaderList>
            <HeaderList name="По параметрам">
              <HeaderListItem url="" name="Сегодня после 18:00" />
              <HeaderListItem url="" name="Сеансы 3D" />
              <HeaderListItem url="" name="Звук Dolby Atmos" />
              <HeaderListItem url="" name="На языке оригинала" />
            </HeaderList>
            <HeaderList name="По кинотеатрам">
              <HeaderListItem url="" name="VOKA cinema" />
              <HeaderListItem url="" name="Arena City" />
              <HeaderListItem url="" name="Galileo" />
            </HeaderList>
          </HeaderLists>
        </HeaderItem>
        <HeaderItem
          name="Кинотеатры"
          backgroundColor="linear-gradient(15deg, #411d47, #000 66%, #000)"
          id="2"
        >
          <HeaderAside
            image="https://silverscreen.by/cache/f82/a62/dee16a7e9a99231e915f1867b24ab60c.jpg"
            title="Кинотеатры Silver Screen cinemas"
            text="Кристально чистое изображение Sony 4K и Real D 3D. Звуковые технологии Dolby, DCP, Crown, JBL."
          />
          <HeaderLists>
            <HeaderList name="Минск">
              <HeaderListItem url="" name="Arena City" />
              <HeaderListItem url="" name="Galileo" />
              <HeaderListItem url="" name="VOKA cinema" />
            </HeaderList>
            <HeaderList name="Преимущества">
              <HeaderListItem url="" name="Наши преимущества" />
            </HeaderList>
            <HeaderList name="Прочее">
              <HeaderListItem url="" name="3D-очки" />
              <HeaderListItem url="" name="Скоро" />
              <HeaderListItem url="" name="Бесплатная парковка" />
            </HeaderList>
          </HeaderLists>
        </HeaderItem>
      </Header>
    ));

  storiesOf('Section', module)
    .add('Promo Section', () => (
      <PromoSection
        background="https://silverscreen.by/cache/5e5/ae8/69940e1b882cb533fe34f722f45e6fb2.jpg"
        subtitle="АКЦИЯ"
        title="- 30% на коллекционные 3D очки!"
        description="Во всей сети Silver Screen cinemas стартовали приятные скидки – теперь коллекционные 3D очки стоят всего 9 BYN.
          В ассортименте широкий выбор очков по мотивам известных и всеми любимых фильмов: «Гадкий Я», «Тачки», «Звездные войны» и многие другие.
          Ждем вас в наших кинотеатрах в ТРЦ «Galileo», ТРЦ «ARENA city», и ТРЦ «Dana Mall»."
        image="https://silverscreen.by/cache/5e5/ae8/69940e1b882cb533fe34f722f45e6fb2.jpg"
      />
    ))
    .add('Card Section', () => (
      <CardSection
        subtitle="ПОДАРОЧНАЯ КАРТА"
        title="5 долгожданных визитов в кино"
        description="Вы можете выбрать подарочную карту на 5 посещений любого из кинотеатров Silver Screen cinemas и подарить близкому человеку возможность посмотреть 5 фильмов в комфортной атмосфере. Карта станет отличным подарком для любителей кино."
        image="https://silverscreen.by/upload/iblock/0ac/0ace1f869777f64124bab460e83b32e0.jpg"
        reverse
        price="44,90"
        currency="byn"
      />
    ))
    .add('News Section', () => (
      <NewsSection
        subtitle="24 ИЮЛЯ 2018"
        title="Теперь и online! Детские и льготные билеты"
        description="Впервые в Беларуси льготные билеты в кино для детей и пенсионеров можно купить online!"
        image="https://silverscreen.by/upload/iblock/a9b/a9bfa7d4024b05bb190033807c2eb007.jpg"
        background="https://silverscreen.by/upload/iblock/a9b/a9bfa7d4024b05bb190033807c2eb007.jpg"
        btnTitle="Подробнее"
        url="https://silverscreen.by/info/visitors/news/teper-i-online-detskie-i-lgotnye-bilety/"
      />
    ))
    .add('Food Section', () => (
      <FoodSection
        lable="https://silverscreen.by/upload/iblock/47e/47e7eea83b22cd0319708ce7b3365b97.png"
        title="POPMIX — миксуй любимые вкусы попкорна!"
        description="Сладкий или соленый? Возьми оба! Мы насыпем в POPMIX 2 твоих любимых вкуса по желанию. POPMIX идеален для двоих. Теперь не придется спорить с любимой о том, какой попкорн покупать. Захотел смешать — просто убери перегородку и сделай свой собственный вкус любимого лакомства."
        background="https://silverscreen.by/upload/iblock/990/990a3852546c14fb38afd85b16878233.jpg"
        reverse
        video="https://www.youtube.com/watch?v=eEEM5Z48iCI"
        btnTitle="Смотреть видео"
      />
    ))
    .add('SecondNews Section', () => (
      <SecondNewsSection
        image="https://silverscreen.by/upload/iblock/0ac/0ace1f869777f64124bab460e83b32e0.jpg"
        label="Test"
        description="Во всей сети Silver Screen cinemas стартовали приятные скидки – теперь коллекционные 3D очки стоят всего 9 BYN.
          В ассортименте широкий выбор очков по мотивам известных и всеми любимых фильмов: «Гадкий Я», «Тачки», «Звездные войны» и многие другие.
          Ждем вас в наших кинотеатрах в ТРЦ «Galileo», ТРЦ «ARENA city», и ТРЦ «Dana Mall»."
      />
    ))
    .add('Completed Section', () => (
      <CompletedSection
        background="https://silverscreen.by/cache/5e5/ae8/69940e1b882cb533fe34f722f45e6fb2.jpg"
        subtitle="АКЦИЯ"
        title="- 30% на коллекционные 3D очки!"
        description="Во всей сети Silver Screen cinemas стартовали приятные скидки – теперь коллекционные 3D очки стоят всего 9 BYN.
          В ассортименте широкий выбор очков по мотивам известных и всеми любимых фильмов: «Гадкий Я», «Тачки», «Звездные войны» и многие другие.
          Ждем вас в наших кинотеатрах в ТРЦ «Galileo», ТРЦ «ARENA city», и ТРЦ «Dana Mall»."
        image="https://silverscreen.by/cache/5e5/ae8/69940e1b882cb533fe34f722f45e6fb2.jpg"
      />
    ));

  storiesOf('Checkbox', module)
    .add('Checkbox', () => (
      <Checkbox
        theme="default"
        name="Запомнить меня"
        onChange={action(inputValue => (inputValue))}
      />
    ))
    .add('CheckboxTrue', () => (
      <Checkbox
        theme="default"
        name="Запомнить меня"
        checked
        onChange={action(inputValue => (inputValue))}
      />
    ))
    .add('Checkbox strong', () => (
      <Checkbox
        strong
        theme="default"
        name="Запомнить меня"
        onChange={action(inputValue => (inputValue))}
      />
    ));
  storiesOf('EmailSubscriptionBox', module)
    .add('EmailSubscriptionBox', () => (
      <EmailSubscriptionBox
        icon="envelope"
        placeholder="Email для акций и новостей"
        buttonText="Подписаться"
        onButtonClick={action(inputValue => (inputValue))}
      />
    ));
  storiesOf('ModalWindow', module)
    .add('ModalWindowTrailer', () => (
      <ModalWindowTrailer
        theme="default"
        open
        name="Богемская рапсодия"
        url="https://www.youtube.com/embed/fXImc5fr7jc"
        onCloseClick={action('Close ModalWindowTrailer')}
      />
    ))
    .add('NewPassword', () => (
      <NewPassword theme="default" open />
    ))
    .add('SetEmail', () => (
      <SetEmail theme="default" open />
    ))
    .add('SetEmailRemindPassword', () => (
      <SetEmailRemindPassword theme="default" open />
    ))
    .add('ModalWindowCriticalError', () => (
      <ModalWindowCriticalError theme="default" open />
    ))
    .add('ModalWindowInactivity', () => (
      <ModalWindowInactivity theme="default" open />
    ))
    .add('ModalWindowAuthorizationEmail', () => (
      <ModalWindow
        theme="default"
        open
        onCloseClick={action('Close ModalWindowAuthorizationEmail')}
        closeButton
      >
        <Title>Вход для покупки билетов</Title>
        <Authorization theme="default" />
      </ModalWindow>
    ))
    .add('ModalWindowAuthorizationEmailDesign2', () => (
      <ModalWindow
        theme="default"
        open
        onCloseClick={action('Close ModalWindowAuthorizationEmailDesign2')}
        closeButton
      >
        <AuthorizationD2
          theme="default"
          onOpenRegModalClick={action('Open RegistrationModalWindow')}
        />
      </ModalWindow>
    ))
    .add('ModalWindowRegistration', () => (
      <ModalWindow
        theme="default"
        open
        onCloseClick={action('Close ModalWindowRegistration')}
        closeButton
        registrationModal
      >
        <Registration
          theme="default"
          onOpenRegModalClick={action('Open ModalWindowAuthorizationEmailDesign2')}
        />
      </ModalWindow>
    ))
    .add('ModalWindowAuthorization', () => (
      <ModalWindow
        theme="default"
        open
        onCloseClick={action('Close ModalWindowAuthorization')}
        closeButton
      >
        <Title>Вход для покупки билетов</Title>
        <Authorization theme="default" authorization />
      </ModalWindow>
    ))
    .add('ModalWindowProductsSelection', () => (
      <ModalWindow
        theme="default"
        open
        onCloseClick={action('Close ModalWindowProductsSelection')}
        closeButton
      >
        <Title>Выбор продуктов</Title>
        <ProductsSelection />
      </ModalWindow>
    ));
  storiesOf('MovieSession', module)
    .add('MovieSessionHeader', () => (
      <MovieSessionHeader
        title="Прогулка по Риму"
        poster="https://silverscreen.by/cache/d86/9e1/d148b05e8bd6bbea686f87ba3dacba33.jpg"
        genre="приключения"
        ageLimit="6+"
        duration="1 ч 55 мин"
      />
    ))
    .add('MovieSessionTrailer', () => (
      <MovieSessionTrailer
        title="Прогулка по Риму"
        link="http://google.com"
        trailer="http://youtube.com/progulka"
        description="Франческо исполнилось 9 лет, и семья подарила ему билеты в Рим, чтобы увидеть знаменитую Сикстинскую капеллу.
                    Настал долгожданный день поездки, но непредвиденные проблемы заставляют вернуться из Рима раньше."
        image="https://img.youtube.com/vi/Y3LwPEZ3kN0/mqdefault.jpg"
      />
    ))
    .add('ShowTimes', () => (
      <ShowTimes
        cinemaName="Silver Screen cinemas в ТРЦ 'Galileo'"
        cinemaAddress="г. Минск, ул.Бобруйская, 6"
      >
        <ShowTimesItem
          time="13:40"
          typeVideo="2D"
          typeAudio="Dolby Digital"
          hallTitle="Зал 2"
          filled={90}
        />
        <ShowTimesItem
          time="17:40"
          locked
        />
      </ShowTimes>
    ))
    .add('DayFilter', () => (
      <DayFilter>
        <Button secondary>Завтра</Button>
        <Button secondary>Завтра</Button>
      </DayFilter>
    ));

  storiesOf('Profile table', module)
    .add('Profile table', () => <ProfileTable />);

  storiesOf('Footer', module)
    .add('Footer', () => (
      <Footer
        linkVk="vk.com"
        linkFb="fb.com"
        linkInstagram="instagram.com"
        legal="ООО «Просто кино». Местонахождение: г.Минск, ул.Бобруйская,д.6, пом.107, пом. 19.
          Свидетельство о государственной регистрации № 192211249 (УНП) от 10.02.2014, выдано Мингорисполкомом.
          Сведения о регистрации в Торговом реестре Республики Беларусь интернет-магазина:
          зарегистрирован 23.04.2018 Администрацией Центрального района г. Минска, №413086.
          Режим работы интернет магазина – круглосуточно."
      >
        <FooterLinkGroup title="Афиша">
          <FooterLinkItem link="/afisha/" title="Сейчас в кино" />
          <FooterLinkItem link="/afisha/#/view/special/" title="Спецпроекты" />
          <FooterLinkItem link="/afisha/#/view/upcoming/" title="Скоро" />
        </FooterLinkGroup>
        <FooterLinkGroup title="Кинотеатры">
          <FooterLinkItem link="/cinemas/minsk/galileo/" title="Galileo" />
          <FooterLinkItem link="/cinemas/minsk/dana/" title="VOKA cinema" />
          <FooterLinkItem link="/cinemas/minsk/arena/" title="ARENAcity" />
          <FooterLinkItem link="/afisha/#/view/live/cinema/minsk/format-tech/DA/" title="Звук Dolby Atmos" />
          <FooterLinkItem link="/cinemas/more/silverglasses/" title="3D-очки" />
          <FooterLinkItem link="/info/visitors/giftcards/" title="Подарочные карты" />
        </FooterLinkGroup>
        <FooterLinkGroup title="Red Carpet Club">
          <FooterLinkItem link="/rcc/club/" title="О киноклубе" />
          <FooterLinkItem link="/rcc/start/" title="Как стать участником" />
          <FooterLinkItem link="/rcc/rules/" title="Правила киноклуба" />
        </FooterLinkGroup>
        <FooterLinkGroup title="Еда и напитки">
          <FooterLinkItem link="/products/cinema-bar/popkorn/" title="Попкорн" />
          <FooterLinkItem link="/products/cinema-bar/napitki/" title="Напитки" />
          <FooterLinkItem link="/products/cinema-bar/sneki/" title="Снеки" />
          <FooterLinkItem link="/products/cinema-bar/morozhennoe-i-slashi/" title="Мороженое и слаши" />
        </FooterLinkGroup>
        <FooterLinkGroup title="Инфо">
          <FooterLinkItem link="/info/visitors/ad/" title="Акции" />
          <FooterLinkItem link="/info/visitors/news/" title="Новости" />
          <FooterLinkItem link="/info/visitors/age/" title="Возрастной рейтинг" />
          <FooterLinkItem link="/info/visitors/rules/" title="Правила оказания услуг" />
          <FooterLinkItem link="/info/about/vacancies/" title="Карьера и вакансии" />
          <FooterLinkItem link="/info/cooperation/advertising/" title="Реклама в кинотеатре" />
          <FooterLinkItem link="/info/about/contacts/" title="Контакты" />
          <FooterLinkItem link="#/download/ticket" title="Скачать билет" />
          <FooterLinkItem link="/movies-list-page" title="Карта фильмов" />
        </FooterLinkGroup>
      </Footer>
    ));

  storiesOf('Modal Page', module)
    .add('Default view', () => (
      <ModalPage
        theme="default"
        title="My newest Modal Page!"
        poster="https://i.pinimg.com/736x/55/e3/d0/55e3d0767a7da472bddf53e882a47060.jpg"
        backButton
        closeButton
        onBackClick={action('clicked back')}
        onCloseClick={action('clicked close')}
      >
        <div>
          1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />
          1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />
          1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />
          1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />
        </div>
      </ModalPage>
    ));

  storiesOf('Pages', module)
    .add('Main page', () => <MainPage />);

  storiesOf('Profile archive', module)
    .add('Profile archive without history', () => <ProfileArchiveWithoutHistory />);

  storiesOf('Profile archive', module)
    .add('Profile archive without upcoming', () => <ProfileArchiveWithoutUpcoming />);

  storiesOf('Profile archive', module)
    .add('Profile archive full', () => <ProfileArchiveFull />);

  const testCards = [
    {
      id: 1,
      number: '1535',
      title: 'JMORGAN Bank',
      valid: '08/21',
      type: 'mastercard',
    },
    {
      id: 2,
      number: '1542',
      title: 'Alpha Bank personal card',
      valid: '09/23',
      type: 'visa',
    },
  ];

  storiesOf('Cards list', module)
    .add('No cards', () => <CardsList />)
    .add('With cards', () => <CardsList cards={testCards} />);

  const RCCTicketsNumbers = [
    5,
    20,
    47,
    61,
  ];
  const RCCTestLevels = [
    {
      ticketsNumber: 19,
      discount: 0,
      title: 'Новичок',
      color: '',
    },
    {
      ticketsNumber: 20,
      discount: 5,
      title: 'Любитель',
      color: '',
    },
    {
      ticketsNumber: 40,
      discount: 10,
      title: 'Киноман',
      color: '#0083d0',
    },
    {
      ticketsNumber: 60,
      discount: 15,
      title: 'Эксперт',
      color: '#d00047',
    },
  ];

  storiesOf('RCC Diagram', module)
    .add('0% discount', () => (
      <RCCDiagram
        ticketsNumber={RCCTicketsNumbers[0]}
        levels={RCCTestLevels}
      />
    ))
    .add('5% discount', () => (
      <RCCDiagram
        ticketsNumber={RCCTicketsNumbers[1]}
        levels={RCCTestLevels}
      />
    ))
    .add('10% discount', () => (
      <RCCDiagram
        ticketsNumber={RCCTicketsNumbers[2]}
        levels={RCCTestLevels}
      />
    ))
    .add('15% discount', () => (
      <RCCDiagram
        ticketsNumber={RCCTicketsNumbers[3]}
        levels={RCCTestLevels}
      />
    ));

  storiesOf('Select', module)
    .add('default', () => (
      <Select labelText="Make your choise">
        <SelectOption value={1} active name="something" />
        <SelectOption value={2} name="something more" />
      </Select>
    ))
    .add('Input like', () => (
      <Select
        inputLike
        labelText="Пол"
        onChange={e => console.log(e)}
      >
        <SelectOption value={1} active name="Не выбран" />
        <SelectOption value={2} name="Андроген" />
        <SelectOption value={3} name="Мужеженственный" />
        <SelectOption value={4} name="Бигендер" />
        <SelectOption value={5} name="Неустойчивый" />
        <SelectOption value={6} name="Межполовой" />
        <SelectOption value={7} name="Вариантный" />
        <SelectOption value={8} name="Мужской" />
        <SelectOption value={9} name="Женский" />
        <SelectOption value={10} name="Переходной" />
      </Select>
    ));

  storiesOf('Pagination', module)
    .add('Pagination default 2 ', () => (
      <Pagination
        current={2}
        total={5}
        onChange={action(inputValue => (inputValue))}
      />
    ))
    .add('Pagination default 3', () => (
      <Pagination
        current={3}
        total={5}
        onChange={action(inputValue => (inputValue))}
      />
    ));

  storiesOf('Payment Method', module)
    .add('Default view', () => (
      <PaymentMethod
        theme="default"
        value="My card"
        onChange={action(inputValue => (inputValue))}
      >
        <MyCard cardNumber="1111" />
        <AnyCard linkingCard={action(inputValue => (inputValue))} />
        <VisaGold />
        <VisaPlatinum />
        <VisaInfinite />
        <Certificate submitCertificate={action(inputValue => (inputValue))} />
      </PaymentMethod>
    ));

  storiesOf('Vertical Slider', module)
    .add('Default view', () => (
      <VerticalSlider
        theme="default"
        images={[
          {
            src: 'https://silverscreen.by/upload/iblock/3fa/3fa88550a63478e8e75c3b4913a76cbc.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/a70/a70e28fc50f81e87a438c2e3a91a899c.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/36a/36a2984d245bf72aed118cccade1c4cc.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/5f2/5f21c2b1015e6fa3636db7b206073d65.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/80e/80e8da72d159e717f0c9707a68d5fa9d.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/030/030acd95dbd17e74c3c825a87f47a2ed.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/85f/85ffce586283d6dbc7f0d51715d555fe.jpg',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/847/847aec0374dda1f8b83f49336277278a.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/caa/caaf9bc84c99db6e2a79aa49cf7873b7.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/a1a/a1ac3f4e72df2c59503a9e76e6bf07ab.png',
          },
        ]}
      />
    ));

  storiesOf('Photo gallery', module)
    .add('Default view', () => (
      <PhotoGallery
        theme="default"
        title="Фотогалерея"
        images={[
          {
            src: 'https://silverscreen.by/upload/iblock/3fa/3fa88550a63478e8e75c3b4913a76cbc.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/a70/a70e28fc50f81e87a438c2e3a91a899c.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/36a/36a2984d245bf72aed118cccade1c4cc.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/5f2/5f21c2b1015e6fa3636db7b206073d65.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/80e/80e8da72d159e717f0c9707a68d5fa9d.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/030/030acd95dbd17e74c3c825a87f47a2ed.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/85f/85ffce586283d6dbc7f0d51715d555fe.jpg',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/847/847aec0374dda1f8b83f49336277278a.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/caa/caaf9bc84c99db6e2a79aa49cf7873b7.png',
          },
          {
            src: 'https://silverscreen.by/upload/iblock/a1a/a1ac3f4e72df2c59503a9e76e6bf07ab.png',
          },
        ]}
      />
    ));

  storiesOf('Notification', module)
    .add('e-mail', () => (
      <div>
        <Button
          onClick={() => root.pushNotification({
            timeout: 60000,
            body: (
              <Text>
                Приобретенные билеты будут отправлены на адрес <b>крутой_адрес@tapston.com</b>
              </Text>),
            title: 'Адрес для билетов',
            firstButton: {
              submit: true,
              name: 'OK',
              onClick: () => {},
            },
            secondButton: {
              type: 'alt',
              name: 'Изменить e-mail',
              onClick: () => {},
            },
          })}
        >
          Click me
        </Button>
        <Notification theme="default" />
      </div>
    ))
    .add('Submit', () => (
      <div>
        <Button
          onClick={() => root.pushNotification({
            timeout: 6000,
            text: 'Кина не будет, дружок',
            body: 'Ну все',
            firstButton: {
              type: 'alt',
              submit: true,
              name: 'OK',
              onClick: () => {},
            },
          })}
        >
          Click me
        </Button>
        <Notification theme="default" />
      </div>
    ))
    .add('No buttons', () => (
      <div>
        <Button
          onClick={() => root.pushNotification({
            timeout: 6000,
            body: 'Кина не будет, дружок',
          })}
        >
          Click me
        </Button>
        <Notification theme="default" />
      </div>
    ));

  storiesOf('Vacancy', module)
    .add('Vacancy', () => (
      <div>
        <Vacancy hot theme="default" />
        <Vacancy theme="default" />
      </div>
    ));

  const DATA_ONE = {
    title: 'Капитан Марвел',
    picture: 'https://st.kp.yandex.net/images/film_iphone/iphone360_843859.jpg',
    ageLimit: '12+',
    language: 'RU',
    genres: ['фантастика', 'боевик'],
    eventsUrl: '',
    movieUrl: '',
    events: [
      {
        time: '17:00',
        url: '',
      },
      {
        time: '17:05',
        url: '',
      },
      {
        time: '17:10',
        url: '',
      },
      {
        time: '17:30',
        url: '',
      },
      {
        time: '17:40',
        url: '',
      },
    ],
  };

  const DATA_TWO = {
    title: 'Зялёная кнiга',
    picture: 'https://festagent.com/system/tilda/tild3562-6362-4762-b036-653363663832__a01ccf32943f670ef632.jpg',
    ageLimit: '16+',
    language: 'BY',
    genres: ['биография', 'комедия', 'драма'],
    eventsUrl: '',
    movieUrl: '',
    events: [
      {
        time: '17:00',
        url: '',
      },
      {
        time: '17:05',
        url: '',
      },
      {
        time: '17:10',
        url: '',
      },
    ],
  };

  const DATA_THREE = {
    title: 'Гости',
    picture: 'https://silverscreen.by/cache/204/279/d62f867b39ba6b6412c0ee08312ca036.jpg',
    ageLimit: '16+',
    language: 'RU',
    genres: ['ужасы', 'триллер'],
    eventsUrl: '',
    movieUrl: '',
    events: [
      {
        time: '17:00',
        url: '',
      },
    ],
    showStart: '3.3.2019',
  };

  storiesOf('Movie afisha', module)
    .add('DefaultOne', () => (
      <MovieAfisha data={DATA_ONE} />
    ))
    .add('DefaultTwo', () => (
      <MovieAfisha data={DATA_TWO} />
    ))
    .add('DefaultThree', () => (
      <MovieAfisha data={DATA_THREE} />
    ));

  const REVIEW_ONE = {
    picture: 'https://lh3.googleusercontent.com/-1X_wxB4c_gY/AAAAAAAAAAI/AAAAAAAAG7c/xq_FwVHihgA/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg',
    username: '-_- Rasst -_-',
    content: 'Отличный кинотеатр. Цены не завышают. Сиденья удобные и мягкие, устроены так, чтобы голова впереди сидящего не мешала. Качество картинки хорошее и звук приятный. Не бьющий в уши. Отдельный лайк за 3д очки. Да, их надо покупать, но зато 1) У вас будут свои 3д очки. 2) Не надо каждый раз надевать поцарапаные и заляпанные очки. Интерьер самого кинотеатра тоже очень радует. Он не похож на какие нибудь старинные здания с облезлой штукатуркой и тд. Выглядит по современному. Также там есть магазин с попкорном, напитками и тд. Цены большие, но это проблема ВСЕХ кинотеатров, поэтому еду лучше приносить с собой. Всем советую этот кинотеатр. 10/10.',
    date: '2 марта, 2019',
    star: '2',
  };

  const REVIEW_TWO = {
    picture: 'https://lh5.googleusercontent.com/-p7cXlaTQB1U/AAAAAAAAAAI/AAAAAAAAAGA/srAImouqmpg/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg',
    username: 'Alexander Charopka',
    content: ' Отличный современный кинотеатр. Семь зрительных залов. Два из них VIP, мои любимые. В них кресла трансформируются в почти кровать одним нажатием кнопки. Кресла широкое и удобные, есть откидные столики и подстаканнички. Широкие экраны.Проекторы классные, по моему от SONY. Звук Dolby также не подкачал. Некоторые залы снабжены двойными диванчиками  для влюблённых парочек.  В холле имеется снэк-бар,   где можно выбрать попкорн различных вкусов,    смиксовать себе пакетик конфет, приобрести мороженое и напитки. На территории кинотеатра есть и небольшое кафе. Для любителей чтения на стенах организованы полки с книгами! В общем, всё для человека и его культурного досуга! ВСЕМ РЕКОМЕНДУЮ!!!',
    date: '3 марта, 2019',
    star: '3',
  };

  storiesOf('Review', module)
    .add('DefaultOne', () => (
      <Review data={REVIEW_ONE} />
    ))
    .add('DefaultеTwo', () => (
      <Review data={REVIEW_TWO} />
    ));
  storiesOf('NavigationMain', module)
    .add('NavigationMain', () => (
      <NavigationMain>
        <NavigationMainLinkItem link="https://silverscreen.by/info/visitors/ad/" title="Акции и промо" />
        <NavigationMainLinkItem link="https://silverscreen.by/info/visitors/news/" title="Новости" />
        <NavigationMainLinkItem link="https://silverscreen.by/rcc/club/" title="Red Carpet Club" />
      </NavigationMain>
    ));
  storiesOf('Loader', module)
    .add('Loader', () => (
      <Loader />
    ));
  storiesOf('LoaderBlocker', module)
    .add('Default', () => (
      <LoaderBlocker
        firstLine={'Пожалуйста, подождите...'}
        secondLine={'Авторизуемся...'}
      />
    ));
  storiesOf('RccAdvInfo', module)
    .add('DefaultOne', () => (
      <RccAdvInfo
        image="https://silverscreen.by/upload/medialibrary/red/guide2.2.png"
        children="Online анкету заполнить нельзя, так как нужна ваша оригинальная подпись."
        label="Прийти в любой кинотеатр и заполнить анкету"
      />
    ));
  storiesOf('ButtonModalVacancy', module)
    .add('DefaultOne', () => (
      <ButtonModalVacancy
        source="Отправить анкету"
      />
    ));
  storiesOf('ButtonModalRenthall', module)
    .add('DefaultOne', () => (
      <ButtonModalRenthall
        source="Оставить заявку"
      />
    ));
  storiesOf('ButtonImage', module)
    .add('DefaultOne', () => (
      <ButtonImage
        link="https://docs.google.com/forms/d/1D3X6-HcGk07pu6EOPKgfo94dxB_VREKOpR4bewfcX1Y/closedform"
        source="https://silverscreen.by/upload/medialibrary/17f/17f7e0007fcc2c84c33d51688cce5a42.png"
      />
    ));
  storiesOf('RccTable', module)
    .add('StartTable', () => StartTable())
    .add('ClubTable', () => ClubTable());

  storiesOf('CinemaHeader', module)
    .add('1', () => (
      <CinemaHeader
        background="https://silverscreen.by/upload/iblock/42e/42e5417d100631ae896767c5e66ef44d.jpg"
        halls="6 ЭКРАНОВ"
        name="Silver Screen cinemas в ТРЦ 'ArenaCity'"
        address="<p>Минск, пр-т Победителей, 84, ТРЦ ARENAcity, 2–4 этаж</p>"
        leftButtonTitle="Купить билет"
        rightButtonTitle="Контакты и карта"
        styleId={1}
        leftButtonStyle={1}
        rightButtonStyle={2}
        hallsStyle={1}
        nameStyle={1}
        addressStyle={5}
      />
    ));

    storiesOf('PromoLanding', module)
      .add('Page example', () => (
        <React.Fragment>
          <PromoLanding.Banner
            backgroundUrl="https://silverscreen.by/info/screenx/materials/images/header.png"
            firstTitle="Время первых"
            secondTitle="VOKA CINEMA by Silver Screen открывает первый в Восточной Европе кинозал с использованием технологии ScreenX"
            description="Silver Screen задает темп всей киноиндустрии как в Беларуси, так и за ее пределами. Вместе с нашим давним партнером VOKA мы привезли в Беларусь передовую технологию ScreenX. И стали первыми в СНГ, кто открывает кинозал с ее использованием."
            button={{ link: '#link', text: 'Купить билет' }}
          />
          <PromoLanding.BigText text="ScreenX" />
          <PromoLanding.Text text="Уникальная технология воспроизведения изображения: пять проекторов и два дополнительных боковых экрана создают панорамное изображение с углом обзора в 270 градусов. Такой формат просмотра задействует периферийное зрение, создает абсолютно новые ощущения от просмотра и позволяет рассмотреть все то, что осталось за кадром. Зритель буквально переносится в сцену фильма и становится ее полноправным участником." />
          <PromoLanding.Advantages
            items={[
              { number: '1', description: 'Полное погружение в фильм' },
              { number: '2', description: 'Невероятная детализация изображения' },
              { number: '3', description: 'Угол обзора 270 градусов' },
            ]}
          />
          <PromoLanding.Video embedId="Na_XvEzAZnU" />
          <PromoLanding.Footer
            items={[
              { iconName: 'location', text: 'VOKA CINEMA by Silver Screen в ТРЦ “Dana Mall”, г. Минск, ул. Петра Мстиславца 11, ТРЦ “Dana Mall”, 3 этаж' },
              { iconName: 'fence', text: 'ScreenX зал (зал №3)' },
            ]}
          />
        </React.Fragment>
      ))
      .add('Header', () => (
        <PromoLanding.Banner
          backgroundUrl="https://silverscreen.by/info/screenx/materials/images/header.png"
          firstTitle="Время первых"
          secondTitle="VOKA CINEMA by Silver Screen открывает первый в Восточной Европе кинозал с использованием технологии ScreenX"
          description="Silver Screen задает темп всей киноиндустрии как в Беларуси, так и за ее пределами. Вместе с нашим давним партнером VOKA мы привезли в Беларусь передовую технологию ScreenX. И стали первыми в СНГ, кто открывает кинозал с ее использованием."
          button={{ link: '#link', text: 'Купить билет' }}
        />
      ))
      .add('BigText', () => (
        <PromoLanding.BigText text="ScreenX" />
      ))
      .add('Text', () => (
        <PromoLanding.Text text="Уникальная технология воспроизведения изображения: пять проекторов и два дополнительных боковых экрана создают панорамное изображение с углом обзора в 270 градусов. Такой формат просмотра задействует периферийное зрение, создает абсолютно новые ощущения от просмотра и позволяет рассмотреть все то, что осталось за кадром. Зритель буквально переносится в сцену фильма и становится ее полноправным участником." />
      ))
      .add('Advantages', () => (
        <PromoLanding.Advantages
          items={[
            { number: '1', description: 'Полное погружение в фильм' },
            { number: '2', description: 'Невероятная детализация изображения' },
            { number: '3', description: 'Угол обзора 270 градусов' },
          ]}
        />
      ))
      .add('Video', () => (
        <PromoLanding.Video embedId="Na_XvEzAZnU" />
      ))
      .add('Footer', () => (
        <PromoLanding.Footer
          items={[
            { iconName: 'location', text: 'VOKA CINEMA by Silver Screen в ТРЦ “Dana Mall”, г. Минск, ул. Петра Мстиславца 11, ТРЦ “Dana Mall”, 3 этаж' },
            { iconName: 'fence', text: 'ScreenX зал (зал №3)' },
          ]}
        />
      ));
}, module);
