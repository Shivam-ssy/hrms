import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'month 1',
  'month 2',
  'month 3',
  'month 4',
  'month 5',
  'month 6',
  'month 7',
];

export default function SimpleLineChart() {
  return (
    <div className='w-full h-3/4 flex flex-col justify-center items-center'>
        <h3 className='font-bold mb-10'>Your Perfromance related to Company</h3>
        <LineChart
          width={600}
          height={300}
          series={[
            { data: pData, label: 'Company' },
            { data: uData, label: 'Your' },
          ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
    </div>
  );
}
