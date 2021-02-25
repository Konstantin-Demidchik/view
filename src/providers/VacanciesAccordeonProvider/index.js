import React from 'react';

import { Vacancy } from '../../components';
import { providerByComponentTitle } from '..';

import { Container } from '../../pages/VacanciesPage/VacanciesPageStyles';

export default function EmailSubscriptionBoxProvider(componentInfo) {
  const { style, childrenList: list } = componentInfo;
  const props = {
    styleId: style,
    hot: null,
    name: null,
    nameStyle: null,
    iconUrl: null,
    description: null,
    descriptionStyleId: null,
    shortInfo: [],
    textGuide: [],
    hrContacts: null,
    promoImage: null,
    sendButton: null,
    sendButtonStyle: null,
    downloadLink: {
      link: null,
      source: null,
      value: null,
    },
  };

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const vacancyDescriptionProvider = (childrenList) => {
    let descr = null;
    let listTitle = null;
    let listStyle = null;
    let descrStyle = null;
    childrenList.forEach((item, index) => {
      if (item.typeName === 'label' && index === 0) {
        props.description = findValue(item, 'value');
        props.descriptionStyleId = item.style;
      }

      if (item.typeName === 'dotList') {
        let title = null;
        let content = null;
        let titleStyle = null;
        let contentStyle = null;
        item.childrenList.forEach((element) => {
          if (element.typeName === 'dotListItem') {
            title = findValue(element, 'value');
            titleStyle = element.style;
          }
          if (element.typeName === 'rightListItem') {
            content = findValue(element, 'value');
            contentStyle = element.style;
            props.shortInfo.push({
              content,
              contentStyle,
              title,
              titleStyle,
            });
          }
          return true;
        });
        return true;
      }

      if (item.typeName === 'label') {
        listTitle = findValue(item, 'value');
        listStyle = item.style;
      }

      if (item.typeName === 'description' && index === 0) {
        props.description = findValue(item, 'value');
        return true;
      }

      if (item.typeName === 'description') {
        descr = findValue(item, 'value');
        descrStyle = item.style;
        props.textGuide.push({
          name: listTitle,
          list: descr,
          descrStyle,
          listStyle,
        });
      }
      return true;
    });
    return true;
  };

  list.forEach((item) => {
    if (item.typeName === 'icon') {
      props.iconUrl = findValue(item, 'source');
      return true;
    }
    if (item.typeName === 'image') {
      props.hot = findValue(item, 'source');
      return true;
    }
    if (item.typeName === 'label') {
      props.name = findValue(item, 'value');
      props.nameStyle = item.style;
      return true;
    }
    if (item.typeName === 'accordeonBody') {
      item.childrenList.forEach((el) => {
        if (el.typeName === 'aside') {
          el.childrenList.forEach((element, index) => {
            if (element.typeName === 'description') {
              props.hrContacts = findValue(element, 'value');
              return true;
            }
            if (element.typeName === 'image') {
              props.promoImage = findValue(element, 'source');
              return true;
            }
            if (element.typeName === 'buttonModalVacancy') {
              props.sendButton = providerByComponentTitle(element.typeName)(element);

              return true;
            }
            if (element.typeName === 'button' && index === 1) {
              props.downloadLink.link = findValue(element, 'link');
              props.downloadLink.source = findValue(element, 'source');
              props.downloadLink.value = findValue(element, 'value');
              return true;
            }
            return true;
          });
          return true;
        }
        if (el.typeName === 'vacancyDescription') {
          vacancyDescriptionProvider(el.childrenList);
        }
        return true;
      });
      return true;
    }
    return true;
  });

  return (
    <Container>
      <Vacancy vacancy={props} theme="default" />
    </Container>
  );
}
