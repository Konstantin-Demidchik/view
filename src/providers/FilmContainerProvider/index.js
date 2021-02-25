import React from 'react';
import {
  compose, lifecycle, withState, withHandlers,
} from 'recompose';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
  TabContent,
  TabPane,
  Button,
  MovieAfisha,
  Loader,
} from '../../components';

import { getWindow } from '../../core/functions/browser';

import {
  MovieAfishaPageContainer,
  MovieAfishaContent,
  MovieAfishaPoster,
  MovieAfishaGrid,
  MovieAfishaLastComponent,
  LastComponent,
} from '../../pages/MovieAfishaPage/MovieAfishaPageStyles';

import { dayOfWeek } from '../../core/functions/datetime';
import {
  resetFilterFormat,
  setFilterTime,
  setFilterDay,
  resetFilterOther,
  setFilterCinema,
} from '../../store/actions';
import { makeFormatForDate, getNFilterDays } from '../../core/functions/datetime';
import { getBelarusDate, getRightDate, getBelarusDateTime, createTimeView } from '../../core/functions/datetime';

const mapStateToProps = state => ({
  filters: state.filters,
  moviesList: state.movies,
  moviesStatus: state.moviesStatus,
});

const findValue = (item, fieldName) => {
  if (fieldName in item.componentsDescription) {
    return item.componentsDescription[fieldName];
  }
  return null;
};

const NOW = new Date();

const renderMovieAfisha = (tab, moviesCard, moviesList, afishaLoader) => (
  <MovieAfishaPageContainer>
    {moviesList.length > 0 ? (
      <TabContent activeTabId={tab}>
        <TabPane tabId={tab}>
          <MovieAfishaContent>
            <MovieAfishaPoster>
              <MovieAfishaGrid>
                {!afishaLoader ? moviesCard : (
                  <Loader positionRelative height="300px" centered />
                )}
              </MovieAfishaGrid>
            </MovieAfishaPoster>
          </MovieAfishaContent>
        </TabPane>
      </TabContent>
    ) : (<Loader positionRelative height="400px" />)}
  </MovieAfishaPageContainer>
);

const isFilterDefault = (filters) => {
  const currentDate = getBelarusDate(new Date());
  const date = `${currentDate.getFullYear()}-${(`0${currentDate.getMonth() + 1}`).slice(-2)}-${(`0${currentDate.getDate()}`).slice(-2)}`;

  const cinema = filters.cinema.name === 'Все кинотеатры, Минск';
  const day = filters.day.date === date;
  const time = filters.time.name === 'Все сеансы';
  const format = (() => {
    const formatValues = Object.values(filters.format);
    let isDefault = true;

    for (let i = 0; i < formatValues.length; i += 1) {
      if (formatValues[i] !== undefined) {
        isDefault = false;
      }
    }

    return isDefault;
  })();
  const other = (() => {
    const otherValues = Object.values(filters.other);
    let isDefault = true;

    for (let i = 0; i < otherValues.length; i += 1) {
      if (otherValues[i] !== undefined) {
        isDefault = false;
      }
    }

    return isDefault;
  })();

  return cinema && day && time && format && other;
};

const resetFilter = (props) => {
  const currentDate = getBelarusDate(new Date());
  const date = `${currentDate.getFullYear()}-${(`0${currentDate.getMonth() + 1}`).slice(-2)}-${(`0${currentDate.getDate()}`).slice(-2)}`;

  props.resetFilterFormat();
  props.resetFilterOther();
  props.setFilterCinema('Все кинотеатры, Минск', 0);
  props.setFilterTime('Все сеансы', 0, null, null);
  props.setFilterDay(`сегодня, ${getNFilterDays()[0]}`, 0, date);
};

const createDateView = (movieFullDate) => {
  const date = new Date(movieFullDate);
  const options = {
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Minsk',
  };
  return date.toLocaleString('ru', options);
};

