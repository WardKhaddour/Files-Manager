import { Link } from 'react-router-dom';
import { ReactComponent as ArrowBack } from 'assets/icons/arrow_back.svg';
import { FileItem, FolderItem } from 'modules/Home/components/ContentItem';
import classes from './index.module.css';

const Details = ({ data }) => {
  let isEmpty = true;

  if (data?.files && data?.files?.length !== 0) isEmpty = false;
  if (data?.folders && data?.folders?.length !== 0) isEmpty = false;

  return (
    <main className={classes.details}>
      <div className={classes.heading}>
        <Link to={-1} className={classes.backLink}>
          <ArrowBack />
        </Link>
        <h2 className={classes.name}>{data?.name}</h2>
      </div>
      <section className={classes.dataContainer}>
        {isEmpty && <p className={classes.noContent}> No Content Available </p>}
        {!isEmpty && (
          <div className={classes.data}>
            {data?.files?.map(file => (
              <FileItem key={file.id} {...file} />
            ))}
            {data?.folders?.map(folder => (
              <FolderItem key={folder.id} {...folder} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Details;
