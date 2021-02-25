import React from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Text, Button, Description } from '../../components';
import {
  Section,
  BackgroundImage,
  ButtonsRow,
  SectionBody,
  SectionContent,
  SectionTitle,
} from '../../pages/AdvantagesPage/AdvantagesPageStyled';

export default function EmailSubscriptionBoxProvider(componentInfo) {
  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };


  const { style, childrenList: list } = componentInfo;
  const props = {
    divId: findValue(componentInfo, 'divId'),
    reverse: findValue(componentInfo, 'reverse'),
    backgroundImage: componentInfo.background,
    specialСomponent: findValue(componentInfo, 'specialComponent'),
    transform: findValue(componentInfo, 'transform'),
    tag: null,
    title: null,
    description: null,
    icon: null,
    buttonRow: [],
    styleId: style,
    technologies: false,
  };


  list.forEach((item) => {
    if (item.typeName === 'tag') {
      props.tag = findValue(item, 'value');
      return true;
    }
    if (item.typeName === 'label') {
      props.title = findValue(item, 'value');
      return true;
    }
    if (item.typeName === 'description') {
      props.description = findValue(item, 'value');
      props.styleId = item.style;
      return true;
    }
    if (item.typeName === 'icon') {
      props.icon = findValue(item, 'source');
      return true;
    }
    if (item.typeName === 'button') {
      props.buttonRow.push({
        link: findValue(item, 'link'),
        value: findValue(item, 'value'),
      });
      return true;
    }
    return true;
  });

  const renderButton = buttonRow => buttonRow.map(item => (
    <a href={item.link} style={{ margin: 0 }}>
      <Button secondary>{item.value}</Button>
    </a>
  ));

  const renderContent = () => (
    <React.Fragment>
      {props.icon && (
        <svg fill="currentColor" version="1.1">
          <image
            xlinkHref={props.icon}
            width="120"
            height="100%"
            style={{ maxWidth: '105px', opacity: 0.7 }}
          />
        </svg>
      )}
      {props.title && (
        <Text h2>{props.title}</Text>
      )}
      {props.description && (
        <Description
          styleId={props.styleId}
        >
          {props.description}
        </Description>
      )}
      <ButtonsRow>
        {renderButton(props.buttonRow)}
      </ButtonsRow>
    </React.Fragment>
  );

  return (
    <ScrollableAnchor id={props.divId ? props.divId : null}>
      <Section
        notcover={props.divId === 'technologies'}
      >
        <BackgroundImage
          comfort
          rotate
          position={(props.reverse === 'false') ? 'left' : 'right'}
          notcover={props.divId === 'technologies'}
          url={props.backgroundImage ? props.backgroundImage : null}
          specialСomponent={props.specialСomponent}
          transform={props.transform}
        />
        {props.tag && (
          <SectionTitle>
            {props.tag}
          </SectionTitle>
        )}
        <SectionBody>
          {
            props.reverse === 'false'
              ? (
                <SectionContent right icon={props.icon} specialСomponent={props.specialСomponent}>
                  {renderContent()}
                </SectionContent>
              )
              : (
                <SectionContent left specialСomponent={props.specialСomponent}>
                  {renderContent()}
                </SectionContent>
              )
          }
        </SectionBody>
      </Section>
    </ScrollableAnchor>
  );
}