// нахождение завтрашнего дня
const isTomorrow = () => {
  const tomorrow = getBelarusDateTime();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

// нахождение следующего дня
const getNextDay = day => new Date(day.getTime() + (24 * 60 * 60 * 1000));


// при нажатии кнопки "следующий день"
const changeDayInButton = (dayNow, props) => {
  const nextDay = getNextDay(dayNow);
  props.setNextDayNow(nextDay);
  props.setNextDay(`${dayOfWeek(nextDay)}, ${createDateView(nextDay)}`);
  const date = makeFormatForDate(dayNow);

  const diff = Math.floor(getBelarusDate(`${props.filters.day.date}T00:00:00.00000+03:00`).getTime() - getBelarusDateTime().getTime());
  const day = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / day);
  const nowDate = `${getBelarusDateTime().getFullYear()}-${(`0${getBelarusDateTime().getMonth() + 1}`).slice(-2)}-${(`0${getBelarusDateTime().getDate()}`).slice(-2)}`;
  if (days >= 12) {
    props.setFilterDay(`сегодня, ${createDateView(getBelarusDateTime())}`, getBelarusDateTime().getDate(), nowDate);
    props.setKeyForDate(getBelarusDateTime().getDate());
  }
  else {
    // если nextDay - завтра, то передаем в фильтры завтрашний день
    if (props.nextDay === `завтра, ${createDateView(isTomorrow())}`) {
      props.setFilterDay(`завтра, ${createDateView(dayNow)}`, props.filters.day.key + 1, date);
    } else {
    // если nextDay - не завтра, то передаем в фильтры следующий день
      props.setFilterDay(`${dayOfWeek(dayNow)}, ${createDateView(dayNow)}`, props.filters.day.key + 1, date);
    }
    props.setKeyForDate(props.filters.day.key + 1);
  }


};

// установка следующего дня для кнопки
const setTextNextDay = (props, dayNext) => {
  const nextDay = new Date(dayNext);
  const day = nextDay.getDate();
  const month = nextDay.getMonth();
  const year = nextDay.getFullYear();
  // находим какой с сегодняшнего дня следующий день
  const nextDayNow = getNextDay(new Date(getBelarusDate(new Date())));
  // если дни совпадают, то это завтра
  return (day === nextDayNow.getDate() &&
    month === nextDayNow.getMonth() &&
    year === nextDayNow.getFullYear()) ? 'завтра' : dayOfWeek(nextDay);
};

const renderTimeEvent = (timeEvent) => {
  const date = getRightDate(timeEvent);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Minsk',
  };

  return date.toLocaleString('ru', options);
};

const sortDates = dates => dates.sort((a, b) => {
  a = parseInt(a.time.split(':').join(''), 10);
  b = parseInt(b.time.split(':').join(''), 10);
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
});

const getHref = code => `#times=${code}`;

const checkAndGroupTime = (eventList, timeStartSession, startTime, endTime, event) => {
  if (timeStartSession < NOW) {
    return false;
  }

  if (timeStartSession >= startTime &&
    timeStartSession <= endTime) {
    eventList.push({
      time: createTimeView(event.start),
      link: '',
      showId: event.showId,
    });
    return true;
  }
};
const checkLanguage = (movie, filters, filterOptions) => {
  if (filters.other.language) {

    if (filters.other.language[movie.language.id]) {
      filterOptions.language = true;
    }
  }
  if (filters.other.language === undefined) {
    filterOptions.language = true;
  }
};

const checkSub = (movie, filters, filterOptions) => {
  if (filters.other.sub) {
    if (movie.subtitles) {
      filterOptions.sub = true;
    }
  }
  if (filters.other.sub === undefined) {
    filterOptions.sub = true;
  }
};

