import DragDropFile from '../DragDropFile';
import classes from './index.module.css';

export const UploadFile = ({
  shown,
  children,
  onUploadFile,
  types,
  childrenTop = false,
  maxSize,
}) => {
  const classNames = [classes.uploadFile];
  if (shown) classNames.push(classes.shown);
  else classNames.push(classes.hidden);

  return (
    <section className={classNames.join(' ')}>
      {childrenTop && children}
      <DragDropFile
        onSubmit={onUploadFile}
        name="file"
        types={types}
        maxSize={maxSize}
      />
      {!childrenTop && children}
    </section>
  );
};

export default UploadFile;
