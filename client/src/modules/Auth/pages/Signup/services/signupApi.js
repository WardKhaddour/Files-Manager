import baseApi from 'services/baseApi/apiSlice';

const SIGNUP_TAG = 'SIGNUP';

const signupApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [SIGNUP_TAG],
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
} = signupApi;
