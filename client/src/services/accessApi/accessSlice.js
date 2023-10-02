import baseApi from '../baseApi/apiSlice';

const USER_STAT = 'USER_STAT';

const accessApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [USER_STAT],
  })
  .injectEndpoints({
    endpoints: build => ({
      authStat: build.query({
        query: () => ({
          url: '/user/auth-stat',
        }),
        providesTags: [USER_STAT],

        transformResponse: res => {
          return { user: res.data.user, isAuthenticated: true };
        },
        transformErrorResponse: err => {
          return err;
        },
      }),
      logout: build.mutation({
        query: () => ({
          url: '/auth/logout',
          method: 'POST',
        }),
        invalidatesTags: [USER_STAT],
      }),
    }),
    overrideExisting: false,
  });

export const { useLazyAuthStatQuery, useAuthStatQuery, useLogoutMutation } =
  accessApi;
