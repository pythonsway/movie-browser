import { fetchMovies, fetchMovieDetails } from '../api/api';

// action types

// export const UPDATE_USER = 'UPDATE_USER'
// export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const REQUEST_SENT = 'REQUEST_SENT';
export const FETCH_TRUE = 'FETCH_TRUE';
export const FETCH_FALSE = 'FETCH_FALSE';
export const FETCH_ERROR = 'FETCH_ERROR';

export const STATES = 'STATES';
export const stateS = () => ({
  type: STATES,
});


// action creators

// export const updateUser = update => ({
//   type: UPDATE_USER,
//   payload: update,
// })

// export const addContact = newContact => ({
//   type: UPDATE_CONTACT,
//   payload: newContact,
// })

export const updateTitle = newTitle => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_TITLE,
      payload: newTitle,
    });
    const { title, page, loading } = getState().movies;
      console.log(newTitle);
      console.log(title);
      console.log(!loading);
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

// ????????????????????????????????????????????
// Async/await parsing json 
// if (movies.Response)
export const updateMovies = (title, page) => async dispatch => {

  dispatch({ type: REQUEST_SENT });
  try {
    const movies = await fetchMovies(title, page);
    if (movies.Response === 'True') {
      dispatch({ type: FETCH_TRUE, payload: movies });
    } else {
      dispatch({ type: FETCH_FALSE, payload: movies });
    }
  } catch (err) {
    dispatch({ type: FETCH_ERROR, payload: err });
  }
};
