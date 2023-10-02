import baseApi from 'services/baseApi/apiSlice';

const USER_STUDY = 'USER_STUDY';

const userStudyApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [USER_STUDY],
  })
  .injectEndpoints({
    endpoints: build => ({
      getAllUniversities: build.query({
        query: () => ({
          url: '/university',
        }),
        transformResponse: res => {
          return res.data.universities;
        },
      }),
      getAllFaculties: build.query({
        query: universityId => ({
          url: `faculty/university/${universityId}`,
        }),
        transformResponse: res => {
          return res.data.faculties;
        },
      }),
      getFacultyInfo: build.query({
        query: facultyId => ({
          url: `/faculty/${facultyId}/info`,
        }),
        transformResponse: res => {
          return {
            sections: res.data.sections,
            yearsNum: res.data.yearsNum,
          };
        },
      }),
    }),
  });

export const {
  useGetAllUniversitiesQuery,
  useLazyGetAllFacultiesQuery,
  useLazyGetFacultyInfoQuery,
} = userStudyApi;
