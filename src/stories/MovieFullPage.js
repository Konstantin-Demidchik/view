import React from 'react';

import MovieFullPage from '../pages/MovieFullPage/MovieFullPageContainer';

import { Header, Footer } from '../parts';

const MovieFullPageTest = () => (
  <React.Fragment>
    <div style={{ background: '#27262B' }}>
      <Header />

      <MovieFullPage />

      <Footer />
    </div>
  </React.Fragment>
);

export default MovieFullPageTest;
