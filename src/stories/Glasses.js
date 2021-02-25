import React from 'react';

import GlassesPage from '../pages/GlassesPage/GlassesPageContainer';

import { Header, Footer } from '../parts';

const MovieFullPageTest = () => (
  <React.Fragment>
    <div style={{ background: '#27262B' }}>
      <Header />

      <GlassesPage />

      <Footer />
    </div>
  </React.Fragment>
);

export default MovieFullPageTest;
