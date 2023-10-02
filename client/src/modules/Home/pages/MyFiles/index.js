import LoadingSpinner from 'components/LoadingSpinner';
import File from '../../components/File';
import classes from './index.module.css';
import {
  useGetMyCloudQuery,
  useUploadFileMutation,
} from './services/myFilesSlice';
import { useState } from 'react';
import UploadFile from 'modules/Home/components/UploadFile';
import FloatingButton from 'modules/Home/components/FloatingButton';
import StorageDetails from './components/StorageDetails';

const FilesSection = ({ files }) => {
  return (
    <>
      <h2 className="title">My Files</h2>
      <div className={classes.content}>
        {files?.map(file => (
          <File key={file.id} {...file} />
        ))}
        {(!files || !files.length > 0) && (
          <p className={classes.noContent}>You have no files</p>
        )}
      </div>
    </>
  );
};

const UploadFileSection = ({ toggleShown, shown }) => {
  const [uploadFile] = useUploadFileMutation();

  const handleUploadFile = file => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    uploadFile(formData);
  };

  return (
    <>
      <FloatingButton onClick={toggleShown} />
      <UploadFile maxSize={300} shown={shown} onUploadFile={handleUploadFile}>
        <StorageDetails />
      </UploadFile>
    </>
  );
};

const MyFiles = () => {
  const { data: files, isLoading } = useGetMyCloudQuery();
  const [addFileShown, setAddFileShown] = useState(false);

  const toggleShowAddFile = e => {
    setAddFileShown(e.target.checked);
  };

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen />}
      <section className={classes.myFiles}>
        {!addFileShown && <FilesSection files={files} />}
        <UploadFileSection
          shown={addFileShown}
          toggleShown={toggleShowAddFile}
        />
      </section>
    </>
  );
};

export default MyFiles;
