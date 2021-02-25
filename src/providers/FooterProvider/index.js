import React from 'react';
/*
  Footer принимает props:
  1. extraMessage - сообщение которое отображается между
    инпутом с подпиской и самим футером
  2. legal - правовой текст внизу футера
  3. children - массив из списков ссылок
    каждый элемент проверяется на тип FooterLinkGroup
  4  socialIcons - массив кнопок для перехода на страницы социальных сетей
  5. license - массив ссылок в правом нижнем углу
  6. companyInfo - строка с названием компании
*/

import {
  Footer,
  FooterLinkGroup,
  FooterLinkItem,
} from '../../components';

const getChildren = component => component.childrenList.reduce((obj, item) => {
  const newObj = { ...obj };
  newObj[item.typeName] = item;
  return newObj;
}, {});

const getComponent = parentComponent => parentComponent.childrenList.map(component => ({
  styleId: component.style,
  ...component.componentsDescription,
}));

const getSocialType = link => link.replace(/www/, '').match(/\w+/ig)[1];

export default (componentInfo) => {
  const {
    footerMenu,
    socialIcons,
    image: partnersImage,
    label: firstCompanyInfo,
    licenseCont,
    description,
    callCenter,
  } = getChildren(componentInfo);

  const socialIconsFooter = socialIcons.childrenList.map(item => ({
    styleId: item.style,
    name: getSocialType(item.componentsDescription.link),
    ...item.componentsDescription,
  }));

  const menu = footerMenu.childrenList.map(menuSection => ({
    styleId: menuSection.style,
    ...menuSection.componentsDescription,
    children: menuSection.childrenList.map(menuItem => ({
      styleId: menuItem.style,
      ...menuItem.componentsDescription,
    })),
  }));

  const license = getComponent(licenseCont);

  const payIcons = getComponent(partnersImage);

  const [
    phoneIcon,
    phoneLabel,
  ] = getComponent(callCenter);

  return (
    <Footer
      styleId={componentInfo.style}
      descriptionStyleId={description.style}
      socialIconsStyleId={socialIcons.style}
      socialIcons={socialIconsFooter}
      legal={description.componentsDescription.value}
      licenseStyleId={licenseCont.style}
      license={license}
      companyInfo={firstCompanyInfo.componentsDescription.value}
      companyInfoStyleId={firstCompanyInfo.style}
      partnersImage={partnersImage.componentsDescription.source}
      payIconsStyleId={payIcons.style}
      payIcons={payIcons}
      callCenter={{
        phoneIcon,
        phoneLabel,
      }}
    >
      {
        menu.map(linkGroup => (
          <FooterLinkGroup title={linkGroup.value} styleId={linkGroup.style}>
            {linkGroup.children.map(linkItem => (
              <FooterLinkItem
                link={linkItem.link}
                title={linkItem.value}
                styleId={linkItem.style}
              />
            ))}
          </FooterLinkGroup>
        ))
      }
    </Footer>
  );
};
