import React from 'react';

import VacanciesPage from '../pages/VacanciesPage/VacanciesPageContainer';

import { Header, Footer } from '../parts';

const MovieFullPageTest = () => (
  <React.Fragment>
    <div style={{ background: '#27262B' }}>
      <Header />

      <VacanciesPage />

      <Footer />
    </div>
  </React.Fragment>
);

export default MovieFullPageTest;
