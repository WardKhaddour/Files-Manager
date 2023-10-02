import { Link } from 'react-router-dom';
import classes from './index.module.css';
import courseImg from 'assets/img/course.svg';

const CourseCard = ({ id, name }) => {
  return (
    <Link to={`/courses/${id}`} className={classes.link}>
      <article className={classes.card}>
        <h3 className={classes.name}>{name}</h3>
        <div className={classes.image}>
          <img src={courseImg} alt={name} />
        </div>
        <p className={classes.paragraph}>
          Open to show content and download files
        </p>
      </article>
    </Link>
  );
};

export default CourseCard;
