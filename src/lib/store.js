import AsyncStorage from '@react-native-community/async-storage';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import createReducer from '../reducers/index';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['root', 'feed']
};

const persistedReducer = persistReducer(persistConfig, createReducer());

export default initialState => {
    const store = createStore(
        persistedReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware)),
    );
    const persistor = persistStore(store);

    return {
        store,
        persistor,
    };
};
