import baseApi from 'services/baseApi/apiSlice';
import { setNotificationStatus } from 'store/notification';
import { uploadFileQuery } from 'utils/uploadFileQueryFn';

const PROJECTS = 'PROJECTS';

const myFilesApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [PROJECTS],
  })
  .injectEndpoints({
    endpoints: build => ({
      searchUser: build.query({
        query: data => ({
          url: '/user/search',
          params: { search: data, role: 'student' },
        }),
        transformResponse: res =>
          res.data.users.map(user => ({
            label: user.name,
            value: user.id,
            ...user,
          })),
      }),

      getProjects: build.query({
        query: query => ({
          url: '/project',
          params: query,
        }),
        providesTags: [PROJECTS],
        transformResponse: res => res.data,
      }),
      uploadProject: build.mutation({
        queryFn: uploadFileQuery.uploadFileQueryFn({
          url: '/project',
          timeout: 10 * 6 * 10 * 1000,
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              setNotificationStatus({
                isSuccess: true,
                content: 'Project Uploaded Successfully',
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
        invalidatesTags: [PROJECTS],
      }),

      deleteProject: build.mutation({
        query: projectId => ({
          url: `project/${projectId}`,
          method: 'DELETE',
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(
              setNotificationStatus({
                isSuccess: true,
                content: 'Project Deleted Successfully',
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
        invalidatesTags: [PROJECTS],
      }),
    }),
    overrideExisting: false,
  });

export const {
  useLazySearchUserQuery,
  useGetProjectsQuery,
  useUploadProjectMutation,
  useDeleteProjectMutation,
} = myFilesApi;
