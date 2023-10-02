import baseApi from 'services/baseApi/apiSlice';
import { setNotificationStatus } from 'store/notification';

const USER_TAG = 'USER';

const authApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [USER_TAG],
  })
  .injectEndpoints({
    endpoints: build => ({
      login: build.mutation({
        query: userCredentials => ({
          url: '/auth/login',
          method: 'POST',
          body: userCredentials,
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
      signup: build.mutation({
        query: userCredentials => ({
          url: '/auth/signup',
          method: 'POST',
          body: userCredentials,
          timeout: 5 * 60 * 1000,
        }),
        invalidatesTags: ['USER_STAT'],

        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const data = await queryFulfilled;
            dispatch(
              setNotificationStatus({
                isSuccess: true,
                content: data.data.message,
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
      }),
      confirmEmail: build.mutation({
        query: confirmToken => ({
          url: `/auth/confirm-email/${confirmToken}`,
          method: 'PATCH',
        }),
        invalidatesTags: ['USER_STAT'],

        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const data = await queryFulfilled;
            dispatch(
              setNotificationStatus({
                isSuccess: true,
                content: data.data.message,
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
      }),
    }),
    overrideExisting: false,
  });

export const { useLoginMutation, useSignupMutation, useConfirmEmailMutation } =
  authApi;