const checkTypeSeat = (movie, filters, filterOptions) => {
  if (filters.other.typeSeat) {
    Object.keys(filters.other.typeSeat).forEach(filterTypeSeat => {
      if (movie.auditorium.features) {
        Object.keys(movie.auditorium.features).forEach(movieTypeSeat => {
          if (movie.auditorium.features[movieTypeSeat].name === filters.other.typeSeat[filterTypeSeat]) {
            filterOptions.typeSeat = true;
          }
        })
      } else {
        filterOptions.typeSeat = false;
        return;
      }
    })
  }
  if (filters.other.typeSeat === undefined) {
    filterOptions.typeSeat = true;
  }
};

const checkCinema = (movie, filters, filterOptions) => {
  if (movie.theater.id == filters.cinema.key) {
    filterOptions.cinema = true;
  }
};

const checkTypeVideo = (movie, filters, filterOptions) => {
  if (filters.format.video) {
    if (filters.format.video[movie.typeVideo.id]) {
      filterOptions.video = true;
    }
  }
  if (filters.format.video === undefined) {
    filterOptions.video = true;
  }
};

const checkTypeAudio = (movie, filters, filterOptions) => {
  if (filters.format.audio) {
    if (filters.format.audio[movie.typeAudio.id]) {
      filterOptions.audio = true;
    }
  }
  if (filters.format.audio === undefined) {
    filterOptions.audio = true;
  }
};

const checkTime = (movie, filters, filterOptions) => {
  if (movie.listTimeChange.id === filters.time.key) {
    filterOptions.listTimeChange = true;
  }
};

const checkDay = (movie, filters, filterOptions) => {
  const movieStartDate = getBelarusDate(movie.start).getDate();
  const filterDate = getBelarusDate(filters.day.date).getDate()
  if (movieStartDate === filterDate) {
    filterOptions.calendar = true;
  }
};

const checkFormat = (filters, filterOptions, movie) => {
  const options = {
    audio: null,
    video: null,
  }
  if (Object.values(filters.format).filter(a => a).length === 0) {
    options.audio = true;
    options.video = true;
  }
  checkTypeAudio(movie, filters, options);
  checkTypeVideo(movie, filters, options);

  filterOptions.format = options.audio && options.video;
};

const checkOther = (filters, filterOptions, movie) => {
  const options = {
    language: null,
    sub: null,
    typeSeat: null,
  }
  if (Object.values(filters.other).filter(a => a).length === 0) {
    options.language = true;
    options.sub = true;
    options.typeSeat = true;
  }
  checkLanguage(movie, filters, options);
  checkSub(movie, filters, options);
  checkTypeSeat(movie, filters, options);
  filterOptions.other = options.language && options.sub && options.typeSeat;
};



const groupTime = (eventList, event) => {
  if (getRightDate(event.start) < NOW) {
    return false;
  }


  eventList.push({
    time: createTimeView(event.start),
    link: '',
    showId: event.showId,
    screenx: event.typeVideo.id === 4,
  });
  return true;
};

// массив с отфильтрованными эвентами под значения фильтра
const uploadEvents = (events, filters) => {
  // время текущего дня, исключая завершенные сеансы
  const eventListCurrentDay = [];
  // время следующего дня
  const eventListNextDay = [];

  if (events[0] !== null) {
    events.map((event) => {
      const filterOptions = {
        cinema: null,
        calendar: null,
        listTimeChange: null,
        format: null,
        other: null,
      };
      if (filters.time.key === 0) {
        filterOptions.listTimeChange = true;
      }
      checkTypeVideo(event, filters, filterOptions);
      checkTypeAudio(event, filters, filterOptions);
      checkLanguage(event, filters, filterOptions);
      checkTime(event, filters, filterOptions);
      checkDay(event, filters, filterOptions);
      checkSub(event, filters, filterOptions);
      checkTypeSeat(event, filters, filterOptions);
      checkFormat(filters, filterOptions, event);
      checkOther(filters, filterOptions, event);
      if (
        (filters.cinema.key === event.theater.id || filters.cinema.key === 0) &&
        filterOptions.listTimeChange &&
        filterOptions.calendar &&
        filterOptions.format &&
        filterOptions.other
      ) {
        groupTime(eventListCurrentDay, event);
      }
    });

    sortDates(eventListCurrentDay);
  }
  sortDates(eventListNextDay);
  // соединение отсортированных сейансов: сегодняшний + завтра до 7(если выбранна ночь)
  const eventList = [...eventListCurrentDay, ...eventListNextDay];
  return eventList;
}

