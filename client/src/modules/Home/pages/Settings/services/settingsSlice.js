import baseApi from 'services/baseApi/apiSlice';
import { setNotificationStatus } from 'store/notification';

const SETTINGS = 'SETTINGS';

const settingsApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [SETTINGS],
  })
  .injectEndpoints({
    endpoints: build => ({
      updateMe: build.mutation({
        query: userData => ({
          url: '/user/me',
          method: 'PATCH',
          body: userData,
        }),
        invalidatesTags: ['USER_STAT'],

        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const data = await queryFulfilled;
            dispatch(
              setNotificationStatus({
                isShown: true,
                isSuccess: true,
                content: data.data.message,
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
      }),
      updatePassword: build.mutation({
        query: passwordData => ({
          url: '/password/update-password',
          method: 'PATCH',
          body: passwordData,
        }),
        invalidatesTags: ['USER_STAT'],

        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const data = await queryFulfilled;
            dispatch(
              setNotificationStatus({
                isShown: true,
                isSuccess: true,
                content: data.data.message,
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
      }),
      resendConfirmToken: build.mutation({
        query: email => ({
          url: '/auth/resend-confirm-token',
          method: 'POST',
          body: email,
          timeout: 5 * 60 * 1000,
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const data = await queryFulfilled;
            dispatch(
              setNotificationStatus({
                isShown: true,
                isSuccess: true,
                content: data.data.message,
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
      }),
      deleteMe: build.mutation({
        query: password => ({
          url: '/user/me',
          method: 'DELETE',
          body: password,
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
          } catch (err) {
            dispatch(
              setNotificationStatus({
                isSuccess: false,
                content: 'Something went wrong',
                isShown: true,
              })
            );
          }
        },
      }),
      deleteMyPhoto: build.mutation({
        query: () => ({
          url: '/user/my-photo',
          method: 'DELETE',
        }),
        invalidatesTags: ['USER_STAT'],
      }),
    }),
    overrideExisting: false,
  });

export const {
  useUpdateMeMutation,
  useUpdatePasswordMutation,
  useResendConfirmTokenMutation,
  useDeleteMeMutation,
  useDeleteMyPhotoMutation,
} = settingsApi;
