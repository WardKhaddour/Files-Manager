import baseApi from 'services/baseApi/apiSlice';
import { setNotificationStatus } from 'store/notification';

const PASSWORD_TAG = 'PASSWORD';

const authApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [PASSWORD_TAG],
  })
  .injectEndpoints({
    endpoints: build => ({
      forgotPassword: build.mutation({
        query: userCredentials => ({
          url: '/password/forgot-password',
          method: 'POST',
          body: userCredentials,
          timeout: 5 * 60 * 1000,
        }),
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
                content: 'Something went wrong',
                isShown: true,
              })
            );
          }
        },
      }),
      resetPassword: build.mutation({
        query: userCredentials => ({
          url: `/password/reset-password/${userCredentials.resetToken}`,
          method: 'PATCH',
          body: userCredentials.data,
        }),

        invalidatesTags: ['USER_STAT'],
      }),
    }),
    overrideExisting: false,
  });

export const { useForgotPasswordMutation, useResetPasswordMutation } = authApi;
