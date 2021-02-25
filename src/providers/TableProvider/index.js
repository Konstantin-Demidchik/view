import React from 'react';
import { Text, Description, Image } from '../../components';

import {
  Table,
  TableBody,
  Tr,
  Td,
} from '../../components/Table';

import { getStylesByCamelList } from '../../core/functions/styles';

import { ImageContainer } from '../../pages/AgeCategoryFilmPage/AgeCategoryFilmPageStyled';

export default function TableProvider(componentInfo) {
  const { childrenList: list } = componentInfo;

  const resultTable = list.map((item, index) => {
    if (item.typeName === 'tableRow') {
      const resultTr = item.childrenList.map((info) => {
        if (info.typeName === 'tableCell') {
          const resultTd = info.childrenList.map((child) => {
            if (child.typeName === 'image') {
              return (
                <ImageContainer>
                  <Image
                    url={child.componentsDescription.source}
                    width={child.componentsDescription.width}
                    height={child.componentsDescription.height}
                    styles={getStylesByCamelList(child.componentsDescription)}
                  />
                </ImageContainer>
              );
            }
            if (child.typeName === 'label') {
              return <Text>{child.componentsDescription.value}</Text>;
            }
            if (child.typeName === 'description') {
              return <Description styles={getStylesByCamelList(child.componentsDescription)} >{child.componentsDescription.value}</Description>;
            }
            return true;
          });
          return <Td width={info.componentsDescription ? info.componentsDescription.width : ''} centerText={index === 0 || info.childrenList.filter(child => child.typeName === 'image')[0]}>{resultTd}</Td>;
        }
        return true;
      });
      return <Tr>{resultTr}</Tr>;
    }
    return true;
  });

  return (
    <Table>
      {resultTable}
    </Table>
  );
}
