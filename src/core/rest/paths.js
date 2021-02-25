import { SITE_ADDRESS } from '../configs/site';

const API_URL = 'https://soft.silverscreen.by:8443';
const API_STATE = 'https://soft.silverscreen.by:8443/wssite/webapi/connection';
const API_SOCKET = 'wss://soft.silverscreen.by:8443/wsticketv2/broadcast/';

const API_ALL_EVENTS = '/wssite/webapi/event?extended=true';

const API_SEARCH = '/wssite/webapi/pages/search';
const API_PROFILE = '/wssite/webapi/pages/tab?subpage=rcc';

const API_PAGE_MAIN = '/wssite/webapi/pages/main';
const API_PAGE_AFISHA = '/wssite/webapi/pages/afisha';

const API_PAGE_MOVIE_ONE = '/wssite/webapi/pages/film/';
const API_PAGE_MOVIE_EVENT = '/wssite/webapi/event/';

const API_PAGE_MOVIE_PREVIEW = '/wssite/webapi/pages/afisha?subpage=film';

const API_PAGE_RENTHALL = '/wssite/webapi/pages/info?subpage=cooperation&subpage=renthall';
const API_PAGE_ADVERTISING = '/wssite/webapi/pages/info?subpage=cooperation&subpage=advertising';

const API_PAGE_CAREER = '/wssite/webapi/pages/info?subpage=about&subpage=career';
const API_PAGE_CONTACTS = '/wssite/webapi/pages/info?subpage=about&subpage=contacts';
const API_PAGE_VACANCIES = '/wssite/webapi/pages/info?subpage=about&subpage=vacancies';

const API_PAGE_CINEMA_ARENA = '/wssite/webapi/pages/cinemas?subpage=minsk&subpage=arena';
const API_PAGE_CINEMA_DANA = '/wssite/webapi/pages/cinemas?subpage=minsk&subpage=dana';
const API_PAGE_CINEMA_GALILEO = '/wssite/webapi/pages/cinemas?subpage=minsk&subpage=galileo';

const API_PAGE_FREEPARKING = '/wssite/webapi/pages/cinemas?subpage=more&subpage=freeparking';
const API_PAGE_SILVERGLASSES = '/wssite/webapi/pages/cinemas?subpage=more&subpage=silverglasses';
const API_PAGE_ADANTAGES = '/wssite/webapi/pages/cinemas?subpage=advantages&subpage=advantages';

const API_PAGE_FOOD_DESERTS = '/wssite/webapi/pages/products?subpage=cinema-bar&subpage=deserts';
const API_PAGE_FOOD_ICECREAM = '/wssite/webapi/pages/products?subpage=cinema-bar&subpage=morozhennoe-i-slashi';
const API_PAGE_FOOD_HEALTHY = '/wssite/webapi/pages/products?subpage=cinema-bar&subpage=healthy-food';
const API_PAGE_FOOD_DRINKS = '/wssite/webapi/pages/products?subpage=cinema-bar&subpage=napitki';
const API_PAGE_FOOD_POPCORN = '/wssite/webapi/pages/products?subpage=cinema-bar&subpage=popkorn';
const API_PAGE_FOOD_SNACKS = '/wssite/webapi/pages/products?subpage=cinema-bar&subpage=sneki';

const API_PAGE_RCC_CLUB = '/wssite/webapi/pages/rcc?subpage=club';
const API_PAGE_RCC_START = '/wssite/webapi/pages/rcc?subpage=start';
const API_PAGE_RCC_ADVANTAGES = '/wssite/webapi/pages/rcc?subpage=advantages';
const API_PAGE_RCC_RULES = '/wssite/webapi/pages/rcc?subpage=rules';
const API_PAGE_RCC_FAQ = '/wssite/webapi/pages/rcc?subpage=faq';

const API_PAGE_NEWS = '/wssite/webapi/pages/info?subpage=visitors&subpage=news';
const API_PAGE_NEWS_ONE = '/wssite/webapi/pages/info?subpage=visitors&subpage=news&subpage=';

