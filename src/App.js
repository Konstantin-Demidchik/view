/**
 * @flow
 */
import React from 'react';
import {
  compose,
  lifecycle,
  withHandlers,
  withState,
} from 'recompose';

import { connect } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import {
  ReactRouterGlobalHistory,
} from './core/functions/global-history';

import { getWindow } from './core/functions/browser';

import * as PAGES from './pages';
import CMS from './components/cms';
import { FailMessagePage } from './pages';

import {
  loadMovies,
  userExit,
  checkUser,
  loadUserVK,
  loadUserFB,
  loadUser,
} from './store/actions';

import './assets/styles/main.css';
import './assets/styles/animate.min.css';

import { Notification } from './components';
import { TOKEN, TOKEN_AUTH, TOKEN_STATE } from './core/configs/tokens';
import { RIGHT_TIMEZONE_OFFSET } from './core/configs/site';
import {
  MSG_SW_TITLES,
  MSG_SW_QUOTES,
  MSG_SW_NOTES,
  MSG_YOU_ARE_NOT_REGISTRED,
  MSG_USER_IS_NOT_FOUND,
  MSG_ADDED_VK,
  MSG_ALREADY_IN_USED,
  MSG_ADDED_FB,
  MSG_NO_ACTIVE_EMAIL,
  NOT_RIGHT_TIMEZONE,
} from './core/configs/messages';
import queryString from 'query-string';
import { post, get, put } from './core/rest';
import { API_ADDED_SOCIAL, API_GET_FB_TOKEN, API_GET_VK_TOKEN, API_SUBSCRIBE, API_CONIFORM_EMAIL } from './core/rest/paths';
import { API_MESSAGES } from './core/configs/responses';
import Text from './components/Text';
import { TYPE } from './core/configs/type';
import SetEmail from './components/ModalWindow/SetEmail/SetEmailContainer';
import NewPassword from './components/ModalWindow/NewPassword/NewPasswordContainer';
import SetEmailRemindPassword from './components/ModalWindow/SetEmailRemindPassword/SetEmailRemindPasswordContainer';

type AppPropsType = {
  showSetEmail: boolean,
  setShowSetEmail: (Boolean) => void,
  setShowSetEmailForRemindPassword: (any) => void,
  setShowSetNewPassword: (any) => void,
  showSetEmailForRemindPassword: Boolean,
  showSetNewPassword: Boolean,
};

const App = (props: AppPropsType) => (
  <React.Fragment>
    <Notification theme="default" />

    {(props.showSetEmail) && (
      <SetEmail
        theme="default"
        closeSetEmail={() => props.setShowSetEmail(false)}
        open
      />
    )}
    {(props.showSetNewPassword) && (
      <NewPassword theme="default" open close={() => props.setShowSetNewPassword(false)} />
    )}
    {(props.showSetEmailForRemindPassword) && (
      <SetEmailRemindPassword theme="default" open close={() => props.setShowSetEmailForRemindPassword(false)} />
    )}

    <BrowserRouter>
      <React.Fragment>
        <ReactRouterGlobalHistory />

        <Switch>

          <Route
            exact
            path="/info/ttshn"
            render={() => (
              <CMS
                path="https://tsoft.silverscreen.by:8443/wssite/webapi/pages/info?subpage=ttshn"
                pageData={null}
                dynamic
              />
            )}
          />

          {
            props.routes.map((item) => {
              if (item.isComponent) {
                return (
                  <Route
                    key={item.path}
                    exact={item.exact}
                    path={item.path}
                    render={() => (<item.component path={item.path} pageData={null} />)}
                  />
                );
              }
              return (
                <Route
                  key={item.path}
                  exact={item.exact}
                  path={item.path}
                  render={() => (<CMS path={item.path} pageData={null} />)}
                />
              );
            })
          }

          <Route
            exact
            path="/ticket/download"
            component={PAGES.DownloadTicketPage}
          />

          <Route
            exact
            path="/ticket/download"
            component={PAGES.DownloadTicketPage}
          />

          <Route
            exact
            path="/giftcard"
            component={PAGES.GiftCardInfoPage}
          />

          <Route
            exact
            path="/search"
            component={PAGES.SearchPage}
          />

          <Route
            exact
            path="/my"
            component={PAGES.ProfilePage}
          />

          <Route
            exact
            path="/ticket"
            component={PAGES.TicketPage}
          />

          <Route
            exact
            path="/payment/assist/ok"
            component={PAGES.PaymentOkPage}
          />

          <Route
            exact
            path="/payment/assist/no"
            component={PAGES.PaymentNoPage}
          />

          <Route
            exact
            path="/order/:checkId"
            component={PAGES.OrderPage}
          />

          <Route
            exact
            path="/ticket"
            component={PAGES.TicketPage}
          />

          <Route
            exact
            path="/404"
            component={() => (
              <FailMessagePage
                title={MSG_SW_TITLES[0]}
                quote={MSG_SW_QUOTES[0]}
                note={MSG_SW_NOTES[0]}
              />
            )}
          />

          <Redirect
            from="*"
            to="/404"
          />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  </React.Fragment>
);

