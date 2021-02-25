import React from 'react';

import {
  MovieItem,
} from '../../components';
import { isMobile } from 'react-device-detect';
import { dayOfWeek, getRightDate, formatDate, getBelarusDate, getBelarusDateTime, createDateView } from '../../core/functions/datetime';

export default function FilmPatternContainerProvider(componentInfo, activeTabId, moviesList, event) {
  const { style, childrenList: list } = componentInfo;

  const findValue = (comp, fieldName) => {
    if (fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  let currentDate = formatDate(getBelarusDateTime());

  const isTomorrow = () => {
    const tomorrow = getBelarusDateTime();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };
  // 26-44 выбираем день, который будет показыватся в movieRoller (если фильмов-сеансов нет на сегодня, то показываем фильмы на завтрашний день)
  let movieRollerDate = formatDate(isTomorrow());
  let isEmptyNowShowList = true;
  moviesList.forEach((movie) => {
    let isCorrectActiveTab = false;
    for (let i = 0; i < movie.eventFilters.length; i++) {
      if (movie.eventFilters[i].id === Number(activeTabId) || activeTabId === null) isCorrectActiveTab = true;
    }

    if (movie.showList && movie.showList[currentDate]) {
      movie.showList[currentDate].forEach(eventItem => {
        if (getBelarusDate(eventItem.start) > getBelarusDateTime() && (Number(activeTabId) === 3) && isCorrectActiveTab) {
          isEmptyNowShowList = false;
          movieRollerDate = currentDate;
        }
      })
    }

  })

  const cinemaId = componentInfo.componentsDescription ? findValue(componentInfo, 'cinema') : null; // id кинотеатра для того, чтобы показывать "свой" movieRoller для отдельной страницы кинотеатра
  const typeAudioId = componentInfo.componentsDescription ? findValue(componentInfo, 'typeAudio') : null; // id кинотеатра для того, чтобы показывать "свой" movieRoller для отдельной страницы кинотеатра
  const movies = !(moviesList instanceof Array) ? [] : moviesList.filter((movie) => {
    let isCorrectActiveTab = false;
    let isCorrectDateInShowList = false;
    let isCorrectCinema = false;
    let isCorrectTypeAudio = false;

    for (let i = 0; i < movie.eventFilters.length; i++) {
      if (movie.eventFilters[i].id === Number(activeTabId) || activeTabId === null) isCorrectActiveTab = true;
    }

    if(isCorrectActiveTab && Number(activeTabId) === 3 && movie.showList) {          // activeTabId = 3 Активный таб "Сейчас в кино"

      if (typeAudioId) { // проверка typeAudio DolbyAtmos для страницы DolbyAtmos
        Object.keys(movie.showList).forEach(movieDate => {
          movie.showList[movieDate].forEach(movieEvent => {
            if (movieEvent.typeAudio.id === Number(typeAudioId)) {
              isCorrectTypeAudio = true;
            }
          })
        })
        // Проверка на три условия(активный таб, typeAudio), данная проверка нужна для страницы DolbyAtmos
        return ((Number(activeTabId) === 3) && (isCorrectActiveTab && isCorrectTypeAudio));
      }
      if (movie.showList[movieRollerDate]) {
        isCorrectDateInShowList = true;

        if (cinemaId) { // проверка id кинотеатра для конкретной страницы кинотеатра
          movie.showList[movieRollerDate].forEach(movieEvent => {
            if(movieEvent.theater.id === Number(cinemaId)) isCorrectCinema = true;
          });

        }
      }
    }
    if(Number(cinemaId)) {
      return (Number(activeTabId) === 3) && (isCorrectActiveTab && isCorrectDateInShowList && isCorrectCinema); // Проверка на три условия(текущий день, активный таб, кинотеатр), данная проверка нужна для страницы определенного кинотетра
    } else {
      return (Number(activeTabId) === 3) ? (isCorrectActiveTab && isCorrectDateInShowList) : isCorrectActiveTab; // Проверка на "сейчас в кино" (два условия, на текущий день и активный таб)
    }

  }).map((movie) => {

    const isTomorrow = () => {
      const tomorrow = getBelarusDate(new Date((new Date()).getTime() + (24 * 60 * 60 * 1000)));
      return tomorrow;
    };

    let props = {
      poster: null,
      title: null,
      genres: null,
      ageLimit: null,
      language: null,
      afishaLink: null,
      movieDate: null,
      posterStart: [],
      posterStyle: null,
      titleStyle: null,
      ageLimitStyle: null,
      languageStyle: null,
      genresStyle: null,
      showList: null,
    };

    list.forEach((item) => {
      if (item.typeName === 'image') {
        props.poster = movie.posterLink;
        props.posterStyle = item.style;
        return true;
      }

      if (item.typeName === 'label') {
        props.title = movie.name;
        props.titleStyle = item.style;
        return true;
      }

      if (item.typeName === 'underName') {
        item.childrenList.forEach((component) => {
          if (findValue(component, 'key') === 'age') {
            props.ageLimit = movie.ageLimit.acronym;
            props.ageLimitStyle = component.style;
            return true;
          }
          if (findValue(component, 'key') === 'language') {
            if (movie.language) {
              const languages = (Array.isArray(movie.language) && movie.language) ? movie.language.map(lang => lang.acronym) : [];
              props.language = languages.join(', ');
              props.languageStyle = component.style;
              return true;
            }
          }
        });
        return true;
      }
      if (item.typeName === 'aboveName') {
        item.childrenList.forEach((component) => {
          if (findValue(component, 'key') === 'genres') {
            props.genres = movie.genres;
            props.genresStyle = component.style;
            return true;
          }

          if (activeTabId === findValue(component, 'showKey')) {
            if (getBelarusDateTime() < getRightDate(movie.rentalDateStart)) {
              props.posterStart.push(component);
              if (isTomorrow().getDate() === getRightDate(movie.rentalDateStart).getDate()) props.movieDate = `завтра, ${createDateView(movie.rentalDateStart)}`;
              else {
                props.movieDate = `${dayOfWeek(getRightDate(movie.rentalDateStart))},
                ${createDateView(movie.rentalDateStart)}`;
              }
            }

            return true;
          }
        });
      }
      if (item.typeName === 'button') {
        props = {
          ...props,
          buyButton: findValue(item, 'value'),
          buyButtonStyle: item.style,
          afishaLink: movie.code,
          // clickTomorrow: clickTomorrow,
        };
        return true;
      }
    });

    props.event = event;
    props.showList = movie.showList;

    return (
      <MovieItem {...props} conditions={componentInfo.componentsDescription} isMobile={isMobile} activeTabId={activeTabId}/>
    );
  });

  return movies;
}
