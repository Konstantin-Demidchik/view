import * as actionsTypes from './actionsTypes';
import { get } from '../../core/rest';

import { API_ALL_EVENTS } from '../../core/rest/paths';

const loadMoviesSuccess = (movies) => {
  return { type: actionsTypes.LOAD_MOVIES_SUCCESS, movies };
};

const setLoadMoviesStatus = (moviesStatus) => {
  return { type: actionsTypes.LOAD_MOVIES_STATUS, moviesStatus };
};

const loadMovies = () => (
  dispatch => get(
    API_ALL_EVENTS, {},
    (res) => {
      if (res.status === 200 && res.data instanceof Array) {
        let movies = [...res.data];
        // сортировка по order'у к каждому фильму для правильного расположения фильмов
        movies.sort((a, b) => a.order - b.order);

        dispatch(loadMoviesSuccess(movies));
        dispatch(setLoadMoviesStatus('success'));
      } else {
        // fail
        dispatch(setLoadMoviesStatus('fail'));
      }
    },
    (e) => {
      dispatch(setLoadMoviesStatus('fail'));
    },
  )
);


export {
  loadMoviesSuccess,
  loadMovies,
  setLoadMoviesStatus,
};
