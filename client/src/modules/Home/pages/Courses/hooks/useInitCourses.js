import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useGetCoursesQuery,
  useGetFacultyInfoQuery,
  useGetAnnouncementsQuery,
} from '../services/coursesApi';
import { useAuthStatQuery } from 'services/accessApi/accessSlice';

const useInitCourses = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useAuthStatQuery();
  const { user } = data;
  const { university, faculty, year, section } = user;

  useEffect(() => {
    if (!searchParams.get('year') && !searchParams.get('section'))
      setSearchParams(prev => {
        prev.set('year', year);
        prev.set('section', section);
        return prev;
      });
  }, [year, section, setSearchParams, searchParams]);

  const {
    data: info,
    isLoading: infoIsLoading,
    isError: infoError,
  } = useGetFacultyInfoQuery(faculty);

  const {
    data: courses,
    isLoading: coursesIsLoading,
    isError: coursesError,
  } = useGetCoursesQuery({
    year: searchParams.get('year') || year,
    section: searchParams.get('section') || section,
    faculty,
    university,
  });

  const { data: announcements, isLoading: announcementsIsLoading } =
    useGetAnnouncementsQuery({
      year: searchParams.get('year') || year,
      section: searchParams.get('section') || section,
      faculty,
      university,
    });

  return {
    courses,
    yearsNum: info?.yearsNum,
    sections: info?.sections,
    year,
    section,
    coursesIsLoading,
    infoIsLoading,
    announcementsIsLoading,
    coursesError,
    infoError,
    announcements,
  };
};

export default useInitCourses;
