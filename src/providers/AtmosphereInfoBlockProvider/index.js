import React from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';

import {
  Text,
  Button,
} from '../../components';

import {
  Section,
  SectionBody,
  SectionTitle,
  SectionContent,
  BackgroundImage,
  ButtonsRow,
  HeadingInfo,
  ButtonLink,
  ListContainer,
} from '../../pages/AdvantagesPage/AdvantagesPageStyled';

const getInfo = component => component.childrenList.map(item => ({
  styleId: item.style,
  ...item.componentsDescription,
}));

export default function AtmosphereInfoBlockProvider(componentInfo) {
  const [
    mainLabel,
    description,
    button,
    contentLabel,
    content,
  ] = getInfo(componentInfo);
  return (
    <ScrollableAnchor id="atmosphere">
      <Section styleId={componentInfo.style}>
        <BackgroundImage grey url={componentInfo.background} />
        <SectionTitle styleId={mainLabel.style}>{mainLabel.value}</SectionTitle>
        <HeadingInfo>
          <SectionBody>
            <Text styleId={description.style} strong>{description.value}</Text>
            <ButtonsRow>
              <ButtonLink
                link={button.link}
              >
                <Button styleId={button.style} secondary>{button.value}</Button>
              </ButtonLink>
            </ButtonsRow>
          </SectionBody>
        </HeadingInfo>
        <SectionBody>
          <SectionContent right>
            <Text styleId={contentLabel.style} h2>{contentLabel.value}</Text>
            <ListContainer>
              <div dangerouslySetInnerHTML={{ __html: content.value }} />
            </ListContainer>
          </SectionContent>
        </SectionBody>
      </Section>
    </ScrollableAnchor>
  );
}
