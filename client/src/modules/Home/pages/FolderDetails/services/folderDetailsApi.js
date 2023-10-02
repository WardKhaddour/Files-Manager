import baseApi from 'services/baseApi/apiSlice';

const FOLDER_TAG = 'FOLDER';

const folderDetailsApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [FOLDER_TAG],
  })
  .injectEndpoints({
    endpoints: build => ({
      getFolderDetails: build.query({
        query: folderId => ({
          url: `/folder/${folderId}`,
        }),

        transformResponse: res => res.data.folder,
      }),
    }),
  });

export const { useGetFolderDetailsQuery } = folderDetailsApi;
