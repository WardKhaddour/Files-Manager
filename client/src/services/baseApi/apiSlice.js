import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { uploadFileQuery } from 'utils/uploadFileQueryFn';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/api'
    : 'https://tishreen-file-manager.onrender.com/api';

uploadFileQuery.init(baseUrl);

const baseApi = createApi({
  reducerPath: 'baseApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    timeout: 6 * 10 * 1000, // 10 Seconds
  }),
  endpoints: () => ({}),
});

export default baseApi;
