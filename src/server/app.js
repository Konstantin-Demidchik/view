import React from 'react';

import {
  ReactRouterGlobalHistory,
} from '../core/functions/global-history';

import {
  StaticRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// eslint-disable-next-line import/no-duplicates
import * as PAGES from '../pages';
// eslint-disable-next-line import/no-duplicates
import { FailMessagePage } from '../pages';
import CMS from '../components/cms';
import { MSG_SW_NOTES, MSG_SW_QUOTES, MSG_SW_TITLES } from '../core/configs/messages';

const App = (props) => {
  return (
    <StaticRouter location={props.location} context={props.context}>
      <React.Fragment>
        <ReactRouterGlobalHistory />

        <Switch>

          {
            props.routes.map(item => {
              if (item.isComponent) {
                return (
                  <Route
                    key={item.path}
                    exact={item.exact}
                    path={item.path}
                    render={() => (<item.component path={item.path} pageData={props.pageData} />)}
                  />
                );
              }

              return (
                <Route
                  key={item.path}
                  exact={item.exact}
                  path={item.path}
                  render={() => (<CMS path={item.path} pageData={props.pageData} />)}
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
    </StaticRouter>
  );
};

export default App;
