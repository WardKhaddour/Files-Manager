import baseApi from 'services/baseApi/apiSlice';

const COURSES_TAG = 'COURSES';

const coursesApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [COURSES_TAG],
  })
  .injectEndpoints({
    endpoints: build => ({
      getCourses: build.query({
        query: ({ university, faculty, year, section }) => ({
          url: '/course',
          params: { university, faculty, year, section },
        }),

        transformResponse: res => res.data.courses,
      }),
      getFacultyInfo: build.query({
        query: facultyId => ({
          url: `/faculty/${facultyId}/info`,
        }),
        transformResponse: res => ({
          sections: res.data.sections,
          yearsNum: res.data.yearsNum,
        }),
      }),
      getAnnouncements: build.query({
        query: ({ university, faculty, year, section }) => ({
          url: '/announcement',
          params: { university, faculty, year, section },
        }),
        transformResponse: res => res.data.announcements,
      }),
    }),
  });

export const {
  useGetCoursesQuery,
  useGetFacultyInfoQuery,
  useGetAnnouncementsQuery,
} = coursesApi;
