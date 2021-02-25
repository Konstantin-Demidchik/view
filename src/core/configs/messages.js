const MSG_API_FAIL = 'Ошибка связи с сервером';

/**
 * Сообщения регистрации
 */
const MSG_REG_NAME_FAIL = 'Минимальная длина имени - 1 символ. Имя может содержать только кириллические и латинские символы';
const MSG_REG_SURNAME_FAIL = 'Минимальная длина фамилии - 1 символ. Фамилия может содержать только кириллические и латинские символы';
const MSG_REG_EMAIL_FAIL = 'Неверный формат email';
const MSG_REG_PASSWORD_FAIL = 'Минимальная длина пароля - 8 символов. Пароль должен содержать символы A-z 0-9 или специальные символы кроме пробела';
const MSG_REG_PASSWORD_EQUALS_FAIL = 'Пароли не совпадают';

/**
 * Сообщения страницы скачивания билета
 */
const MSG_DOWNLOAD_TICKET_TRADINGID_FAIL = 'Введите целое число';
const MSG_DOWNLOAD_TICKET_EMAIL_FAIL = 'Введите корректную электронную почту';
const MSG_DOWNLOAD_TICKET_UNKNOWN_FAIL = 'Билет не найден. Пожалуйста, проверьте правильность ввода данных и попробуйте еще раз.';

/**
 * Сообщения страницы выдачи билета
 */
const MSG_TICKET_FAIL = 'Не удалось получить билет, попробуйте позже';
const MSG_TICKET_NOT_FOUND = 'Билет не найден';
const MSG_TICKET_INCORRECT_DATA = 'Некорректные данные билета, обратитесь в тех.поддержку';

/**
 * Сообщения StarWars
 */
const MSG_SW_TITLES = [
  'Не найдена страница твоя',
  'Не была загружена страница твоя, попробуй вернуться немного позже',
];
const MSG_SW_QUOTES = [
  'Тенью жадности привязанность является. Должен научиться отказываться ты от того, что боишься потерять. Из головы страх выкинь, и потеря не причинит вреда тебе',
  'Гнев, страх, агрессия! Это Тёмная сторона Силы. Легко приходят, но тяжела цена за мощь, которую они дают',
];
const MSG_SW_NOTES = [
  'Звездные войны: Эпизод 3 — Месть Ситхов',
];

const MSG_EMAIL_ALREADY_EXIST = 'Такой Email уже существует!';
const MSG_SUCCESS_REGISTRATION = 'Спасибо за регистрацию. На вашу почту отправлено письмо для подтверждения регистрации';
const MSG_FAIL_REGISTRATION = 'Ошибка регистрации';
const MSG_INCORRECT_EMAIL = 'Неверный формат email!';
const MSG_USER_IS_NOT_FOUND = 'Пользователь не найден';
const MSG_YOU_ARE_NOT_REGISTRED = 'Скорее всего вы еще не зарегистрированы';
const MSG_WRONG_PASSWORD = 'Неверный пароль';
const MSG_RESTORE_PASSWORD = 'Не удалось войти. Восстановить пароль?';
const MSG_WELCOME = 'Добро пожаловать, ';
const MSG_WELCOME_CLEAN = 'Добро пожаловать';
const MSG_ADDED_VK = 'Соцсеть "ВКонтакте" добавлена к вашему профилю';
const MSG_ADDED_FB = 'Соцсеть "Facebook" добавлена к вашему профилю';
const MSG_ALREADY_IN_USED = 'Соцсеть уже используется другим профилем!';
const MSG_EMAIL_IS_SENDED = 'Ссылка для смены пароля отправлена на почту';
const MSG_PASSWORD_IS_UPDATED = 'Пароль изменен';
const MSG_FIELDS_ARE_INCORRECT = 'Поля заполнены некорректно';
const MSG_FIELD_EMAIL_EMPTY = 'Необходимо заполнить поле "E-mail"';
const MSG_FIELD_PASSWORD_EMPTY = 'Необходимо заполнить поле "Пароль"';
const MSG_CONFIRM_EMAIL = 'E-mail не подтвержден';
const MSG_FAIL_BOOK_PLACE = 'Не удалось забронировать место';
const MSG_EMAIL_IS_UPDATED = 'E-mail обновлен';
const MSG_WRONG_EMAIL = 'Неверный формат e-mail';
const MSG_NO_ACTIVE_EMAIL = 'E-mail не активирован';
const MSG_SERTIFICATE_OK = 'Сертификат успешно применен';

const MSG_FAIL_CANSEL_BOOKING = 'Не удалось отменить бронь';
const MSG_COUNT_BASKET = 'В корзину можно положить не более 10 билетов. Продажа групповых билетов возможна на кассе в кинотеатре.';
const MSG_NOT_FOUND_PROMO = 'Пожалуйста, проверьте правильность ввода и попробуйте еще раз.';

const MSG_EMPTY_EMAIL = 'Введите e-mail в поле подписки';

/**
 * Сообщения профиля
 */