const API_PAGE_PROMO = '/wssite/webapi/pages/info?subpage=visitors&subpage=ad';
const API_PAGE_PROMO_ONE = '/wssite/webapi/pages/info?subpage=visitors&subpage=ad&subpage=';
const API_PAGE_PROMO_OVER = '/wssite/webapi/pages/info?subpage=visitors&subpage=ad&subpage=over';

const API_PAGE_RETURNTICKET = '/wssite/webapi/pages/info?subpage=visitors&subpage=returnticket';
const API_PAGE_SORRYCARD = '/wssite/webapi/pages/info?subpage=visitors&subpage=problem';
const API_PAGE_PRICES = '/wssite/webapi/pages/info?subpage=visitors&subpage=prices';
const API_PAGE_GIFTCARDS = '/wssite/webapi/pages/info?subpage=visitors&subpage=giftcards';
const API_PAGE_RULES = '/wssite/webapi/pages/info?subpage=visitors&subpage=rules';
const API_PAGE_AGE = '/wssite/webapi/pages/info?subpage=visitors&subpage=age';

const API_PAGE_LEGAL_OFFER = '/wssite/webapi/pages/legal?subpage=offer';
const API_PAGE_LEGAL_TERMS = '/wssite/webapi/pages/legal?subpage=terms';

const API_REGISTRATION = '/wssite/webapi/registration';
const API_SET_NEW_PASSWORD = '/wssite/webapi/profile/confirmChange';
const API_AUTORIZATION_EMAIL = '/wssite/webapi/token/create';
const API_ADDED_SOCIAL = '/wssite/webapi/registration/addSocial';
const API_GET_VK_TOKEN = '/wssite/webapi/token/vkcreate';
const API_GET_FB_TOKEN = '/wssite/webapi/token/fbcreate';
const API_CHECK_EMAIL = '/wssite/webapi/email/';
const API_SEND_EMAIL_FOR_REMIND_PASSWORD = '/wssite/webapi/profile/change';
const API_CHANGED_EMAIL = '/wssite/webapi/profile/email';
const API_USER = '/wssite/webapi/profile/info';
const API_UPDATE_USER_DATA = '/wssite/webapi/profile/info';
const API_USER_CHANGE_PASSWORD = '/wssite/webapi/profile/password';
const API_GET_PROFILE_TICKETS = '/wssite/webapi/profile/tickets';
const API_DELETE_CREDIT_CARD = '/wssite/webapi/recurrent';
const API_AUTHORIZATION_CHECK_EMAIL = '/wssite/webapi/email/';
const API_SUBSCRIBE_TO_NEWS = '/wssite/webapi/subscribe/';

const API_SEND_RESUME = '/wssite/webapi/resume/upload';
const API_SEND_RENTHALL = '/wssite/webapi/rent/upload';

const API_GET_TICKET = '/wssite/webapi/ticket';
const API_GET_SEATS = '/wssite/webapi/seats/';
const API_SEND_CARD = '/wssite/webapi/siteLoyalty';
const API_SEND_CERTIFICATE = '/wssite/webapi/pay';
const API_GET_ID_CHECK = '/wssite/webapi/check/create/';
const API_ADD_ITEM_CHECK = '/wssite/webapi/check';
const API_DELETE_BASKET = '/wssite/webapi/check/clear';
const API_PROMOCODE = '/wssite/webapi/loyalty/promocode';
const API_GET_INFO_PRODUCTS = '/wssite/webapi/products/';
const API_CONIFORM_EMAIL = '/wssite/webapi/profile/confirmEmail?token=';
const API_SUBSCRIBE = '/wssite/webapi/subscribe/';
const API_STATUS_CHECK = '/wssite/webapi/check/status/';

const API_PAGE_PAYMENT = '/wssite/webapi/pages/show/';
const API_PAYMENT_ASSIST = '/wssite/webapi/pay/assist';
const API_PAYMENT_NEW_CHECK_ID = '/wssite/webapi/check/newClient';
const API_ASSIST = {
  ORDER: 'https://pay150.paysec.by/pay/order.cfm',
  RETURN_URL_OK: `${SITE_ADDRESS}/payment/assist/ok`,
  RETURN_URL_NO: `${SITE_ADDRESS}/payment/assist/no`,
};

