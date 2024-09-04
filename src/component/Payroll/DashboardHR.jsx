// src/components/Dashboard.jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import { Pie, Line } from 'react-chartjs-2'; // Import Line chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register the required elements
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const pieChartData = {
  labels: ['Engineering', 'Finance', 'HR', 'Marketing', 'Operations'],
  datasets: [
    {
      data: [40, 15, 10, 20, 15],
      backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350', '#ffa726', '#8d6e63'],
    },
  ],
};

const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Revenue',
      data: [120000, 150000, 180000, 170000, 190000, 200000],
      borderColor: '#42a5f5',
      fill: false,
      tension: 0.1,
    },
    {
      label: 'Profit',
      data: [80000, 90000, 100000, 95000, 110000, 120000],
      borderColor: '#66bb6a',
      fill: false,
      tension: 0.1,
    },
    {
      label: 'New Hires',
      data: [10, 15, 20, 18, 22, 25],
      borderColor: '#ef5350',
      fill: false,
      tension: 0.1,
    },
  ],
};

const DashboardHR = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        HR Dashboard
      </Typography>

      {/* Main container for the 2x2 grid and the pie chart */}
      <Box sx={{ display: 'flex' }}>
        {/* 2x2 Grid for Boxes */}
        <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          {/* Total Employees */}
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Employees</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4">150</Typography>
              <ArrowUpward sx={{ color: '#42a5f5', ml: 1 }} />
            </Box>
            <Typography variant="body2">Current number of employees</Typography>
          </Paper>

          {/* Total Departments */}
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Departments</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4">8</Typography>
              <ArrowUpward sx={{ color: '#42a5f5', ml: 1 }} />
            </Box>
            <Typography variant="body2">Total number of departments</Typography>
          </Paper>

          {/* Leave Requests */}
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Leave Requests</Typography>
            <Typography variant="h4">5</Typography>
            <Typography variant="body2">Pending leave requests</Typography>
          </Paper>

          {/* Upcoming Reviews */}
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Upcoming Reviews</Typography>
            <Typography variant="h4">10</Typography>
            <Typography variant="body2">Performance reviews due this month</Typography>
          </Paper>
        </Box>

        {/* Pie Chart on the Right */}
        <Box sx={{ width: '30%', ml: 2 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Department Distribution
            </Typography>
            <Pie data={pieChartData} />
          </Paper>
        </Box>
      </Box>

      {/* Line Chart below the grid and pie chart */}
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Revenue, Profit, and New Hires Comparison
          </Typography>
          <Line data={lineChartData} />
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardHR;
