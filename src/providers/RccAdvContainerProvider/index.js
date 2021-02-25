import React from 'react';

import { RedCurpetIconsWrapper } from '../../pages/AboutRedCarpetClubPage/AboutRedCarpetClubPageStyled';

export default function RccAdvContainerProvider(componentInfo) {
  const { style, background, childrenList: list } = componentInfo;

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const contentBlock = list.map((item) => {
    const itemsRccAdv = item.childrenList.map((component) => {
      if (component.typeName === 'image') {
        return (<img src={findValue(component, 'source')} alt="" />);
      }

      if (component.typeName === 'description') {
        return (<p>{findValue(component, 'value')}</p>);
      }
    }).filter(item => !!item);

    return (
      <div styleId={item.style} background={item.background}>
        {itemsRccAdv}
      </div>
    );
  });

  return (
    <RedCurpetIconsWrapper styleId={style} background={background}>
      {contentBlock}
    </RedCurpetIconsWrapper>
  );
}
