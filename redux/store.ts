// import { configureStore } from '@reduxjs/toolkit';
// // import { createWrapper } from 'next-redux-wrapper'; //not able to save states
// import userReducer from './userSlice';

// const makeStore = () =>
//   configureStore({
//     reducer: {
//       user: userReducer,
//     },
//     devTools: process.env.NODE_ENV !== 'production',
//   });

// export const store = makeStore();

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

// // export const wrapper = createWrapper<AppStore>(makeStore);

// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Import redux-persist conditionally
const isClient = typeof window !== 'undefined';

const rootReducer = combineReducers({
  user: userReducer,
});

// If on client, use redux-persist
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
  // Server-side: no persistence
  store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export { store, persistor };
export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
