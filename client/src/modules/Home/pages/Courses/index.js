import Filters from './components/Filters';
import Carousel from 'components/Carousel';
import CourseCard from './components/CourseCard';
import AnnouncementCard from './components/AnnouncementCard';
import useInitCourses from './hooks/useInitCourses';
import classes from './index.module.css';
import LoadingSpinner from 'components/LoadingSpinner';
import { useSearchParams } from 'react-router-dom';

const renderLoadingSpinner = loading => {
  if (loading)
    return (
      <div className={classes.spinnerContainer}>
        <LoadingSpinner />
      </div>
    );
  return null;
};

const renderCarousel = ({ data, Component, rows, elementsPerRow, name }) => {
  if (!data || data.length === 0) {
    return <p className={classes.noData}>No {name} Available</p>;
  }

  return (
    <Carousel
      data={data}
      SlideComponent={Component}
      rows={rows}
      elementsPerRow={elementsPerRow}
    />
  );
};

const FiltersSection = ({ isLoading, sections, yearsNum, year, section }) => {
  return (
    <>
      {renderLoadingSpinner(isLoading)}
      {!isLoading && (
        <Filters
          sections={sections}
          years={yearsNum}
          year={year}
          section={section}
        />
      )}
    </>
  );
};

const CoursesSection = ({ isLoading, courses }) => {
  return (
    <>
      {renderLoadingSpinner(isLoading)}
      {!isLoading &&
        renderCarousel({
          data: courses,
          Component: CourseCard,
          name: 'Courses',
        })}
    </>
  );
};

const AnnouncementsSection = ({ isLoading, announcements }) => {
  return (
    <>
      <h2 className="title">Announcement</h2>
      {renderLoadingSpinner(isLoading)}
      {!isLoading &&
        renderCarousel({
          data: announcements,
          Component: AnnouncementCard,
          rows: 2,
          elementsPerRow: 5,
          name: 'Announcements',
        })}
    </>
  );
};

const Courses = () => {
  const {
    courses,
    sections,
    year,
    section,
    yearsNum,
    announcements,
    coursesIsLoading,
    infoIsLoading,
    announcementsIsLoading,
  } = useInitCourses();
  const [searchParams] = useSearchParams();

  return (
    <section className={classes.courses}>
      <h2 className="title">Courses</h2>
      <FiltersSection
        isLoading={infoIsLoading}
        yearsNum={yearsNum}
        sections={sections}
        section={searchParams.get('section') || section}
        year={+searchParams.get('year') || year}
      />
      <CoursesSection courses={courses} isLoading={coursesIsLoading} />
      <AnnouncementsSection
        announcements={announcements}
        isLoading={announcementsIsLoading}
      />
    </section>
  );
};

export default Courses;