const API_PAGE_ORDER = '/wssite/webapi/pages/order/';

const API_PAGE_COMBO = '/wssite/webapi/pages/products?subpage=cinema-bar&subpage=combo';
const API_PAGE_DOLBYATMOS = '/wssite/webapi/pages/info?subpage=dolbyatmos';

export default API_URL;

export {
  API_ALL_EVENTS,
  API_PAGE_MAIN,
  API_SEARCH,
  API_PROFILE,
  API_PAGE_AFISHA,
  API_PAGE_MOVIE_ONE,
  API_PAGE_RENTHALL,
  API_PAGE_ADVERTISING,
  API_PAGE_CAREER,
  API_PAGE_CONTACTS,
  API_PAGE_VACANCIES,
  API_PAGE_CINEMA_ARENA,
  API_PAGE_CINEMA_DANA,
  API_PAGE_CINEMA_GALILEO,
  API_PAGE_FREEPARKING,
  API_PAGE_SILVERGLASSES,
  API_PAGE_ADANTAGES,
  API_PAGE_FOOD_DESERTS,
  API_PAGE_FOOD_ICECREAM,
  API_PAGE_FOOD_HEALTHY,
  API_PAGE_FOOD_DRINKS,
  API_PAGE_FOOD_POPCORN,
  API_PAGE_FOOD_SNACKS,
  API_PAGE_RCC_CLUB,
  API_PAGE_RCC_START,
  API_PAGE_RCC_ADVANTAGES,
  API_PAGE_RCC_RULES,
  API_PAGE_RCC_FAQ,
  API_PAGE_NEWS,
  API_PAGE_NEWS_ONE,
  API_PAGE_PROMO,
  API_PAGE_PROMO_ONE,
  API_PAGE_PROMO_OVER,
  API_PAGE_RETURNTICKET,
  API_PAGE_SORRYCARD,
  API_PAGE_PRICES,
  API_PAGE_GIFTCARDS,
  API_PAGE_RULES,
  API_GET_SEATS,
  API_PAGE_AGE,
  API_PAGE_LEGAL_OFFER,
  API_PAGE_LEGAL_TERMS,
  API_REGISTRATION,
  API_SET_NEW_PASSWORD,
  API_SEND_RESUME,
  API_SEND_RENTHALL,
  API_SUBSCRIBE_TO_NEWS,
  API_GET_TICKET,
  API_GET_PROFILE_TICKETS,
  API_AUTHORIZATION_CHECK_EMAIL,
  API_AUTORIZATION_EMAIL,
  API_USER,
  API_CHANGED_EMAIL,
  API_GET_ID_CHECK,
  API_ADD_ITEM_CHECK,
  API_UPDATE_USER_DATA,
  API_GET_FB_TOKEN,
  API_GET_VK_TOKEN,
  API_CHECK_EMAIL,
  API_SEND_EMAIL_FOR_REMIND_PASSWORD,
  API_ADDED_SOCIAL,
  API_USER_CHANGE_PASSWORD,
  API_PROMOCODE,
  API_GET_INFO_PRODUCTS,
  API_PAGE_MOVIE_EVENT,
  API_PAGE_MOVIE_PREVIEW,
  API_SOCKET,
  API_PAGE_PAYMENT,
  API_DELETE_CREDIT_CARD,
  API_SEND_CARD,
  API_SEND_CERTIFICATE,
  API_PAYMENT_ASSIST,
  API_PAGE_ORDER,
  API_PAYMENT_NEW_CHECK_ID,
  API_ASSIST,
  API_SUBSCRIBE,
  API_DELETE_BASKET,
  API_CONIFORM_EMAIL,
  API_PAGE_COMBO,
  API_PAGE_DOLBYATMOS,
  API_STATE,
  API_STATUS_CHECK,
};