// отрисовка фильма
const renderFilmPattern = (components, data, movie, activeTabId, filters, event) => {
  if (filters.day.date) {
    data.date = filters.day.date;
  }

  components.childrenList.map((component) => {
    const { style, childrenList: list } = component;

    if (component.typeName === 'image') {
      data.picture = movie.posterLink;
    }

    if (component.typeName === 'label') {
      data.title = movie.name;
    }

    if (component.typeName === 'underName') {
      component.childrenList.forEach((item) => {
        if (findValue(item, 'key') === 'age') {
          data.ageLimit = movie.ageLimit.acronym;
          return true;
        }
        if (findValue(item, 'key') === 'language') {
          if (movie.language && Object.keys(movie.language).length) {
            const languages = (Array.isArray(movie.language) && movie.language) ? movie.language.map(lang => lang.acronym) : [];
            data.language = languages.join(', ');
            return true;
          }
        }
      });
    }

    if (component.typeName === 'aboveName') {
      component.childrenList.forEach((item) => {
        if (findValue(item, 'key') === 'genres') {
          data.genres = movie.genres;
          return true;
        }

        if (item.typeName === 'button') {
          if (movie.showList !== null && activeTabId === Number(findValue(item, 'showKey'))) {
            data.eventsTime = movie.showList;
          }

          if (movie.showList !== null && activeTabId !== Number(findValue(item, 'showKey'))) {
            data.events = movie.showList;
            Object.keys(movie.showList).forEach(dateMovie => {
              movie.showList[dateMovie].forEach(movieItem => {
                if (movieItem.typeVideo.id === 4) {
                  data.screenx = true;
                }
              })
            })
          }
          return true;
        }

        if (findValue(item, 'key') === 'showStart' && activeTabId === Number(findValue(item, 'showKey'))) {
          if (getBelarusDate(new Date()) < getBelarusDate(movie.rentalDateStart)) {
            if (isTomorrow().getDate() === getBelarusDate(movie.rentalDateStart).getDate() && isTomorrow().getMonth() === getBelarusDate(movie.rentalDateStart).getMonth())
              data.showStart = `завтра, ${createDateView(getBelarusDate(movie.rentalDateStart))}`;
            else {
              data.showStart = `${dayOfWeek(getBelarusDate(movie.rentalDateStart))},
              ${createDateView(getBelarusDate(movie.rentalDateStart))}`;
            }
          }
          return true;
        }

        if (item.typeName === 'label' && activeTabId === Number(findValue(item, 'showKey'))) {
          data.showStartTitle = findValue(item, 'value');
          return true;
        }
      });
    }

    if (component.typeName === 'button' && movie.showList !== null) {
      if (movie.showList !== null) {
        if (movie.showList && movie.showList[data.date] && movie.showList[data.date].length && !data.events && !data.screenx) {
          data.events = uploadEvents(movie.showList[data.date], filters);
          data.screenx = !!data.events.find(eventItem => eventItem.screenx);
        }

      }

      data.buyButton = findValue(component, 'value');
    }
  });



  return (<MovieAfisha data={data} event={event} code={movie.code} />);
};

