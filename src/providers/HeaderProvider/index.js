import React from 'react';
import { Header } from '../../parts';

export default function HeaderProvider(componentInfo) {
  const { childrenList: list } = componentInfo;
  const props = {
    logo: null,
    headerMenu: null,
    callCenter: null,
    rccUnauth: null,
    rccAuth: null,
    search: null,
    auth: false,
    promotions: [],
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription !== null && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const createAsideComp = (childrenList) => {
    const aside = {
      image: null,
      label: null,
      description: null,
      button: null,
    };

    childrenList.forEach((item) => {
      if (item && item.typeName === 'aside') {
        item.childrenList.forEach((comp) => {
          if (comp.typeName === 'image') {
            aside.image = {
              source: findValue(comp, 'source'),
              link: findValue(comp, 'link'),
              key: findValue(comp, 'key'),
              style: comp.style,
            };
            return true;
          }
          if (comp.typeName === 'label') {
            aside.label = {
              link: findValue(comp, 'link'),
              value: findValue(comp, 'value'),
              style: comp.style,
            };
            return true;
          }
          if (comp.typeName === 'description') {
            aside.description = {
              value: findValue(comp, 'value'),
              style: comp.style,
            };
            return true;
          }
          if (comp.typeName === 'button') {
            aside.button = {
              link: findValue(comp, 'link'),
              value: findValue(comp, 'value'),
              style: comp.style,
            };
            return true;
          }
          return true;
        });
      }
    });
    return aside;
  };

  const createListContent = (childrenList) => {
    const sectionItem = [];
    childrenList.map((item) => {
      const listItem = {
        link: findValue(item, 'link'),
        value: findValue(item, 'value'),
        source: findValue(item, 'source'),
        width: findValue(item, 'width'),
        secondWidth: findValue(item, 'secondWidth'),
      };
      sectionItem.push(listItem);
      return true;
    });
    return sectionItem;
  };

  const createHeaderLists = (childrenList) => {
    const lists = [];
    childrenList.map((item) => {
      if (item && item.typeName !== 'aside') {
        const listItem = {
          name: findValue(item, 'value'),
          lists: createListContent(item.childrenList),
          style: item.style,
        };
        lists.push(listItem);
      }
      return true;
    });
    return lists;
  };

  const createHeaderItems = (childrenList) => {
    const headerItems = [];
    childrenList.map((item) => {
      const headerItem = {
        name: findValue(item, 'value'),
        aside: createAsideComp(item.childrenList),
        data: createHeaderLists(item.childrenList),
        style: item.style,
        id: item.id,
      };
      headerItems.push(headerItem);
      return true;
    });
    return headerItems;
  };

  const createRccAuth = (childrenList) => {
    let data = {};
    childrenList.map((item) => {
      if (item && item.typeName !== 'aside') {
        if (item && item.childrenList.length === 0) {
          data = {
            ...data,
            header: findValue(item, 'value'),
          };
        } else {
          data = {
            ...data,
            profile: findValue(item, 'value'),
            style: item.style,
            myRCC: {
              link: findValue(item.childrenList[0], 'link'),
              value: findValue(item.childrenList[0], 'value'),
              style: item.childrenList[0].style,
            },
            list: createListContent(item.childrenList[1].childrenList),
          };
        }
      }
      return true;
    });
    return data;
  };

  list.forEach((item) => {
    if (item && item.typeName === 'image') {
      props.logo = {
        source: findValue(item, 'source'),
        link: findValue(item, 'link'),
        style: item.style,
      };
      return true;
    }

    if (item && item.typeName === 'headerMenu') {
      props.headerMenu = {
        headerItems: createHeaderItems(item.childrenList),
        style: item.style,
      };
      return true;
    }

    if (item && item.typeName === 'headerMenuItem') {
      const phoneSection = (childrenList, section) => {
        let phone = {};

        childrenList.forEach((comp) => {
          if (comp.typeName === 'icon' && section === 'icon') {
            phone = {
              source: findValue(comp, 'source'),
              style: comp.style,
            };
            return true;
          }
          if (comp.typeName === 'label' && section === 'label') {
            phone = {
              value: findValue(comp, 'value'),
              style: comp.style,
            };
            return true;
          }
          return true;
        });

        return phone;
      };
      props.callCenter = {
        phoneIcon: phoneSection(item.childrenList, 'icon'),
        phoneLabel: phoneSection(item.childrenList, 'label'),
        link: findValue(item, 'link'),
        style: item.style,
      };
      return true;
    }

    if (item && item.typeName === 'promotions') {
      const promotionsSection = (childrenList, section) => {

        let promotions = {};

        childrenList.forEach((comp) => {
          if (comp && comp.typeName === 'icon' && section === 'icon') {
            promotions = {
              hide: item.componentsDescription ? JSON.parse(item.componentsDescription.hide) : '',
              source: findValue(comp, 'source'),
              link: findValue(comp, 'link'),
              style: comp.style,
            };
            return true;
          }
          return true;
        });

        return promotions;
      };
      props.promotions.push({
        aside: promotionsSection(item.childrenList, 'icon'),
      });
    }

    if (item && item.name === 'rccUnauth') {
      props.rccUnauth = {
        name: findValue(item, 'value'),
        image: findValue(item, 'source'),
        aside: createAsideComp(item.childrenList),
        lists: createHeaderLists(item.childrenList),
        style: item.style,
      };
      return true;
    }

    if (item && item.name === 'rccAuth') {
      props.rccAuth = {
        aside: createAsideComp(item.childrenList),
        data: createRccAuth(item.childrenList),
        style: item.style,
      };
      return true;
    }

    if (item && item.typeName === 'button') {
      props.search = {
        name: findValue(item.childrenList[0], 'value'),
        data: createListContent(item.childrenList[0].childrenList),
        style: item.style,
      };
    }
    return true;
  });
  return (
    <Header {...props} />
  );
}
