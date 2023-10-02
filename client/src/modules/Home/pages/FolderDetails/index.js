import { useParams } from 'react-router-dom';

import { useGetFolderDetailsQuery } from './services/folderDetailsApi';
import LoadingSpinner from 'components/LoadingSpinner';
import Details from 'modules/Home/components/Details';
import Projects from 'modules/Home/pages/Projects';

const FolderDetails = () => {
  const { folderId } = useParams();
  const { data: folderData, isLoading } = useGetFolderDetailsQuery(folderId);

  if (folderData?.type === 'projects-folder') {
    return <Projects folderId={folderData.id} title={folderData.name} />;
  }
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isLoading && <LoadingSpinner />}
      {folderData?.type === 'files-folder' && <Details data={folderData} />}
    </>
  );
};

export default FolderDetails;
