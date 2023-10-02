import React from 'react';
import NotFound from 'modules/Error/NotFound';
import Courses from '../pages/Courses';
import CourseDetails from '../pages/CourseDetails';
import FolderDetails from '../pages/FolderDetails';
import Saved from '../pages/Saved';
import MyFiles from '../pages/MyFiles';
import Settings from '../pages/Settings';

const routes = [
  {
    path: 'courses',
    index: true,
    element: <Courses />,
  },
  {
    path: 'courses/:courseId',
    element: <CourseDetails />,
  },
  {
    path: 'folder/:folderId',
    element: <FolderDetails />,
  },
  {
    path: 'saved',
    element: <Saved />,
  },
  {
    path: 'my-files',
    element: <MyFiles />,
  },
  {
    path: 'settings',
    element: <Settings />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
