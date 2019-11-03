import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage'; ////////////////////////
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';

import reducer from './reducer';


const persistConfig = {
    key: "root",
    storage: ExpoFileSystemStorage
};

// const initialState = {
    //     title: '',
    //     page: 1,
    //     movies: null,
    //     totalResults: 0,
    //     loading: false,
    //     error: undefined,
    // };
    
    // const store = createStore(reducer, initialState);
    // const store = createStore(persistedReducer, applyMiddleware(thunk));
    
    /*
    store.dispatch(updateUser({foo: 'foo'}))
    store.dispatch(updateUser({bar: 'bar'}))
    store.dispatch(updateUser({foo: 'baz'}))
    */
   
   // store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
   // store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
   // store.dispatch(addContact({name: 'david m', phone: '5050505050'}))
  
   const persistedReducer = persistReducer(persistConfig, reducer);
   
   export const store = createStore(persistedReducer, applyMiddleware(thunk));
   export const persistor = persistStore(store);
   