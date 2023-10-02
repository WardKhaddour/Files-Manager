import { useRef } from 'react';
import UploadPhoto from '../UploadPhoto';
import { Button } from 'components/Button';
import classes from './index.module.css';
import {
  useDeleteMyPhotoMutation,
  useUpdateMeMutation,
} from '../../services/settingsSlice';
const UpdatePhoto = () => {
  const [deleteMyPhoto] = useDeleteMyPhotoMutation();
  const [updateMyPhoto] = useUpdateMeMutation();
  const imageInputRef = useRef();

  const formSubmitHandler = event => {
    event.preventDefault();
    if (imageInputRef.current?.files.length === 0) {
      return;
    }
    const photo = imageInputRef.current?.files[0];
    const formData = new FormData();
    formData.append('photo', photo);
    updateMyPhoto(formData);
  };

  const deletePhotoHandler = () => {
    deleteMyPhoto();
  };

  return (
    <div className={classes.updatePhoto}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <UploadPhoto
          ref={imageInputRef}
          deletePhotoHandler={deletePhotoHandler}
        />
        <Button text="Upload" className={classes.upload} />
      </form>
    </div>
  );
};

export default UpdatePhoto;
