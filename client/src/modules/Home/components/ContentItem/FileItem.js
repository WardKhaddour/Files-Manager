import DownloadIcon from 'assets/icons/download-file.svg';
import PdfFile from 'assets/icons/pdf-file.svg';
import WordFile from 'assets/icons/word-file.svg';
import PptFile from 'assets/icons/ppt-file.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/saved.svg';
import { ReactComponent as SaveIconOutlined } from 'assets/icons/saved-outlined.svg';
import classes from './index.module.css';
import { useToggleSaveFileMutation } from 'modules/Home/services/savedFilesSlice';
import { useEffect, useState } from 'react';
import DownloadLink from '../DownloadLink';

const FileItem = ({ name, author, id, fileLink, isSaved }) => {
  const [toggleSaveFile, { isSuccess }] = useToggleSaveFileMutation();
  const [isFileSaved, setIsFileSaved] = useState(isSaved);

  useEffect(() => {
    if (isSuccess) {
      setIsFileSaved(prev => !prev);
    }
  }, [isSuccess]);

  const handleToggleSaveFile = () => {
    toggleSaveFile(id);
  };
  return (
    <article className={classes.item}>
      <div className={classes.type}>
        {fileLink.endsWith('pdf') && <img src={PdfFile} alt="" />}
        {(fileLink.endsWith('doc') || fileLink.endsWith('docs')) && (
          <img src={WordFile} alt="" />
        )}
        {(fileLink.endsWith('ppt') || fileLink.endsWith('pptx')) && (
          <img src={PptFile} alt="" />
        )}
      </div>
      <h2 className={classes.name}>{name}</h2>
      <div className={classes.author}>
        <span className={classes.authorImg}>
          <img src={author.photo} alt={author.name} crossOrigin="anonymous" />
        </span>
        <span className={classes.authorName}>{author.name}</span>
      </div>

      <div className={classes.contentActions}>
        <button
          className={classes.contentAction}
          title={name}
          onClick={handleToggleSaveFile}
        >
          {isFileSaved && (
            <>
              <SaveIcon />
              <span>UnSave</span>
            </>
          )}
          {!isFileSaved && (
            <>
              <SaveIconOutlined />
              <span>Save</span>
            </>
          )}
        </button>
        <DownloadLink
          className={classes.contentAction}
          link={fileLink}
          name={name}
        >
          <img src={DownloadIcon} alt="" />
          <span>Download</span>
        </DownloadLink>
      </div>
    </article>
  );
};

export default FileItem;
