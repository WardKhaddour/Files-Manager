import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Chart = ({ total, value }) => {
  const percentage = (100 - (value * 100) / total).toFixed(2);
  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      counterClockwise
      styles={buildStyles({
        textSize: '2rem',
        pathColor: `var(--color-chart-filled)`,
        textColor: 'var(--color-blue-2)',
        trailColor: '#d6d6d6',
      })}
    />
  );
};

export default Chart;
