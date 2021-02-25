import { getWindow } from '../functions/browser';

const TOKEN = {
  BASIC: 'auth_basic_token',
  PUBLIC: 'auth_basic_public_token',
  VK: 'auth_vk_token',
  FB: 'auth_fb_token',
};

const TOKEN_STATE = {
  REGISTRATION_VK: 'registration_vk',
  REGISTRATION_FB: 'registration_fb',
  AUTHORIZATION_FB: 'authorization_fb',
  AUTHORIZATION_VK: 'authorization_vk',
  ADDED_FB: 'added_fb',
  ADDED_VK: 'added_vk',
  EMAIL_WITH_PUBLIC_TOKEN: 'email_with_public_token',
};

const TOKEN_AUTH = {
  BASIC: 'auth',
  VK: 'authVK',
  FB: 'authFB',
};

const authTokenObject = () => {
  if (getWindow().localStorage) {
    const BASIC_TOKEN = getWindow().localStorage.getItem(TOKEN.BASIC);
    const PUBLIC_TOKEN = getWindow().localStorage.getItem(TOKEN.PUBLIC);
    const VK_TOKEN = getWindow().localStorage.getItem(TOKEN.VK);
    const FB_TOKEN = getWindow().localStorage.getItem(TOKEN.FB);

    if (BASIC_TOKEN) {
      return {
        type: TOKEN_AUTH.BASIC,
        token: BASIC_TOKEN,
      };
    }

    if (PUBLIC_TOKEN) {
      return {
        type: TOKEN_AUTH.BASIC,
        token: PUBLIC_TOKEN,
      };
    }

    if (VK_TOKEN) {
      return {
        type: TOKEN_AUTH.VK,
        token: VK_TOKEN,
      };
    }


    if (FB_TOKEN) {
      return {
        type: TOKEN_AUTH.FB,
        token: FB_TOKEN,
      };
    }

    return false;
  }

  return false;
};

export {
  TOKEN,
  TOKEN_STATE,
  TOKEN_AUTH,
  authTokenObject,
};
