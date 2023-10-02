import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './notification';
import baseApi from 'services/baseApi/apiSlice';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,

    notification: notificationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
