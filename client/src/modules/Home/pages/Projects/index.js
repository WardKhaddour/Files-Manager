import { Link } from 'react-router-dom';
import { ReactComponent as ArrowBack } from 'assets/icons/arrow_back.svg';
import classes from './index.module.css';
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useLazySearchUserQuery,
  useUploadProjectMutation,
} from './services/projectsSlice';
import LoadingSpinner from 'components/LoadingSpinner';
import FloatingButton from '../../components/FloatingButton';
import UploadFile from '../../components/UploadFile';
import { useState } from 'react';

import Select from './components/Select';
import { useAuthStatQuery } from 'services/accessApi/accessSlice';
import File from 'modules/Home/components/File';

const UploadProjectSection = ({ toggleShown, shown, parent }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [uploadProject] = useUploadProjectMutation();
  const [searchUser, { isLoading: usersIsLoading, data: users }] =
    useLazySearchUserQuery();
  const { data } = useAuthStatQuery();
  const userId = data.user.id;
  const handleUploadProject = project => {
    const formData = new FormData();
    formData.append('project', project);
    formData.append('name', project.name);
    formData.append('author[]', userId);
    selectedUsers.forEach(user => {
      formData.append('author[]', user.value);
    });
    parent.course && formData.append('course', parent.course);
    parent.folder && formData.append('folder', parent.folder);
    uploadProject(formData);
  };

  return (
    <>
      <FloatingButton onClick={toggleShown} />
      <UploadFile
        maxSize={30}
        shown={shown}
        onUploadFile={handleUploadProject}
        types={['zip', 'rar']}
        childrenTop
      >
        <form className={classes.formUsers} onSubmit={e => e.preventDefault()}>
          <div className={classes.usersSelect}>
            <label className={classes.usersSelectLabel}>
              Select your partners
            </label>
            <Select
              data={users?.filter(user => user.id !== userId)}
              onInputChange={searchUser}
              isLoading={usersIsLoading}
              onChange={data => {
                setSelectedUsers(data);
              }}
            />
          </div>
        </form>
      </UploadFile>
    </>
  );
};

const ProjectsSection = ({ projects }) => {
  const [deleteProject] = useDeleteProjectMutation();

  const handleDeleteProject = projectId => () => {
    deleteProject(projectId);
  };

  return (
    <div className={classes.content}>
      {(!projects || !projects.length > 0) && (
        <p className={classes.noContent}> No Content Available </p>
      )}
      {projects &&
        projects.length > 0 &&
        projects?.map(project => (
          <File
            key={project.id}
            {...project}
            fileLink={project.projectLink}
            onRemove={handleDeleteProject(project.id)}
          />
        ))}
    </div>
  );
};

const Projects = ({ courseId, folderId, title }) => {
  const query = {};
  if (courseId) query.course = courseId;
  else query.folder = folderId;
  const [addProjectShown, setAddProjectShown] = useState(false);

  const { data: projects, isLoading } = useGetProjectsQuery(query);

  const toggleShowAddProject = e => {
    setAddProjectShown(e.target.checked);
  };

  return (
    <section className={classes.projects}>
      <div className={classes.heading}>
        <Link to={-1} className={classes.backLink}>
          <ArrowBack />
        </Link>
        <h2 className="title">{title}</h2>
      </div>
      {isLoading && <LoadingSpinner fullScreen />}
      {!addProjectShown && (
        <ProjectsSection title={title} projects={projects} />
      )}
      <UploadProjectSection
        shown={addProjectShown}
        toggleShown={toggleShowAddProject}
        parent={query}
      />
    </section>
  );
};

export default Projects;
