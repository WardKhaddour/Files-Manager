import axios from 'axios';
import { setNotificationStatus } from 'store/notification';

class UploadFileQuery {
  baseUrl;

  init(baseUrl) {
    this.baseUrl = baseUrl;
  }

  uploadFileQueryFn({ timeout, url }) {
    return async (fileData, { dispatch }) => {
      try {
        const res = await axios.post(`${this.baseUrl}${url}`, fileData, {
          withCredentials: true,
          timeout,
          onUploadProgress: upload => {
            let uploadProgress = Math.round(
              (100 * upload.loaded) / upload.total
            );
            dispatch(
              setNotificationStatus({
                isSuccess: true,
                content: `${uploadProgress}% completed ..`,
                isShown: true,
                noTimeout: true,
              })
            );
          },
        });
        return { data: res.data };
      } catch (err) {
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };
  }
}

export const uploadFileQuery = new UploadFileQuery();