const mapStateToProps = state => ({
  movies: state,
  user: state,
});

const mapDispatchToProps = dispatch => ({
  loadMovies: () => dispatch(loadMovies()),
  checkUser: token => dispatch(checkUser(token)),
  userExit: () => dispatch(userExit()),
  loadUserVK: token => dispatch(loadUserVK(token)),
  loadUserFB: token => dispatch(loadUserFB(token)),
  loadUser: token => dispatch(loadUser(token)),
});

export default compose(
  withState('showSetEmail', 'setShowSetEmail', false),
  withState('showSetEmailForRemindPassword', 'setShowSetEmailForRemindPassword', false),
  withState('showSetNewPassword', 'setShowSetNewPassword', false),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withHandlers({
    getToken: () => () => {
      if (getWindow().localStorage) {
        if (getWindow().localStorage.getItem(TOKEN.BASIC)) {
          const token = {
            type: TOKEN_AUTH.BASIC,
            token: getWindow().localStorage.getItem(TOKEN.BASIC),
          };
          return token;
        }

        if (getWindow().localStorage.getItem(TOKEN.VK)) {
          const tokenVK = {
            type: TOKEN_AUTH.VK,
            token: getWindow().localStorage.getItem(TOKEN.VK),
          };
          return tokenVK;
        }

        if (getWindow().localStorage.getItem(TOKEN.FB)) {
          const tokenFB = {
            type: TOKEN_AUTH.FB,
            token: getWindow().localStorage.getItem(TOKEN.FB),
          };
          return tokenFB;
        }
      }
    },
  }),
  withHandlers({
    confirmActionsEmail: (props) => (params={}) => {
      if (params.confirmemail) {
        get(
          `${API_CONIFORM_EMAIL}${params.confirmemail}`,
          {},
          () => {
            getWindow().pushNotification({
              timeout: 6000,
              body: 'Email успешно изменен',
            });
            props.userExit();
            getWindow().localStorage.removeItem(TOKEN.BASIC);
            getWindow().localStorage.removeItem(TOKEN.VK);
            getWindow().localStorage.removeItem(TOKEN.FB);


          //  props.loadUser(props.getToken());
          }, (err) => {
            console.log('error', err);
          },
        );
      }
      if (params.confirmsubscribe) {
        put(
          `${API_SUBSCRIBE}${params.confirmsubscribe}`,
          {},
          {},
          () => {
            getWindow().pushNotification({
              timeout: 6000,
              body: 'Подписка успешно завершена',
            });
          }, (err) => {
            console.log('error', err);
          },
        );
      }
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.loadMovies();
      let params={};
      if (getWindow().location) {
        params = queryString.parse(getWindow().location.search);
      }

      // подписка на рассылку и подтверждение email - withHandlers
      this.props.confirmActionsEmail(params);
      if (params.confirmemail) return null;

      // проверяем, содержится ли в url параметр code

      if (params && params.code) {
        // находим путь, переданный в параметрах
        // (state=(registration:путь;hash1,hash2) || state=(authorization:путь;hash1,hash2))
        const hash = params.state.slice(params.state.indexOf(';') + 1, params.state.length).replace(',', '&');
        const path = params.state.slice(params.state.indexOf(':') + 1, params.state.length - hash.length - 1);
        // сравниваем: совпадает ли путь, переданный в параметрах, с текущим путем
        if (path !== getWindow().location.pathname && getWindow() && getWindow().location) {
          // отправляем на переданный путь
          getWindow().location.href = `${path}#${hash}&${getWindow().location.search.slice(1)}`;
        }
      }
      if (getWindow().localStorage) {
        const tokenBASIC = {
          type: 'auth',
          token: getWindow().localStorage.getItem(TOKEN.BASIC),
        };

        const tokenVK = {
          type: 'authVK',
          token: getWindow().localStorage.getItem(TOKEN.VK),
        };

        const tokenFB = {
          type: 'authFB',
          token: getWindow().localStorage.getItem(TOKEN.FB),
        };

        if (!tokenBASIC.token && !tokenVK.token && !tokenFB.token) {
          this.props.userExit();
        } else if (tokenBASIC.token) {
          this.props.checkUser(tokenBASIC);
        } else if (tokenVK.token) {
          this.props.checkUser(tokenVK);
        } else if (tokenFB.token) {
          this.props.checkUser(tokenFB);
        }
        let paramsCode;
        if (getWindow().location) {
          paramsCode = queryString.parse(getWindow().location.hash);
          if (paramsCode && paramsCode.code === undefined) {
            paramsCode = queryString.parse(getWindow().location.search);
          }
        }

        const token = this.props.getToken();
        const headerPost = {};
        if (token) {
          headerPost.headers = {};
          headerPost.headers[token.type] = token.token;
        }

        // 1 есть ли в url параметр code
        // 2 проверка на човпадений переданного пути и текущего
        if (paramsCode.code) {
          const hash = paramsCode.state.slice(paramsCode.state.indexOf(';') + 1, paramsCode.state.length);
          const path = paramsCode.state.slice(paramsCode.state.indexOf(':') + 1, paramsCode.state.length - hash.length - 1);
          if (path === getWindow().location.pathname) {
            const typeState = paramsCode.state.slice(0, paramsCode.state.indexOf(':'));
            // если регистрация
            if (typeState === TOKEN_STATE.REGISTRATION_FB
              || typeState === TOKEN_STATE.REGISTRATION_VK) {
              this.props.setShowSetEmail(true);
            } else {
              switch (typeState) {
                case TOKEN_STATE.AUTHORIZATION_VK:
                  post(API_GET_VK_TOKEN, { code: paramsCode.code }, {}, (res) => {
                    if (getWindow().localStorage) {
                      getWindow().localStorage.setItem(TOKEN.VK, res.data.token);
                      this.props.loadUserVK(res.data.token);
                    }
                  },
                  (err) => {
                    if (err.response.data.error === API_MESSAGES.VK_FB_DOESNT_EXIST) {
                      getWindow().pushNotification({
                        timeout: 6000,
                        body: (
                          <Text>
                            {MSG_YOU_ARE_NOT_REGISTRED}
                          </Text>),
                        title: MSG_USER_IS_NOT_FOUND,
                        firstButton: {
                          type: 'alt',
                          name: 'Зарегистрироваться',
                          onClick: () => {
                          },
                        },
                        secondButton: {
                          submit: true,
                          name: 'Проверить e-mail',
                          onClick: () => {
                          },
                        },
                      });
                    } else if (err.response.data.error === API_MESSAGES.VK_FB_NOT_ACTIVE_ACCOUNT) {
                      getWindow().pushNotification({
                        timeout: 6000,
                        body: MSG_NO_ACTIVE_EMAIL,
                      });
                    } else {
                      console.log('USER ERROR', err.response);
                    }
                  });
                  break;
                case TOKEN_STATE.AUTHORIZATION_FB:
                  post(API_GET_FB_TOKEN, { code: paramsCode.code }, {}, (res) => {
                    getWindow().localStorage.setItem(TOKEN.FB, res.data.token);
                    this.props.loadUserFB(res.data.token);
                  },
                  (err) => {
                    if (err.response.data.error === API_MESSAGES.VK_FB_DOESNT_EXIST) {
                      getWindow().pushNotification({
                        timeout: 6000,
                        body: (
                          <Text>
                            {MSG_YOU_ARE_NOT_REGISTRED}
                          </Text>),
                        title: MSG_USER_IS_NOT_FOUND,
                        firstButton: {
                          type: 'alt',
                          name: 'Зарегистрироваться',
                          onClick: () => {
                          },
                        },
                        secondButton: {
                          submit: true,
                          name: 'Проверить e-mail',
                          onClick: () => {
                          },
                        },
                      });
                    } else {
                      console.log('USER ERROR', err.response);
                    }
                  });
                  break;
                // если добавление соц сетей
                case TOKEN_STATE.ADDED_VK:
                  post(API_ADDED_SOCIAL,
                    { type: TYPE.VK, code: paramsCode.code },
                    headerPost,
                    () => {
                      getWindow().pushNotification({
                        timeout: 6000,
                        body: MSG_ADDED_VK,
                      });
                    }, (err) => {
                      if (err.response.data.error === API_MESSAGES.SOCIAL_ALREADY_EXIST) {
                        getWindow().pushNotification({
                          timeout: 6000,
                          body: MSG_ALREADY_IN_USED,
                        });
                      } else {
                        console.log('Error', err.response);
                      }
                    });
                  break;
                case TOKEN_STATE.ADDED_FB:
                  post(API_ADDED_SOCIAL,
                    { type: TYPE.FB, code: paramsCode.code },
                    headerPost,
                    () => {
                      getWindow().pushNotification({
                        timeout: 6000,
                        body: MSG_ADDED_FB,
                      });
                    }, (err) => {
                      if (err.response.data.error === API_MESSAGES.SOCIAL_ALREADY_EXIST) {
                        getWindow().pushNotification({
                          timeout: 6000,
                          body: MSG_ALREADY_IN_USED,
                        });
                      } else {
                        console.log('Error', err.response);
                      }
                    });
                  break;
                default:
                  console.log('USER ERROR');
              }
            }
          }
        } else if (paramsCode.changepassword) {
          this.props.setShowSetNewPassword(true);
        }
      }
    },
    componentDidMount() {
      /**
       * Check timezone
       */
      if (new Date().getTimezoneOffset() !== RIGHT_TIMEZONE_OFFSET) {
        getWindow().pushNotification({
          timeout: 9999999,
          body: NOT_RIGHT_TIMEZONE,
          firstButton: {
            type: 'alt',
            name: 'OK',
            selfСlosing: true,
          },
        });
      }
    },
  }),
)(App);