// FilmContainerProvider
const FilmContainerProvider = (props) => {
  const params = queryString.parse(getWindow().location.hash);
  const { style, childrenList: list } = props.componentInfo;
  const {
    activeTabId,
    moviesList,
    event,
    filters,
  } = props;


  if (Object.keys(moviesList).length === 0) return (<div />);

  // массив фильмов-карточек
  const moviesCard = list.map((item) => {
    if (item.typeName === 'filmPattern') {
      let movies = moviesList.filter((movie) => {
        for (let i = 0; i < movie.eventFilters.length; i++) {
          if (movie.eventFilters[i].id === Number(activeTabId)
                || activeTabId === null) return true;
        }

        return false;
      }).filter((tabMovie) => {

        const filterOptions = {
          cinema: null,
          calendar: null,
          listTimeChange: null,
          month: null,
          category: null,
          isHaveShow: null,
          format: null,
          other: null,
        };

        // проверка на совпадение всех условий
        if (props.filters.tabFilters[props.activeTabId]) {
          props.filters.tabFilters[props.activeTabId].forEach(name => {
            switch (name) {
              case 'cinema':
              if (tabMovie.showList && filters.day.date in tabMovie.showList) {
                tabMovie.showList[filters.day.date].forEach((movie) => {
                  checkCinema(movie, props.filters, filterOptions);
                })
              }
                break;
              case 'calendar':
                if (tabMovie.showList && filters.day.date in tabMovie.showList) {
                  tabMovie.showList[filters.day.date].forEach((movie) => {
                    checkDay(movie, props.filters, filterOptions);
                  })
                }
                break;
              case 'listTimeChange':
                if (tabMovie.showList && filters.day.date in tabMovie.showList) {
                  tabMovie.showList[filters.day.date].forEach((movie) => {
                    checkTime(movie, props.filters, filterOptions);
                  })
                }
                break;
              case 'format':
              if (tabMovie.showList && filters.day.date in tabMovie.showList) {
                  tabMovie.showList[filters.day.date].forEach((movie) => {
                    if (!filterOptions[name]) {
                      checkFormat(props.filters, filterOptions, movie);
                    }
                  });
                }
                break;
              case 'other':
              if (tabMovie.showList && filters.day.date in tabMovie.showList) {
                  tabMovie.showList[filters.day.date].forEach((movie) => {
                    if (!filterOptions[name]) {
                      checkOther(props.filters, filterOptions, movie);
                    }
                  })
                }
                break;
              case 'month':
                if (getBelarusDate(tabMovie.rentalDateStart).getMonth() + 1 === props.filters.month.key || props.filters.month.key === 0) {
                  filterOptions.month = true;
                }
                break;
              case 'category':
                if (tabMovie.category && (tabMovie.category.id === props.filters.category.key || props.filters.category.key === 0)) {
                  filterOptions.category = true;
                }
                break;
              case 'isHaveShow':
                if (tabMovie.isHaveShow === props.filters.isHaveShow.key || props.filters.isHaveShow.key === 0) {
                  filterOptions.isHaveShow = true;
                }
                break;
              default:
                break;
            }
          })


        // если не выбранно время с 22.00 до 7.00

          if (props.filters.cinema.key === 0) {
            filterOptions.cinema = true;
          }
          if (props.filters.time.key === 0) {
            filterOptions.listTimeChange = true;
          }
          let isCorrectFilm = props.filters.tabFilters[props.activeTabId].map(filterName => {

            if (filterOptions[filterName]) return true;
            else return false;
          })
          // возращем true когда все условия совпадают
          return isCorrectFilm.find(status => !status) === false ? false : true;
        }
      }).map((movie) => {
        const newProps = {
          data: {},
        };
        return renderFilmPattern(item, newProps.data, movie, activeTabId, filters, event);
      });

      return movies;
    }

    if (item.typeName === 'emptyFilmPattern') {
      const contentLastComponent = item.childrenList.map((component) => {
        if (component.typeName === 'label') {
          return (
            <span>{findValue(component, 'value')}</span>
          );
        }
        if (component.typeName === 'button' && findValue(component, 'showKey').split(', ').indexOf(String(activeTabId)) !== -1) {
          if (findValue(component, 'key') === 'tommorow') {
            const diff = Math.floor(getBelarusDate(`${props.filters.day.date}T00:00:00.00000+03:00`).getTime() - getBelarusDateTime().getTime());
            const day = 1000 * 60 * 60 * 24;
            const days = Math.floor(diff / day);
            const nowDay = `сегодня, ${createDateView(getBelarusDateTime())}`;
            return (
              <LastComponent>
                <a onClick={() => {
                  changeDayInButton(props.nextDayNow, props);
                  if (typeof window !== 'undefined') {
                    getWindow().scrollTo(0, 0);
                  }
                }}
                ><Button secondary>{days >= 12 ?  nowDay : props.nextDay}</Button>
                </a>
              </LastComponent>
            );
          }

          return (
            <LastComponent>
              <a onClick={() => {
                if (findValue(component, 'value') === 'Спецпроекты') {
                  props.setActiveTabId(2);
                  if (typeof window !== 'undefined') {
                    getWindow().scrollTo(0, 0);
                  }
                  getWindow().location.href = '/afisha#special';
                } else if (findValue(component, 'value') === 'Сейчас в кино') {
                  props.setActiveTabId(3);
                  if (typeof window !== 'undefined') {
                    getWindow().scrollTo(0, 0);
                  }
                  getWindow().location.href = '/afisha#now';
                } else {
                  props.setActiveTabId(1);
                  if (typeof window !== 'undefined') {
                    getWindow().scrollTo(0, 0);
                  }
                  getWindow().location.href = '/afisha#soon';
                }
              }
              }
              ><Button secondary>{findValue(component, 'value')}</Button>
              </a>
            </LastComponent>
          );
        }
      });

      return (
        <MovieAfishaLastComponent>
          {contentLastComponent}
          {activeTabId === 3 && !isFilterDefault(props.filters) && (
            <LastComponent>
              <a onClick={() => {
                if (typeof window !== 'undefined') {
                  getWindow().scrollTo(0, 0);
                }
              }}
              >
                <Button
                  small
                  onClick={() => {
                    resetFilter({
                      resetFilterFormat: props.resetFilterFormat,
                      resetFilterOther: props.resetFilterOther,
                      setFilterCinema: props.setFilterCinema,
                      setFilterTime: props.setFilterTime,
                      setFilterDay: props.setFilterDay,
                    });
                  }}
                >
                  Очистить фильтры
                </Button>
              </a>
            </LastComponent>
          )}
        </MovieAfishaLastComponent>
      );
    }
  })
  return (
    renderMovieAfisha(activeTabId, moviesCard, props.moviesList, props.pendingFilterLoader)
  );
};

