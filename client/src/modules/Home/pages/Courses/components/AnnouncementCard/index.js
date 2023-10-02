import classes from './index.module.css';
import announcement from 'assets/img/announcement.svg';
import chapterMarks from 'assets/img/chapter-marks.svg';
import distributions from 'assets/img/students-distribution.svg';
import DownloadLink from 'modules/Home/components/DownloadLink';

const AnnouncementCard = ({ name, id, type, announcementLink }) => {
  let imgSrc;
  if (type === 'announcement') imgSrc = announcement;
  if (type === 'chapterMarks') imgSrc = chapterMarks;
  if (type === 'distributions') imgSrc = distributions;
  return (
    <article>
      <DownloadLink
        link={announcementLink}
        className={classes.card}
        name={name}
      >
        <div className={classes.img}>
          <img src={imgSrc} alt={type} />
        </div>
        <h2 className={classes.name}>{name}</h2>
      </DownloadLink>
    </article>
  );
};

export default AnnouncementCard;
