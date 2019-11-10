import React from 'react';
import { Platform } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import localforage from 'localforage';

import reducer from './reducer';

const persistConfig = {
    key: "root",
    storage: (Platform.OS === 'web') ? localforage : ExpoFileSystemStorage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
