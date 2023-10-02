import baseApi from 'services/baseApi/apiSlice';

const SAVED = 'SAVED';

const savedFilesApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [SAVED],
  })
  .injectEndpoints({
    endpoints: build => ({
      getSavedFiles: build.query({
        query: () => ({
          url: '/user/saved',
        }),
        transformResponse: res => res.data.savedFiles,
        providesTags: [SAVED],
      }),
      toggleSaveFile: build.mutation({
        query: fileId => ({
          url: `/user/saved/${fileId}`,
          method: 'PATCH',
        }),
        invalidatesTags: [SAVED],
      }),
    }),
    overrideExisting: false,
  });

export const { useGetSavedFilesQuery, useToggleSaveFileMutation } =
  savedFilesApi;
