import React from 'react';


import {
  Text,
  Image,
} from '../../components';

import {
  SectionWide,
  AdvantagesSection,
  AdvantagesItem,
  AdvantagesItemIcon,
  AdvantagesItemTitle,
  AdvantagesItemText,
} from '../../pages/Career/CareerStyled';

const getProperties = component => component.childrenList.reduce((obj, item) => {
  const newObj = { ...obj };
  newObj[item.typeName] = {
    styleId: item.style,
    ...item.componentsDescription,
  };
  return newObj;
}, {});

const getAdvantages = component => component
  .childrenList.map(cinemaProperty => getProperties(cinemaProperty));

export default (componentInfo) => {
  const advantages = getAdvantages(componentInfo);
  return (
    <SectionWide>
      <AdvantagesSection styleId={componentInfo.style}>
        {advantages.map(advantage => (
          <AdvantagesItem>
            <AdvantagesItemIcon>
              <Image styleId={advantage.icon.styleId} url={advantage.icon.source} />
            </AdvantagesItemIcon>
            <AdvantagesItemTitle>
              <Text h3 styleId={advantage.label.styleId}>{advantage.label.value}</Text>
            </AdvantagesItemTitle>
            <AdvantagesItemText>
              <Text styleId={advantage.description.styleId}>
                {advantage.description.value}
              </Text>
            </AdvantagesItemText>
          </AdvantagesItem>
        ))}
      </AdvantagesSection>
    </SectionWide>
  );
};
