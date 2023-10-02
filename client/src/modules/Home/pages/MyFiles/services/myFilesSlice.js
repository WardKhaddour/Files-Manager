import baseApi from 'services/baseApi/apiSlice';
import { setNotificationStatus } from 'store/notification';
import { uploadFileQuery } from 'utils/uploadFileQueryFn';

const MY_FILES = 'MY_FILES';
const CLOUD_STATS = 'CLOUD_STATS';

const myFilesApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [MY_FILES, CLOUD_STATS],
  })
  .injectEndpoints({
    endpoints: build => ({
      getMyCloudStats: build.query({
        query: () => ({
          url: '/user/cloud-stats',
        }),
        providesTags: [CLOUD_STATS],
        transformResponse: res => res.data.stats,
      }),
      getMyCloud: build.query({
        query: () => ({
          url: '/my-cloud',
        }),
        providesTags: [MY_FILES],
        transformResponse: res => res.data,
      }),
      uploadFile: build.mutation({
        queryFn: uploadFileQuery.uploadFileQueryFn({
          url: '/my-cloud',
          timeout: 10 * 6 * 10 * 1000,
        }),

        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              setNotificationStatus({
                isSuccess: true,
                content: 'File Uploaded Successfully',
                isShown: true,
              })
            );
          } catch (err) {
            dispatch(
              setNotificationStatus({
                isSuccess: false,
                content: err.error.data.message,
                isShown: true,
              })
            );
          }
        },
        invalidatesTags: [MY_FILES, CLOUD_STATS],
      }),
      updateFile: build.mutation({
        query: (fileId, name) => ({
          url: `my-cloud/${fileId}`,
          method: 'PATCH',
          body: name,
        }),
      }),
      deleteFile: build.mutation({
        query: fileId => ({
          url: `my-cloud/${fileId}`,
          method: 'DELETE',
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              setNotificationStatus({
                isSuccess: true,
                content: 'File Deleted Successfully',
                isShown: true,
              })
            );
          } catch (err) {
            dispatch(
              setNotificationStatus({
                isSuccess: false,
                content: err.error.data.message,
                isShown: true,
              })
            );
          }
        },
        invalidatesTags: [MY_FILES, CLOUD_STATS],
      }),
    }),
    overrideExisting: false,
  });

export const {
  useGetMyCloudStatsQuery,
  useGetMyCloudQuery,
  useUploadFileMutation,
  useUpdateFileMutation,
  useDeleteFileMutation,
} = myFilesApi;
