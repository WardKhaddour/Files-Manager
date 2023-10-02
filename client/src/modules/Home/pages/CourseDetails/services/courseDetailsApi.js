import baseApi from 'services/baseApi/apiSlice';

const COURSE_TAG = 'COURSE';

const courseDetailsApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [COURSE_TAG],
  })
  .injectEndpoints({
    endpoints: build => ({
      getCourseDetails: build.query({
        query: courseId => ({
          url: `/course/${courseId}`,
        }),

        transformResponse: res => res.data.course,
      }),
    }),
  });

export const { useGetCourseDetailsQuery } = courseDetailsApi;
