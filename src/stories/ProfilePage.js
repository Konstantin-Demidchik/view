import React from 'react';

import { Header, Footer } from '../parts';

import ProfilePage from '../pages/Profile/ProfileContainer';

const ProfilePageTest = () => (
  <div style={{ background: '#27272a' }}>
    <Header />

    <ProfilePage
      theme="default"
      title="Поиск по сайту"
    />

    <Footer />
  </div>
);

export default ProfilePageTest;
