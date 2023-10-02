import classes from './index.module.css';
import React, { useState } from 'react';
import { Button } from 'components/Button';
import SecondaryButton from 'components/SecondaryButton';
import { useAuthStatQuery } from 'services/accessApi/accessSlice';

const PhotoPreview = ({
  removePhotoHandler,
  selectedPhoto,
  didSelectPhoto,
}) => {
  const { data } = useAuthStatQuery();
  const { photo } = data.user;

  return (
    <div className={classes.photoPreview}>
      {didSelectPhoto && (
        <button
          onClick={removePhotoHandler}
          className={classes.removePhoto}
          type="button"
        >
          &nbsp;
        </button>
      )}
      <img
        crossOrigin="anonymous"
        className={classes.previewImage}
        src={didSelectPhoto ? selectedPhoto : photo}
        alt={'User '}
      />
    </div>
  );
};

const UploadPhoto = React.forwardRef(({ deletePhotoHandler }, ref) => {
  const { data } = useAuthStatQuery();
  const { user } = data;
  const [selectedPhoto, setSelectedPhoto] = useState(user?.photo);
  const [didSelectPhoto, setDidSelectPhoto] = useState(false);
  const selectPhotoHandler = event => {
    const files = event.target.files;
    if (!files || !files.length) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onloadend = function () {
      setSelectedPhoto(reader.result?.toString() || '');
      setDidSelectPhoto(true);
    };
  };
  const removePhoto = () => {
    setSelectedPhoto(user.photo);
    setDidSelectPhoto(false);
  };
  const handleDeletePhoto = async () => {
    if (deletePhotoHandler) {
      await deletePhotoHandler();
      setDidSelectPhoto(false);
      setSelectedPhoto(null);
    }
  };

  return (
    <>
      <PhotoPreview
        didSelectPhoto={didSelectPhoto}
        removePhotoHandler={removePhoto}
        selectedPhoto={selectedPhoto}
      />
      <div className={classes.uploadActions}>
        <div className={classes.formControl}>
          <SecondaryButton type="button">
            <label htmlFor="userPhoto">Choose Photo</label>
          </SecondaryButton>
          <input
            onChange={selectPhotoHandler}
            className={classes.input}
            type="file"
            id="userPhoto"
            accept="image/*"
            ref={ref}
          />
        </div>
        {user?.photo && !user?.photo.includes('default-user-photo.png') && (
          <div className={classes.formControl} onClick={handleDeletePhoto}>
            <Button text="Delete" type="button" />
          </div>
        )}
      </div>
    </>
  );
});

export default UploadPhoto;
