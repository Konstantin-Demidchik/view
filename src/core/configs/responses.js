const API_MESSAGES = {
  RESUME_ACCEPTED: 'Resume accepted',
  OK: 'OK',
  EMAIL_ALREADY_USED: 'Пользователь с таким email уже зарегестрирован',
  EMAIL_ALREADY_USED_VK: 'Пользователь с таким email уже зарегестрирован',
  ERROR: 'ERROR',
  EMAIL_DOESNT_EXIST: 'Неверно введены данные',
  EMAIL_DOESNT_CONFIRMED: 'You cannot access this resource - activate account',
  WRONG_PASSWORD: 'Неверный пароль',
  VK_FB_DOESNT_EXIST: 'Такой пользователь не зарегестрирован',
  SOCIAL_ALREADY_EXIST: 'This social network is used already',
  EMAIL_DOESNT_ACTIVE: 'Активируйте аккаунт',
  CHECK_IS_NULL: 'Check is null',
  VK_FB_NOT_ACTIVE_ACCOUNT: 'This user is not activate account',
  YES: 'YES',
};

const RESPONSES_GET_TICKET = {
  ERROR: 'Ошибка при получении билета',
  NOT_FOUND: 'Билет с такими данными не найден',
  GENERATING: 'Генерация билета',
};

export {
  API_MESSAGES,
  RESPONSES_GET_TICKET,
};
