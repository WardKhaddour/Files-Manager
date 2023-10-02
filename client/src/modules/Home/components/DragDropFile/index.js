import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import DragDropImg from 'assets/img/drag-drop.svg';

import classes from './index.module.css';
import { Button } from 'components/Button';
import File from 'modules/Home/components/File';

const DragDropFile = ({ name, maxSize = 20, minSize = 0, onSubmit, types }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = file => {
    setFile(file);
  };
  return (
    <div className={classes.upload}>
      <FileUploader
        handleChange={handleChange}
        name={name}
        maxSize={maxSize}
        minSize={minSize}
        disabled={!!file}
        types={types}
        onTypeError={err => {
          setError({ error: err, type: 'type-error' });
        }}
        onSelect={() => setError(null)}
        onDrop={() => setError(null)}
        onSizeError={err => {
          setError({ error: err, type: 'size-error' });
        }}
      >
        <div className={classes.fileUpload}>
          <div className={classes.img}>
            <img src={DragDropImg} alt="" />
          </div>
          <p className={classes.text}>Drag and Drop Files Here</p>
          {error && (
            <p className={classes.error}>
              {error.error}
              {error.type === 'type-error'
                ? ` You can upload only 
              ${types?.map((el, index, arr) => {
                if (index !== arr.length - 1) {
                  return `${el} and `;
                }
                return `${el} files.`;
              })}`
                : `, maximum size is ${maxSize} MB`}
            </p>
          )}
          <h2 className={classes.or}>
            <span>OR</span>
          </h2>
          <Button className={classes.browse} type="submit">
            Select File
          </Button>
        </div>
      </FileUploader>

      {file && (
        <div className={classes.uploadedFile}>
          <File
            name={file.name}
            size={file.size}
            onRemove={() => setFile(null)}
          />
          <form
            onSubmit={e =>
              e.preventDefault() || onSubmit(file) || setFile(null)
            }
          >
            <Button className={classes.submit} text="Upload" />
          </form>
        </div>
      )}
    </div>
  );
};

export default DragDropFile;
