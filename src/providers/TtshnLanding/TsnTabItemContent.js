import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { providerByComponentTitle } from '../index';

const findValue = (comp, fieldName) => {
  if (comp.componentsDescription && fieldName in comp.componentsDescription) {
    return comp.componentsDescription[fieldName];
  }
  return null;
};

function TsnRenderContent(componentInfo) {
  let data;
  const props = {
    itemKey: null,
  };
  if (componentInfo.typeName === 'tabItemChildren') {
    props.itemKey = findValue(componentInfo, 'key');
    if (componentInfo.landing === JSON.parse(props.itemKey)) {
      data = componentInfo.childrenList.map((child) => {
        return providerByComponentTitle(child.typeName)(child);
      });
      return data;
    }
    return true;
  }
  return true;
}


export default function (componentInfo) {
  const mapStateToProps = state => ({
    landing: state.landing,
  });

  const TsnTabContainer = compose(
    connect(
      mapStateToProps,
      null,
    ),
  )(TsnRenderContent);

  return <TsnTabContainer {...componentInfo} />;
}
