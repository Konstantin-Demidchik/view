import React from 'react';

import { Header, Footer } from '../parts';

import SearchPage from '../pages/Search/SearchContainer';

const SearchPageTest = () => (
  <div style={{ background: '#27262B' }}>
    <Header />

    <SearchPage
      theme="default"
      title="Поиск по сайту"
    />

    <Footer />
  </div>
);

export default SearchPageTest;
