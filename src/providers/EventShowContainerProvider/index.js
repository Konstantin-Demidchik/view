/**
 * Provider
 * Описание: Провайдер для работы со страницей списка залов фильма
 * Пример: /afisha/#times=otel-mumbai-protivostojanie-648
 * Ключевые слова: сеансы, список сеансов
 */

import React from 'react';
import { compose } from 'recompose';
import queryString from 'query-string';
import { connect } from 'react-redux';
import getHistory from '../../core/functions/global-history';

import { getWindow } from '../../core/functions/browser';
import {
  formatDate,
  getBelarusDate,
  getRightDate,
  getBelarusDateTime,
  createTimeView,
} from '../../core/functions/datetime';
import { getYoutubeEmbededLink } from '../../core/functions/semantics';
import { makeFormatForDate } from '../../core/functions/days';
import {
  setFilterDay,
  resetFilterFormat,
  setFilterTime,
  resetFilterOther,
  setFilterCinema,
 } from '../../store/actions';
import {
  MovieSessionHeader,
  MovieSessionTrailer,
  ShowTimes,
  ShowTimesItem,
  DayFilter,
  Button,
  Text,
} from '../../components';
import {
  MovieContainer,
  MovieMainLayout,
  MovieAsideLayout,
  AsideContainer,
  AsideImage,
  AsideBlock,
} from '../../pages/MoviePreview/MoviePreviewStyles';

const today = getBelarusDateTime();
const tomorrow = getBelarusDateTime();
tomorrow.setDate(today.getDate() + 1);

const getNextDay = day => new Date(day.getTime() + (24 * 60 * 60 * 1000));

/**
 * Дата в текстовом формате
 * @param {Date} date - дата для преобразования
 * @returns Возвращает дату в текстовом формате
 */
const getFormattedDate = (date) => {
  if (formatDate(today) === formatDate(date)) return `сегодня, ${formatDate(date, 'dd F', true)}`;
  if (formatDate(tomorrow) === formatDate(date)) return `завтра, ${formatDate(date, 'dd F', true)}`;
  return formatDate(date, 'l, dd F', true);
};

/**
 * Время в формате HH ч MM мин
 * @param {Number} time - время в минутах
 * @returns {String} Возвращает время в формате HH ч MM мин
 */
const getTime = (time) => {
  if (!time) return null;
  if (time < 60) return `${time} мин`;
  return `${Math.floor(time / 60)} ч ${time % 60} мин`;
};

const getRootChildren = (component) => {
  if (!component) return {};
  return component.childrenList.reduce((obj, item) => {
    const newObj = { ...obj };
    newObj[item.typeName] = item;
    return newObj;
  }, {});
};

const getChildren = (component) => {
  if (!component) return [];
  return component.childrenList.map(item => ({
    style: item.style,
    childrenList: item.childrenList,
    ...item.componentsDescription,
  }));
};

type EventShowContainerPropsType = {
  dateKey: String,
  componentInfo: Object,
  event: Object,
  setDateKey: (any) => void,
};

const sortSession = (firstNumber, secondNumber) => {
  const firstTime = getBelarusDate(firstNumber.props.fullTime).getTime();
  const secondTime = getBelarusDate(secondNumber.props.fullTime).getTime();
  if (firstTime > secondTime) return 1;
  if (firstTime === secondTime) return 0;
  if (firstTime < secondTime) return -1;
};

