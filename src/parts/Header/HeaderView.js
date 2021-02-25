import React from 'react';

import {
  Header,
  HeaderItem,
  HeaderAside,
  HeaderLists,
  HeaderList,
  HeaderListItem,
} from '../../components';

const renderHeaderLists = lists => lists.map(list => (
  <HeaderList
    name={list.name}
  >
    {list.lists.map(link => (
      <HeaderListItem
        url={link.link}
        name={link.value}
        width={link.width}
        secondWidth={link.secondWidth}
        source={link.source}
      />
    ))}
  </HeaderList>
));

const renderHeader = header => header.headerItems.map(item => (
  <HeaderItem
    name={item.name}
    backgroundColor={item.style}
    key={item.id}
    id={item.id}
  >
    <HeaderAside
      url={item.aside.button ? item.aside.button.link : null}
      btnTitle={item.aside.button ? item.aside.button.value : null}
      image={item.aside.image.source}
      title={item.aside.label.value}
      text={item.aside.description ? item.aside.description.value : null}
    />
    <HeaderLists>
      {renderHeaderLists(item.data)}
    </HeaderLists>
  </HeaderItem>
));


type HeaderViewPropsType = {
  theme: String,
  logo: Object,
  headerMenu: Object,
  callCenter: Object,
  promotions: Array,
  rccUnauth: Object,
  rccAuth: Object,
  search: Object,
  auth: bool,
  hide: boolean,
};

const HeaderView = (props: HeaderViewPropsType) => {
  if (props.headerMenu !== undefined) {
    return (
      <Header
        theme={props.theme}
        logo={props.logo}
        callCenter={props.callCenter}
        auth={props.auth}
        rccUnauth={props.rccUnauth}
        rccAuth={props.rccAuth}
        search={props.search}
        promotions={props.promotions}
      >
        {renderHeader(props.headerMenu)}
      </Header>
    );
  }
  return null;
};

export default HeaderView;
