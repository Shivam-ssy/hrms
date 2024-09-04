import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const PayrollDashboard = () => {
  // Sample data for the bar chart
  const data = [
    { name: 'Jan', IT: 4000, Analysts: 2400, Admin: 2400, Marketing: 2400 },
    { name: 'Feb', IT: 3000, Analysts: 1398, Admin: 2210, Marketing: 2290 },
    { name: 'Mar', IT: 2000, Analysts: 9800, Admin: 2290, Marketing: 2000 },
    { name: 'Apr', IT: 2780, Analysts: 3908, Admin: 2000, Marketing: 2181 },
  ];

  const metrics = [
    { label: 'Total Payroll Cost', current: '$500,000', previous: '$480,000', change: '+4.17%', target: '$490,000' },
    { label: 'Payroll Accuracy Rate', current: '98.5%', previous: '98%', change: '-0.5%', target: '99%' },
    // Add more metrics as needed
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Payroll Dashboard
      </Typography>
      
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} mb={4}>
        {/* Info Boxes */}
        {[
          { title: 'Total Payroll', value: '$150,000', description: "This month's total payroll" },
          { title: 'Employees Paid', value: '145', description: 'Number of employees paid this month' },
          { title: 'Pending Payments', value: '5', description: 'Payments yet to be processed' },
          { title: 'Next Pay Date', value: '2023-07-31', description: 'Date of next payroll run' },
          { title: 'YTD Payroll', value: '$900,000', description: 'Year-to-date total payroll' },
          { title: 'Tax Deductions', value: '$45,000', description: 'Total tax deductions this month' },
        ].map((box, index) => (
          <Paper 
            key={index} 
            elevation={3} 
            sx={{
              p: 2,
            }}
          >
            <Typography variant="h6" color="primary" gutterBottom>
              {box.title}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {box.value}
            </Typography>
            <Typography variant="body2">
              {box.description}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: 'flex', mt: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Bar Chart */}
        <Paper elevation={3} sx={{ p: 2, flex: '2', height: 300, mr: { md: 3 }, mb: { xs: 3, md: 0 } }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="IT" fill="#8884d8" />
              <Bar dataKey="Analysts" fill="#82ca9d" />
              <Bar dataKey="Admin" fill="#ffc658" />
              <Bar dataKey="Marketing" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Metrics Table */}
        <Paper elevation={3} sx={{ p: 2, flex: '1' }}>
          <Typography variant="h6" color="primary" gutterBottom>Metrics</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell align="right">Current Period</TableCell>
                  <TableCell align="right">Previous Period</TableCell>
                  <TableCell align="right">Change (%)</TableCell>
                  <TableCell align="right">Target</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {metrics.map((metric, index) => (
                  <TableRow key={index}>
                    <TableCell>{metric.label}</TableCell>
                    <TableCell align="right">{metric.current}</TableCell>
                    <TableCell align="right">{metric.previous}</TableCell>
                    <TableCell align="right">{metric.change}</TableCell>
                    <TableCell align="right">{metric.target}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default PayrollDashboard;
