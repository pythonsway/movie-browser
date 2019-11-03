import { combineReducers } from 'redux';

import { UPDATE_TITLE, UPDATE_PAGE, REQUEST_SENT, FETCH_TRUE, FETCH_FALSE, FETCH_ERROR, STATES } from './actions';

// if object spread not supported in Node:
const merge = (prev, next) => Object.assign({}, prev, next);
//    merge(state, action.payload);


// const contactReducer = (state = [], action) => {
//   if (action.type === UPDATE_CONTACT) return [...state, action.payload]
//   return state
// }

// const userReducer = (state = {}, action) => {
//   switch (action.type) {
//     case UPDATE_USER:
//       return merge(state, action.payload)
//     case UPDATE_CONTACT:
//       return merge(state, {prevContact: action.payload})
//     default:
//       return state
//   }
// }

const initialState = {
  title: '',
  page: 1,
  movies: [],
  totalResults: 0,
  loading: false,
  error: undefined,
};

// const formReducer = (state = {}, action) => {
//   switch (action.type) {
//     case UPDATE_PAGE:
//       return { ...state, page: state.page + 1 };
//     default:
//       return state
//   }
// };

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATES:
      console.log(state);
      return state;
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
      if (state.totalResults > 1) {
        return {
          ...state,
          loading: false,
          error: 'No more results'
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

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case UPDATE_CONTACT:
      return merge(state, { prevContact: action.payload })
    case LOG_IN_FULFILLED:
      return merge(state, { token: action.payload })
    case LOG_IN_REJECTED:
      return merge(state, { loginErr: action.payload })
    default:
      return state
  }
};

const reducer = combineReducers({
  movies: moviesReducer,
});

export default reducer;
