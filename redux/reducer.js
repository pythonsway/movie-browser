import { combineReducers } from 'redux';

import { FETCH_ERROR, FETCH_FALSE, FETCH_TRUE, UPDATE_PAGE, REQUEST_SENT, UPDATE_TITLE } from './actions';


// if object spread not supported in Node:
// const merge = (prev, next) => Object.assign({}, prev, next);
//    merge(state, action.payload);

const initialState = {
  title: '',
  page: 1,
  movies: [],
  totalResults: 0,
  loading: false,
  error: undefined,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        page: 1,
        movies: [],
        title: action.payload
      };
    case UPDATE_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case REQUEST_SENT:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TRUE:
      return {
        ...state,
        movies: [...state.movies, ...action.payload.Search],
        totalResults: JSON.parse(action.payload.totalResults),
        loading: false,
        error: undefined
      };
    case FETCH_FALSE:
      if (state.page > 1) {
        return {
          ...state,
          loading: false,
          // error: 'No more results'
        };
      } else {
        return {
          ...state,
          page: 1,
          movies: [],
          totalResults: 0,
          loading: false,
          error: action.payload.Error
        };
      }
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

// for future split of reducers
const reducer = combineReducers({
  movies: moviesReducer,
});

export default reducer;