const MSG_PROFILE_NAME_FAIL = 'Минимальная длина имени - 1 символ. Имя может содержать только кириллические и латинские символы';
const MSG_PROFILE_SURNAME_FAIL = 'Минимальная длина фамилии - 1 символ. Фамилия может содержать только кириллические и латинские символы';
const MSG_PROFILE_EMAIL_FAIL = 'Неверный формат email';
const MSG_PROFILE_PHONE_FAIL = 'Мобильный телефон может содержать только цифры, +, пробел, (), - ';
const MSG_PROFILE_BIRTHDAY_FAIL = 'Необходимо заполнить дату рождения';
const MSG_PROFILE_INCORRECT_BIRTHDAY = 'Возможно дата рождения заполнена некорректно. Проверьте правильность ввода';
const MSG_PROFILE_PASSWORD_FAIL = 'Минимальная длина пароля - 8 символов. Пароль должен содержать символы A-z 0-9 или специальные символы кроме пробела';
const MSG_PROFILE_PASSWORD_EQUALS_FAIL = 'Пароли не совпадают';

/**
 * Сообщения о подарочных картах
 */
const MSG_GIFTCARD_EMPTY = 'Введите номер подарочной карты';
const MSG_GIFTCARD_NOT_FOUND = 'Подарочная карта не найдена';
const MSG_GIFTCARD_LENGTH = 'Введите номер подарочной карты';
const MSG_GIFTCARD_UNKNOWN = 'Ошибка получения подарочной карты. Проверьте введенные данные';
const MSG_FAIL_CANSEL_PROMO = 'Ошибка. Невозможно удалить промокод';

/**
 * Сообщения поиска
 */
const MSG_SEARCH_UNKNOWN = 'Ошибка поиска. Введите другой запрос, либо зайдите немного позже';

/**
 * Сообщения страницы ожидания оплаты
 */
const MSGS_PAYMENT_CHECK = {
  HACKING: 'Некорректные данные, обратитесь к администрации',
  INCORRECT: 'Некорректный статус, обратитесь к администрации',
  GETTING_STATUS: 'Подождите немного, идёт обработка платежа',
  SUCCESS: 'Оплата произведена успешно! Сейчас Вы будете перенаправлены на страницу получения билета',
  FAILED: 'Оплата не была произведена',
};

/**
 * Таймзона
 */
const NOT_RIGHT_TIMEZONE = 'Системное время Вашего устройства не совпадает с серверным временем кинотеатров Silver Screen (GMT+03:00). Все сеансы отображаются по Минскому времени. Пожалуйста, измените часовой пояс на Вашем устройстве для корректной работы сайта.';

export {
  MSG_API_FAIL,
  MSG_REG_NAME_FAIL,
  MSG_REG_SURNAME_FAIL,
  MSG_REG_EMAIL_FAIL,
  MSG_REG_PASSWORD_FAIL,
  MSG_REG_PASSWORD_EQUALS_FAIL,
  MSG_DOWNLOAD_TICKET_TRADINGID_FAIL,
  MSG_DOWNLOAD_TICKET_EMAIL_FAIL,
  MSG_DOWNLOAD_TICKET_UNKNOWN_FAIL,
  MSG_TICKET_FAIL,
  MSG_TICKET_NOT_FOUND,
  MSG_TICKET_INCORRECT_DATA,
  MSG_SW_TITLES,
  MSG_SW_QUOTES,
  MSG_SW_NOTES,
  MSG_SUCCESS_REGISTRATION,
  MSG_FAIL_REGISTRATION,
  MSG_EMAIL_ALREADY_EXIST,
  MSG_INCORRECT_EMAIL,
  MSG_USER_IS_NOT_FOUND,
  MSG_YOU_ARE_NOT_REGISTRED,
  MSG_WRONG_PASSWORD,
  MSG_RESTORE_PASSWORD,
  MSG_WELCOME,
  MSG_WELCOME_CLEAN,
  MSG_FAIL_BOOK_PLACE,
  MSG_ADDED_VK,
  MSG_ADDED_FB,
  MSG_ALREADY_IN_USED,
  MSG_EMAIL_IS_SENDED,
  MSG_PASSWORD_IS_UPDATED,
  MSG_FIELDS_ARE_INCORRECT,
  MSG_FIELD_EMAIL_EMPTY,
  MSG_FIELD_PASSWORD_EMPTY,
  MSG_CONFIRM_EMAIL,
  MSG_PROFILE_NAME_FAIL,
  MSG_PROFILE_SURNAME_FAIL,
  MSG_PROFILE_EMAIL_FAIL,
  MSG_PROFILE_PHONE_FAIL,
  MSG_PROFILE_BIRTHDAY_FAIL,
  MSG_PROFILE_PASSWORD_FAIL,
  MSG_PROFILE_PASSWORD_EQUALS_FAIL,
  MSG_EMAIL_IS_UPDATED,
  MSG_WRONG_EMAIL,
  MSG_EMPTY_EMAIL,
  MSG_GIFTCARD_EMPTY,
  MSG_GIFTCARD_NOT_FOUND,
  MSG_GIFTCARD_LENGTH,
  MSG_GIFTCARD_UNKNOWN,
  MSG_SEARCH_UNKNOWN,
  MSG_PROFILE_INCORRECT_BIRTHDAY,
  MSGS_PAYMENT_CHECK,
  MSG_FAIL_CANSEL_BOOKING,
  MSG_COUNT_BASKET,
  MSG_NOT_FOUND_PROMO,
  MSG_FAIL_CANSEL_PROMO,
  MSG_NO_ACTIVE_EMAIL,
  MSG_SERTIFICATE_OK,
  NOT_RIGHT_TIMEZONE,
};
