import OpenFolder from 'assets/icons/open-folder.svg';
import FolderIcon from 'assets/icons/folder-icon.svg';
import classes from './index.module.css';
import { Link } from 'react-router-dom';

const FolderItem = ({ name, author, id }) => {
  return (
    <article className={classes.item}>
      <div className={classes.type}>
        <img src={FolderIcon} alt="" />
      </div>
      <h2 className={classes.name}>{name}</h2>
      <div className={classes.author}>
        <span className={classes.authorImg}>
          <img src={author.photo} alt={author.name} crossOrigin="anonymous" />
        </span>
        <span className={classes.authorName}>{author.name}</span>
      </div>

      <Link className={classes.contentAction} to={`/folder/${id}`}>
        <img src={OpenFolder} alt="" />
        <span>Open</span>
      </Link>
    </article>
  );
};

export default FolderItem;
