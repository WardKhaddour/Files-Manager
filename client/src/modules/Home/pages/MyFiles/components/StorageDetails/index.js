import byteToString from 'utils/byteSize/byteToReadable';
import classes from './index.module.css';
import Chart from '../Chart';
import { useGetMyCloudStatsQuery } from '../../services/myFilesSlice';
import LoadingSpinner from 'components/LoadingSpinner';

const StorageDetails = () => {
  const { data: stats, isLoading } = useGetMyCloudStatsQuery();
  const { availableSpace, totalSpace } = stats || {};
  const formattedUsedSpace = byteToString(totalSpace - availableSpace);
  const formattedTotalSpace = byteToString(totalSpace);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <article className={classes.details}>
        <h2 className="title">Storage details</h2>
        <div className={classes.data}>
          <div className={classes.chart}>
            <Chart total={totalSpace} value={availableSpace} />
          </div>
          <div className={classes.stats}>
            <div className={classes.stat}>
              <span className={classes.statTitle}>Total Space</span>
              <span className={classes.statValue}>{formattedTotalSpace}</span>
            </div>
            <div className={classes.stat}>
              <span className={classes.statTitle}>Used Space</span>
              <span className={classes.statValue}>{formattedUsedSpace}</span>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default StorageDetails;
