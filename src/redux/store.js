import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { modalReducer } from './modal/modal.reducer';
import { productsReducer } from './products/products.reducer';

const productsConfig = {
  key: 'products',
  storage,
  whitelist: ['products'],
  // blacklist: ['isLoading', 'error'],
};

export const store = configureStore({
  reducer: {
    productsStore: persistReducer(productsConfig, productsReducer),
    modal: modalReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
