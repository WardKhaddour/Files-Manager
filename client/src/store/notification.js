import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    isShown: false,
    isSuccess: false,
    content: '',
    noTimeout: false,
  },
  reducers: {
    setNotificationStatus(state, action) {
      state.isShown = action.payload.isShown;
      state.isSuccess = action.payload.isSuccess;
      state.content = action.payload.content;
      state.noTimeout = action.payload.noTimeout;
    },
  },
});

export const { setNotificationStatus } = notificationSlice.actions;
export default notificationSlice.reducer;
