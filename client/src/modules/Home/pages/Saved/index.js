import { useGetSavedFilesQuery } from 'modules/Home/services/savedFilesSlice';
import classes from './index.module.css';
import LoadingSpinner from 'components/LoadingSpinner';
import { FileItem } from 'modules/Home/components/ContentItem';

const Saved = () => {
  const { data: savedFiles, isLoading } = useGetSavedFilesQuery();

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen />}
      <section className={classes.saved}>
        <h2 className="title">Saved Files</h2>
        <div className={classes.content}>
          {savedFiles &&
            savedFiles.length > 0 &&
            savedFiles?.map(file => (
              <FileItem key={file.id} {...file} isSaved />
            ))}
          {!savedFiles ||
            (savedFiles.length === 0 && (
              <p className={classes.noContent}>No Saved Files</p>
            ))}
        </div>
      </section>
    </>
  );
};

export default Saved;
