import React from 'react';

import PopcornPromoPage from '../pages/PopcornPromo/PopcornPromoContainer';

import { Header, Footer } from '../parts';

const MovieFullPageTest = () => (
  <React.Fragment>
    <div style={{ background: '#27262B' }}>
      <Header />

      <PopcornPromoPage />

      <Footer />
    </div>
  </React.Fragment>
);

export default MovieFullPageTest;
