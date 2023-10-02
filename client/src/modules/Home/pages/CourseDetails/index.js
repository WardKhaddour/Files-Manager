import { useParams } from 'react-router-dom';
import { useGetCourseDetailsQuery } from './services/courseDetailsApi';
import LoadingSpinner from 'components/LoadingSpinner';
import Details from 'modules/Home/components/Details';
import Projects from 'modules/Home/pages/Projects';

const CourseDetails = () => {
  const { courseId } = useParams();
  const { data: courseData, isLoading } = useGetCourseDetailsQuery(courseId);

  if (courseData?.isProject) {
    return <Projects courseId={courseData.id} title={courseData.name} />;
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!courseData?.isProject && <Details data={courseData} />}
    </>
  );
};

export default CourseDetails;