const mapDispatchToProps = dispatch => ({
  setFilterDay: (day, key, date) => dispatch(setFilterDay(day, key, date)),
  resetFilterFormat: () => dispatch(resetFilterFormat()),
  setFilterTime: (time, key, start, end) => dispatch(setFilterTime(time, key, start, end)),
  resetFilterOther: () => dispatch(resetFilterOther()),
  setFilterCinema: (cinema, key) => dispatch(setFilterCinema(cinema, key)),
});

export default compose(
  withState('nextDayNow', 'setNextDayNow', isTomorrow()),
  withState('nextDay', 'setNextDay', `завтра, ${createDateView(isTomorrow())}`),
  withState('keyForDate', 'setKeyForDate', 0),
  withState('sessionsIsLoaded', 'sessionsIsLoaded', false),
  withState('pendingFilterLoader', 'setPendingFilterLoader', false),
  withState('isAutoChangeDay', 'setAutoChangeDay', false),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withHandlers({
    findNextDay: props => () => new Date(new Date(props.filters.day.date).getTime() + (24 * 60 * 60 * 1000)),
  }),
  lifecycle({
    componentWillMount() {
      if (this.props.moviesStatus === 'success' && Object.keys(this.props.filters.day).length > 0) {
        const currentDate = getBelarusDateTime();
        const date = `${currentDate.getFullYear()}-${(`0${currentDate.getMonth() + 1}`).slice(-2)}-${(`0${currentDate.getDate()}`).slice(-2)}`;
        let filteredMovies = this.props.moviesList.filter((movie) => {
          for (let i = 0; i < movie.eventFilters.length; i++) {
            if (movie.eventFilters[i].id === 3
                  || this.props.filters.activeTabId === null) return true;
          }

          return false;
        });

        let isFindShowsInCurrentDay = false;
        filteredMovies.forEach((movie) => {
          if (this.props.filters.day.date && movie.showList && movie.showList[this.props.filters.day.date]) {
            isFindShowsInCurrentDay = true;
          }
        });

        if (this.props.filters.day.date && date === this.props.filters.day.date && !isFindShowsInCurrentDay) {

          const tommorowDate = `${isTomorrow().getFullYear()}-${(`0${isTomorrow().getMonth() + 1}`).slice(-2)}-${(`0${isTomorrow().getDate()}`).slice(-2)}`;
          this.props.setFilterDay(`завтра, ${createDateView(isTomorrow())}`, isTomorrow().getDate(), tommorowDate);
        }
      }
      this.props.event.checkURLParamsForModalWindows(this.props);
      this.props.event.checkURLParam();

      getWindow().addEventListener('hashchange', () => {
        this.props.event.checkURLParamsForModalWindows(this.props);
        this.props.event.checkURLParam();
      });
    },
    componentWillUpdate() {
      const nextDay = this.props.findNextDay(this.props);

      // проверка: отображает ли кнопка следующий день от выбранного
      if (
        this.props.filters.day.date !== undefined && (
          nextDay.getDate() !== this.props.nextDayNow.getDate() ||
          nextDay.getFullYear() !== this.props.nextDayNow.getFullYear() ||
          nextDay.getMonth() !== this.props.nextDayNow.getMonth()
        )
      ) {
        // находим следующий день с фильтра (если кнопка не отображает следующий день от выбранного
        this.props.setNextDayNow(nextDay);
        this.props.setNextDay(`${setTextNextDay(this.props, nextDay)}, ${createDateView(nextDay)}`);
      }
    },
    componentDidUpdate(prevProps) {
      if (Object.keys(this.props.filters.day).length > 0 && this.props.moviesStatus === 'success' && Object.keys(this.props.filters.day).length !== Object.keys(prevProps.filters.day).length) {
        const currentDate = getBelarusDateTime();
        const date = `${currentDate.getFullYear()}-${(`0${currentDate.getMonth() + 1}`).slice(-2)}-${(`0${currentDate.getDate()}`).slice(-2)}`;

        let filteredMovies = this.props.moviesList.filter((movie) => {
          for (let i = 0; i < movie.eventFilters.length; i++) {
            if (movie.eventFilters[i].id === 3
                  || this.props.filters.activeTabId === null) return true;
          }

          return false;
        });

        let isFindShowsInCurrentDay = false;
        filteredMovies.forEach((movie) => {
          if (this.props.filters.day.date && movie.showList && movie.showList[this.props.filters.day.date]) {
            isFindShowsInCurrentDay = true;
          }
        });


        if (this.props.filters.day.date && date === this.props.filters.day.date && !isFindShowsInCurrentDay) {

          const tommorowDate = `${isTomorrow().getFullYear()}-${(`0${isTomorrow().getMonth() + 1}`).slice(-2)}-${(`0${isTomorrow().getDate()}`).slice(-2)}`;
          this.props.setFilterDay(`завтра, ${createDateView(isTomorrow())}`, isTomorrow().getDate(), tommorowDate);
        }
      }
    },
  }),
)(FilmContainerProvider);
