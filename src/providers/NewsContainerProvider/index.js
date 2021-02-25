import React from 'react';
import { NewsContainer } from '../../components';

export default function NewsContainerProvider(componentInfo) {
  const { childrenList: list } = componentInfo;
  const props = {
    pagesCount: list.length,
    dataArray: [],
  };


  list.forEach((item) => {
    if (item.typeName === 'newsPage') {
      const arr = [];
      item.childrenList.forEach((info) => {
        if (info.typeName === 'patternInfo') {
          arr.push(info);
        }
      });
      props.dataArray.push(arr);
    }
  });
  return (
    <NewsContainer {...props} />
  );
}