const EventShowContainer = (props: EventShowContainerPropsType) => {
  const {
    componentInfo, event, dateKey, filters,
  } = props;

  const {
    eventShowInformation: eventShowInformationMain,
    aside,
  } = getRootChildren(componentInfo);

  const {
    eventShowInformationContainer,
    label: otherDaysLabel,
    eventShowInformation,
    eventShowButtonContainer,
  } = getRootChildren(eventShowInformationMain);

  const [
    eventBannerImage,
    eventNameLabel,
    eventMetaDiv,
  ] = getChildren(eventShowInformationContainer);

  const [
    eventGenreLabel,
    eventAgeLabel,
    eventDurationLabel,
  ] = getChildren(eventMetaDiv);

  const [
    eventCinemaShows,
  ] = getChildren(eventShowInformation);

  const [
    cinemaNameLabel,
    cinemaAddressLabel,
    cinemaButton,
  ] = getChildren(eventCinemaShows);

  const [
    eventTimeLabel,
    eventQualityLabel,
    eventAudioLabel,
    eventHallLabel,
    eventProgressBar,
  ] = getChildren(cinemaButton);

  const [
    eventDateButton,
  ] = getChildren(eventShowButtonContainer);

  const [
    eventDayLabel,
    eventDateLabel,
  ] = getChildren(eventDateButton);

  const [
    movieTrailerImage,
    movieNameLabel,
    movieDescription,
    movieMoreButton,
  ] = getChildren(aside);

  const findEvents = (props) => {
    const checkCinema = (movie, filterOptions) => {
      if (movie.theater !== undefined && movie.theater.id === props.filters.cinema.key) {
        filterOptions.cinema = true;
      }
    };

    const checkDay = (movie, filterOptions) => {
      const movieStartDate = getBelarusDate(movie.start).getDate();
      const filterDate = getBelarusDate(filters.day.date).getDate()
      if (movieStartDate === filterDate) {
        filterOptions.day = true;
      }
    };

    const NOW = new Date();

    const checkTimeAndDayForCurrentDay = (movie, filterOptions) => {
      const movieStart = getRightDate(movie.start);

      if (movieStart.getDate() === new Date(props.filters.day.date).getDate()) {
        filterOptions.day = true;

        if (
          movieStart >=
          new Date(`${props.filters.time.start} ${props.filters.day.date}`) &&
          movieStart <=
          new Date(`${props.filters.day.date}T24:00:00`)
        ) {
          filterOptions.time = true;
        }
      }
    };

    const checkTime = (movie, filterOptions) => {
      if (movie.listTimeChange.id === props.filters.time.key) {
        filterOptions.time = true;
      }
    };

    const checkTypeVideo = (movie, filterOptions) => {
      if (props.filters.format.video) {
        if (filters.format.video[movie.typeVideo.id]) {
          filterOptions.format.video = true;
        }
      }
      if (props.filters.format.video === undefined) {
        filterOptions.format.video = true;
      }
    };

    const checkTypeAudio = (movie, filterOptions) => {
      if (props.filters.format.audio) {
        if (props.filters.format.audio[movie.typeAudio.id]) {
          filterOptions.format.audio = true;
        }
      }
      if (props.filters.format.audio === undefined) {
        filterOptions.format.audio = true;
      }
    };

    const checkLanguage = (movie, filterOptions) => {
      if (props.filters.other.language) {
        if (props.filters.other.language[movie.language.id]) {
          filterOptions.other.language = true;
        }
      }
      if (props.filters.other.language === undefined) {
        filterOptions.other.language = true;
      }
    };

    const checkSub = (movie, filterOptions) => {
      if (props.filters.other.sub) {
        if (movie.subtitles) {
          filterOptions.other.sub = true;
        }
      }
      if (props.filters.other.sub === undefined) {
        filterOptions.other.sub = true;
      }
    };

    const checkTypeSeat = (movie, filterOptions) => {
      if (props.filters.other.typeSeat) {
        Object.keys(props.filters.other.typeSeat).forEach((filterTypeSeat) => {
          if (movie.auditorium.features) {
            Object.keys(movie.auditorium.features).forEach((movieTypeSeat) => {
              if (movie.auditorium.features[movieTypeSeat].name === props.filters.other.typeSeat[filterTypeSeat]) {
                filterOptions.other.typeSeat = true;
              }
            });
          } else {
            filterOptions.other.typeSeat = false;
          }
        });
      }
      if (props.filters.other.typeSeat === undefined) {
        filterOptions.other.typeSeat = true;
      }
    };

    const checkFormat = (filterOptions) => {
      if (Object.values(props.filters.format).filter(a => a).length === 0) {
        filterOptions.format.audio = true;
        filterOptions.format.video = true;
      }
    };

    const checkOther = (filterOptions) => {
      if (Object.values(props.filters.other).filter(a => a).length === 0) {
        filterOptions.other.language = true;
        filterOptions.other.sub = true;
        filterOptions.other.typeSeat = true;
      }
    };

    const data = {};
    // массив фильмов-карточек
    for (const date in props.event.showList) {
      const events = props.event.showList[date].filter((session) => {
        const filterOptions = {
          cinema: null,
          day: null,
          time: null,
          format: {
            video: null,
            audio: null,
          },
          other: {
            language: null,
            sub: null,
            typeSeat: null,
          },
        };


        checkCinema(session, filterOptions);
        checkDay(session, filterOptions);
        checkTime(session, filterOptions);
        checkTypeVideo(session, filterOptions);
        checkTypeAudio(session, filterOptions);
        checkLanguage(session, filterOptions);
        checkSub(session, filterOptions);
        checkTypeSeat(session, filterOptions);


        checkFormat(filterOptions);
        checkOther(filterOptions);
        if (props.filters.cinema.key === 0 || props.filters.cinema.key === undefined) filterOptions.cinema = true;
        if (props.filters.time.key === 0 || props.filters.time.key === undefined) filterOptions.time = true;
        if (props.filters.day.date === undefined) filterOptions.day = true;
        //  if (Object.keys(props.filters.format).length === 0) filterOptions.format = true;

        // возращем true когда все условия совпадают
        return (
          filterOptions.cinema &&
          filterOptions.day &&
          filterOptions.time &&
          filterOptions.format.video &&
          filterOptions.format.audio &&
          filterOptions.other.language &&
          filterOptions.other.sub &&
          filterOptions.other.typeSeat
        );
      });
      if (events.length !== 0) {
        data[date] = events;
      }
    }
    return data;
  };
  const showList = (event.showList && Object.keys(event.showList).length !== 0) ? findEvents(props) : {};

  const showTimes = showList[props.filters.day.date] || [];

  const newShowList = Object.keys(showList)
    .map(item => ({
      date: item,
      formattedDate: getFormattedDate(item),
    }));

  // /
  const allShowList = event.showList ? Object.keys(event.showList)
    .map(item => ({
      date: item,
      formattedDate: getFormattedDate(item),
    })) : [];

  const cinemas = showTimes.reduce((obj, item) => {
    if (!obj[item.theater.id]) {
      return {
        ...obj,
        [item.theater.id]: [item],
      };
    }
    return {
      ...obj,
      [item.theater.id]: [...obj[item.theater.id], item],
    };
  }, {});

  const sessions = Object.values(cinemas).map(item => {
    return {
      cinemaName: item[0].theater.name,
      cinemaAddress: item[0].theater.address,
      hallsList: item.map(session => {
        const d = new Date(session.start);

        return {
          showId: session.showId,
          fullTime: session.start,
          time: createTimeView(d),
          typeVideo: session.typeAudio.name,
          typeAudio: session.typeVideo.name,
          hallTitle: session.auditorium.name,
          filled: (
            (session.busySeats) / session.auditorium.seatsCount
          ) * 100,
        };
      }),
    };
  });

  const location = getHistory().location.pathname;

  return (
    <MovieContainer styleId={componentInfo.style}>
      <MovieMainLayout styleId={eventShowInformationMain.style}>
        <MovieSessionHeader
          styleId={eventShowInformationContainer.style}
          eventBannerImage={eventBannerImage}
          eventNameLabel={eventNameLabel}
          eventGenreLabel={eventGenreLabel}
          eventAgeLabel={eventAgeLabel}
          eventDurationLabel={eventDurationLabel}
          poster={event.posterLink}
          title={event.name}
          description={event.annotation}
          genre={event.genres ? event.genres.map(item => item.name).join(', ') : ''}
          ageLimit={event.ageLimit ? event.ageLimit.acronym : ''}
          duration={getTime(event.runTime)}
        />
        {sessions.length > 0 ? sessions.map((item) => {
          const showTimesItems = item.hallsList.map(hall => (
            hall.filled < 100 ? (
              <ShowTimesItem
                onClick={() => {
                  const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');
                  if (params.times) {
                    event.setShowSeats();
                    getHistory().push(`#times=${params.times}&showID=${hall.showId}`);
                  } else {
                    getHistory().push(`${location}/${hall.showId}`);
                  }
                }
                }
                time={hall.time}
                fullTime={hall.fullTime}
                typeVideo={hall.typeVideo}
                typeAudio={hall.typeAudio}
                hallTitle={hall.hallTitle}
                filled={hall.filled}
                timeStyle={eventTimeLabel.style}
                typeVideoStyle={eventQualityLabel.style}
                typeAudioStyle={eventAudioLabel.style}
                hallTitleStyle={eventHallLabel.style}
                filledStyle={eventProgressBar.style}
              />
            ) : (
              <ShowTimesItem
                time={hall.time}
                fullTime={hall.fullTime}
                locked
              />
            )));
          return (
            <ShowTimes
              cinemaName={item.cinemaName}
              cinemaAddress={item.cinemaAddress}
              cinemaNameStyle={cinemaNameLabel.style}
              cinemaAddressStyle={cinemaAddressLabel.style}
            >
              {showTimesItems.sort(sortSession)}
            </ShowTimes>
          );
        }) : <Text h3 tag="h3">По выбранным параметрам сеансы не найдены.</Text>}
        <DayFilter
          heading={otherDaysLabel.componentsDescription.value}
          headingStyle={otherDaysLabel.style}
          actionsStyle={eventShowButtonContainer.style}
          styleId={componentInfo.style}
        >
          {allShowList.map((item, number) => {
            if (item.date !== props.filters.day.date &&
              (new Date(item.date) >= getBelarusDate(new Date()) ||
              item.date === makeFormatForDate(getBelarusDate(new Date())))) {
              return (
                <Button
                  styleId={eventDateButton.style}
                  secondary
                  onClick={() => {
                    // установка дефолтных значений фильтра
                    const createDateView = (movieFullDate) => {
                      const date = new Date(movieFullDate);
                      const options = {
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'Europe/Minsk',
                      };
                      return date.toLocaleString('ru', options);
                    };

                    props.resetFilterFormat();
                    props.resetFilterOther();
                    props.setFilterCinema('Все кинотеатры, Минск', 0);
                    props.setFilterTime('Все сеансы', 0, null, null);

                    const diff = Math.floor(new Date(item.date).getTime() - getBelarusDate(new Date()).getTime());
                    const day = 1000 * 60 * 60 * 24;
                    const days = Math.floor(diff / day);
                    props.setFilterDay(item.formattedDate, getBelarusDate(`${item.date}`).getDate(), item.date);
                  }}
                >
                  <Text styleId={eventDateLabel.style}>{item.formattedDate}</Text>
                </Button>
              );
            }
          })}
        </DayFilter>
      </MovieMainLayout>
      <MovieAsideLayout>
        <MovieSessionTrailer
          styleId={aside.style}
          title={event.acronym}
          link={event.url}
          trailer={getYoutubeEmbededLink(event.trailerLink)}
          description={event.annotation}
          image={event.trailerLink && `https://img.youtube.com/vi/${event.trailerLink.slice(-11)}/mqdefault.jpg`}
          movieTrailerImage={movieTrailerImage}
          movieNameLabel={movieNameLabel}
          movieDescription={movieDescription}
          movieMoreButton={movieMoreButton}
        />
      </MovieAsideLayout>
    </MovieContainer>
  );
};

const mapStateToProps = state => ({
  filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
  setFilterDay: (day, key, date) => dispatch(setFilterDay(day, key, date)),
  resetFilterFormat: () => dispatch(resetFilterFormat()),
  setFilterTime: (time, key, start, end) => dispatch(setFilterTime(time, key, start, end)),
  resetFilterOther: () => dispatch(resetFilterOther()),
  setFilterCinema: (cinema, key) => dispatch(setFilterCinema(cinema, key)),
});

const EventShowProvider = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EventShowContainer);

export default (componentInfo, movies, event) => <EventShowProvider componentInfo={componentInfo} event={event} />;
