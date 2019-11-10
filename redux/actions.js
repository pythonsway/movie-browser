import { fetchMovies } from '../api/api';


// action types
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const REQUEST_SENT = 'REQUEST_SENT';
export const FETCH_TRUE = 'FETCH_TRUE';
export const FETCH_FALSE = 'FETCH_FALSE';
export const FETCH_ERROR = 'FETCH_ERROR';

// action creators
export const updateTitle = newTitle => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_TITLE,
      payload: newTitle,
    });
    const { title, page, loading } = getState().movies;
    dispatch(updateMovies(title, page));
  }
};

export const updatePage = () => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PAGE,
    });
    const { title, page } = getState().movies;
    dispatch(updateMovies(title, page));
  }
};

// async action creatorS
export const updateMovies = (title, page) => async dispatch => {
  dispatch({ type: REQUEST_SENT });
  try {
    const movies = await fetchMovies(title, page);
    // if (JSON.parse(movies.Response))
    if (movies.Response === 'True') {
      dispatch({ type: FETCH_TRUE, payload: movies });
    } else {
      dispatch({ type: FETCH_FALSE, payload: movies });
    }
  } catch (err) {
    dispatch({ type: FETCH_ERROR, payload: err });
  }
};
