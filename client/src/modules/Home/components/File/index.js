import { ReactComponent as FileIcon } from 'assets/icons/file-icon.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete-icon.svg';

import classes from './index.module.css';
import { useDeleteFileMutation } from '../../pages/MyFiles/services/myFilesSlice';
import byteToString from 'utils/byteSize/byteToReadable';
import DownloadLink from '../DownloadLink';

const File = ({ id, name, size, fileLink, onRemove }) => {
  const [deleteFile] = useDeleteFileMutation();

  const handleDelete = e => {
    e.preventDefault();
    if (onRemove) {
      onRemove();
      return;
    }
    deleteFile(id);
  };

  const content = (
    <article className={classes.file}>
      <div className={classes.icon}>
        <FileIcon />
      </div>
      <h2 className={classes.name}>{name}</h2>
      {size && <div className={classes.size}>{byteToString(size)}</div>}

      <div className={classes.actions}>
        <button className={classes.action} onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
    </article>
  );

  return (
    <>
      {fileLink && (
        <DownloadLink
          link={fileLink}
          className={classes.downloadLink}
          name={name}
        >
          {content}
        </DownloadLink>
      )}
      {!fileLink && content}
    </>
  );
};

export default File;
