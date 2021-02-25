import React from 'react';

import {
  Footer,
  FooterLinkGroup,
  FooterLinkItem,
} from '../../components';

const FooterView = () => (
  <Footer
    linkVk="vk.com"
    linkFb="fb.com"
    linkInstagram="instagram.com"
    legal="ООО «Просто кино». Местонахождение: г.Минск, ул.Бобруйская,д.6, пом.107, пом. 19.
      Свидетельство о государственной регистрации № 192211249 (УНП) от 10.02.2014, выдано Мингорисполкомом.
      Сведения о регистрации в Торговом реестре Республики Беларусь интернет-магазина:
      зарегистрирован 23.04.2018 Администрацией Центрального района г. Минска, №413086.
      Режим работы интернет магазина – круглосуточно."
  >
    <FooterLinkGroup title="Афиша">
      <FooterLinkItem link="/afisha/" title="Сейчас в кино" />
      <FooterLinkItem link="/afisha/#/view/special/" title="Спецпроекты" />
      <FooterLinkItem link="/afisha/#/view/upcoming/" title="Скоро" />
    </FooterLinkGroup>
    <FooterLinkGroup title="Кинотеатры">
      <FooterLinkItem link="/cinemas/minsk/galileo/" title="Galileo" />
      <FooterLinkItem link="/cinemas/minsk/dana/" title="VOKA cinema" />
      <FooterLinkItem link="/cinemas/minsk/arena/" title="ARENAcity" />
      <FooterLinkItem link="/afisha/#/view/live/cinema/minsk/format-tech/DA/" title="Звук Dolby Atmos" />
      <FooterLinkItem link="/cinemas/more/silverglasses/" title="3D-очки" />
      <FooterLinkItem link="/info/visitors/giftcards/" title="Подарочные карты" />
    </FooterLinkGroup>
    <FooterLinkGroup title="Red Carpet Club">
      <FooterLinkItem link="/rcc/club/" title="О киноклубе" />
      <FooterLinkItem link="/rcc/start/" title="Как стать участником" />
      <FooterLinkItem link="/rcc/rules/" title="Правила киноклуба" />
    </FooterLinkGroup>
    <FooterLinkGroup title="Еда и напитки">
      <FooterLinkItem link="/products/cinema-bar/popkorn/" title="Попкорн" />
      <FooterLinkItem link="/products/cinema-bar/napitki/" title="Напитки" />
      <FooterLinkItem link="/products/cinema-bar/sneki/" title="Снеки" />
      <FooterLinkItem link="/products/cinema-bar/morozhennoe-i-slashi/" title="Мороженое и слаши" />
    </FooterLinkGroup>
    <FooterLinkGroup title="Инфо">
      <FooterLinkItem link="/info/visitors/ad/" title="Акции" />
      <FooterLinkItem link="/info/visitors/news/" title="Новости" />
      <FooterLinkItem link="/info/visitors/age/" title="Возрастной рейтинг" />
      <FooterLinkItem link="/info/visitors/rules/" title="Правила оказания услуг" />
      <FooterLinkItem link="/info/about/vacancies/" title="Карьера и вакансии" />
      <FooterLinkItem link="/info/cooperation/advertising/" title="Реклама в кинотеатре" />
      <FooterLinkItem link="/info/about/contacts/" title="Контакты" />
      <FooterLinkItem link="#/download/ticket" title="Скачать билет" />
      <FooterLinkItem link="/movies-list-page" title="Карта фильмов" />
    </FooterLinkGroup>
  </Footer>
);

export default FooterView;
