import React from 'react';

import StaticPage from '../pages/StaticPage/StaticPageContainer';

import { Header, Footer } from '../parts';

const MovieFullPageTest = () => (
  <React.Fragment>
    <div style={{ background: '#27262B' }}>
      <Header />

      <StaticPage
        theme="default"
        title="Контакты"
      >
        Статическая страница<br />
        1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />
        1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />
        1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />
        1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />
        1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />
        1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />
      </StaticPage>

      <Footer />
    </div>
  </React.Fragment>
);

export default MovieFullPageTest;
