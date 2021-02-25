import React from 'react';
import { connect } from 'react-redux'
import queryString from 'query-string';
import TabNavProvider from '../TabNavProvider';
import LabelProvider from '../LabelProvider';
import MovieRollerProvider from '../MovieRollerProvider';
import { AfishaSection } from '../../pages/MainPage/MainPageStyled';
import {
  TabsHeaderAfishaProvider,
  FilterContainerProvider,
  FilmContainerProvider,
  ResponsiveWrapperProvider,
} from '..';

import { Loader, ResponsiveWrapper } from '../../components';

export default function SectionProvider(componentInfo, store, event) {
  const { style, background, childrenList: list } = componentInfo;
  let initialActiveTab = '';

  const findValue = (item, fieldName) => {
    if (fieldName in item.componentsDescription) {
      return item.componentsDescription[fieldName];
    }
    return null;
  };

  list.forEach((component) => {
    if (component.typeName === 'filtersMovieRoller' && component.childrenList.length > 0) {
      initialActiveTab = findValue(component.childrenList[0], 'eventFilterKey');
    } else initialActiveTab = '3';
  });

  class ProviderWithState extends React.Component {
    state = {
      activeTabId: initialActiveTab,
    }

    render() {
      const setActiveTabId = tabName => this.setState({ activeTabId: tabName });
      let tabsIdArray;
      let isAfishaPage = false;

      list.forEach((component) => {
        if (component.typeName === 'filterHeader') isAfishaPage = true;
      });

      return (
        <AfishaSection styleId={style} background={background} isAfishaPage={isAfishaPage}>
          {list.map((component) => {
            if (component.typeName === 'label') {
              return (
                <ResponsiveWrapper
                  centered="true"
                  styleId="2"
                  paddingTop="20px"
                  paddingBottom="35px"
                >
                  {LabelProvider(component)}
                </ResponsiveWrapper>
                );
            }

            if (component.typeName === 'filtersMovieRoller') {
              return TabNavProvider(component, this.state.activeTabId, setActiveTabId);
            }

            if (component.typeName === 'movieRoller') {
              try {
                if (this.props.moviesStatus === 'success') {
                  return MovieRollerProvider(component, this.state.activeTabId, this.props.movies, event);
                }
                else {
                  return <Loader positionRelative height="400px" />
                }

              } catch (e) {
                console.log(e);
              }
            }

            if (component.typeName === 'responsiveWrapper') {
              return ResponsiveWrapperProvider(component);
            }

            if (component.typeName === 'tabsHeader') {
              return TabsHeaderAfishaProvider(component, this.state.activeTabId, setActiveTabId);
            }

            if (this.props.movies instanceof Array) {
              if (component.typeName === 'filtersContainer' && this.state.activeTabId === Number(findValue(component, 'showKey'))) {
                return FilterContainerProvider(component, this.state.activeTabId);
              }
            }

            if (component.typeName === 'filmContainer') {
              if (this.props.movies) {

                return (
                  <FilmContainerProvider
                    componentInfo={component}
                    activeTabId={this.state.activeTabId}
                    moviesList={this.props.movies}
                    event={event}
                    setActiveTabId={setActiveTabId}
                  />
                );
              }
            }
          })
          }
        </AfishaSection>
      );
    }
  }

  const mapStateToProps = state => ({
    movies: state.movies,
    moviesStatus: state.moviesStatus,
  });

  const ProviderWithStateAndRedux = connect(
    mapStateToProps,
  )(ProviderWithState);

  return <ProviderWithStateAndRedux />;
}
