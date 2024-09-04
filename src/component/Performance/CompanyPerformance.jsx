import * as React from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'month 1',
  'month 2',
  'month 3',
  'month 4',
  'month 5',
  'month 6',
  'month 7',
];

export default function SimpleAreaChart() {
  return (
    <div className='h-3/4 w-full flex flex-col justify-center items-center'>
        <h1 className='mb-10 font-bold font-serif'>Performance of Stock in Rupee per Month</h1>
        <div style={{ width: '80%' }}> {/* Adjust this width as needed */}
          <LineChart
            width={800}  // Increased width
            height={300}
            series={[{ data: uData, label: 'Performance', area: true, showMark: false }]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            sx={{
              [`& .${lineElementClasses.root}`]: {
                display: 'none',
              },
            }}
          />
        </div>
    </div>
  );
}
