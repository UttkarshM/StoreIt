// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const isClient = typeof window !== 'undefined';

let store: ReturnType<typeof configureStore>;
let persistor: any;

if (isClient) {
  const { persistStore, persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

  persistor = persistStore(store);
} else {
  store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export { store, persistor };
export type AppStore = typeof store;
export type AppState = RootState;
export type AppDispatch = AppStore['dispatch'];
