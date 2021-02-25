import { getWindow } from '../functions/browser';

const SITE_ADDRESS = 'https://stage.silverscreen.by';

const RIGHT_TIMEZONE_OFFSET = -180;

const NOTIFICATION_TIMEOUT = 6000;

const RECAPTCHA_SITE_KEY = '6LekH8YUAAAAAOtJLPvpkdIWOiau5fyJ94s0BAvo';

const CLIENT_ID_VK = '7146163';
const CLIENT_ID_FB = '507927466665027';

const REDIRECT_URI = 'https://silverscreen.by';

const VK_CODE = (clientId, redirectUri) => `https://oauth.vk.com/authorize?client_id=${clientId}&display=popup&redirect_uri=${redirectUri}&response_type=code&v=5.95&state=authorization_vk:${getWindow().location.pathname};${getWindow().location.hash.slice(1).replace('&', ',')}`;
const FB_CODE = (clientId, redirectUri) => `https://www.facebook.com/v2.9/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}/&response_type=code&state=authorization_fb:${getWindow().location.pathname};${getWindow().location.hash.slice(1).replace('&', ',')}`;

const API_VK_CODE = () => VK_CODE(CLIENT_ID_VK, REDIRECT_URI);
const API_FB_CODE = () => FB_CODE(CLIENT_ID_FB, REDIRECT_URI);

const VK_CODE_ADDED = (clientId, redirectUri) => `https://oauth.vk.com/authorize?client_id=${clientId}&display=popup&redirect_uri=${redirectUri}&response_type=code&v=5.95&state=added_vk:${getWindow().location.pathname};${getWindow().location.hash.slice(1).replace('&', ',')}`;
const FB_CODE_ADDED = (clientId, redirectUri) => `https://www.facebook.com/v2.9/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}/&response_type=code&state=added_fb:${getWindow().location.pathname};${getWindow().location.hash.slice(1).replace('&', ',')}`;

const API_VK_CODE_ADDED = () => VK_CODE_ADDED(CLIENT_ID_VK, REDIRECT_URI);
const API_FB_CODE_ADDED = () => FB_CODE_ADDED(CLIENT_ID_FB, REDIRECT_URI);

const FB_CODE_REG = (clientId, redirectUri) => `https://www.facebook.com/v2.9/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}/&response_type=code&state=registration_fb:${getWindow().location.pathname};${getWindow().location.hash.slice(1).replace('&', ',')}`;
const VK_CODE_REG = (clientId, redirectUri) => `https://oauth.vk.com/authorize?client_id=${clientId}&display=popup&redirect_uri=${redirectUri}&response_type=code&state=registration_vk:${getWindow().location.pathname};${getWindow().location.hash.slice(1).replace('&', ',')}&v=5.95`;

const API_FB_CODE_REG = () => FB_CODE_REG(CLIENT_ID_FB, REDIRECT_URI);
const API_VK_CODE_REG = () => VK_CODE_REG(CLIENT_ID_VK, REDIRECT_URI);

const PAYMENT_OK_CHECK_INTERVAL = 3000;
const PAYMENT_OK_CHECK_MAX_ITERATIONS = 300;

export {
  SITE_ADDRESS,
  RIGHT_TIMEZONE_OFFSET,
  NOTIFICATION_TIMEOUT,
  RECAPTCHA_SITE_KEY,
  API_FB_CODE,
  API_VK_CODE,
  API_VK_CODE_ADDED,
  API_FB_CODE_ADDED,
  API_VK_CODE_REG,
  API_FB_CODE_REG,
  PAYMENT_OK_CHECK_INTERVAL,
  PAYMENT_OK_CHECK_MAX_ITERATIONS,
};
