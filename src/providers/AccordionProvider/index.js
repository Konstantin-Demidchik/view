import React from 'react';

import {
  Accordion,
  AccordionOpen,
  AccordionClose,
  AccordionText,
} from '../../pages/GlassesPage/GlassesPageStyled';

import ImageProvider from '../ImageProvider';
import DescriptionProvider from '../DescriptionProvider';
import TextProvider from '../TextProvider';
import { Text } from '../../components';

export default function AccordionProvider(items) {
  class ProviderWithState extends React.Component {
    state = {
      open: false,
    };

    render() {
      const findValue = (comp, fieldName) => {
        if (fieldName in comp.componentsDescription) {
          return comp.componentsDescription[fieldName];
        }
        return null;
      };

      if (items.childrenList[0].typeName !== 'accordeonBody') return null;

      const contentText = items.childrenList[0].childrenList.map((item) => {
        if (item.typeName === 'label') {
          return (
            <React.Fragment>
              {TextProvider(item)}
            </React.Fragment>
          );
        }
        if (item.typeName === 'image') {
          return ImageProvider(item);
        }

        if (item.typeName === 'description') {
          return DescriptionProvider(item);
        }
      }).filter(item => !!item);


      const closeAccordion = items.childrenList[0].childrenList.map((item) => {
        if (item.typeName === 'button') {
          return (
            <AccordionClose
              open={this.state.open}
              onClick={() => this.setState({ open: false })}
              styleId={item.style}
            >
              {findValue(item, 'value')}
            </AccordionClose>
          );
        }
      }).filter(item => !!item);

      return (
        <Accordion style={{ height: 'auto' }} open styleId={items.style}>
          <AccordionText open={this.state.open} styleId={items.childrenList[0].style}>
            {contentText}
          </AccordionText>

          <AccordionOpen
            open={this.state.open}
            onClick={() => this.setState({ open: true })}
            styleId={items.style}
          >
            {findValue(items, 'value')}
          </AccordionOpen>
          {closeAccordion}
        </Accordion>
      );
    }
  }

  return (<ProviderWithState />);
}
