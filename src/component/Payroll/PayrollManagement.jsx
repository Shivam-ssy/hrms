import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Edit, Delete, Search, Add, FileDownload } from '@mui/icons-material';
import EditPayrollRecord from './EditPayrollRecord';
import { createPayroll, deletePayrollById, getPayrollList } from '../../BackendAsService/Crud';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PayrollManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [payrollData, setPayrollData] = useState([
    { id: 1, startDate: '2024-08-01', endDate: '2024-08-15', salary: 5000, deductions: 500, netPay: 4500, status: 'processed' },
    // Add more records as needed
  ]);
  React.useEffect(()=>{
      const getData=async ()=>{
        const res =await getPayrollList()
        if (res.status===200) {
          setPayrollData(res.data)
        }
        console.log(res.data);
        
      }

      getData()
  },[])
  const handleOpenDialog = (edit, record = null) => {
    setIsEditing(edit);
    setCurrentRecord(record);
    setOpenDialog(true);
  };
  const deletePayrollData=async (data)=>{
      console.log(data);
      const res=await deletePayrollById({id:data.id})
      if(res.status=200){
        toast.success(res.message)
      }
      else{
        toast.error(res.message)
      }
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveRecord = async (record) => {
    // Firestore logic to save or update the record
    console.log('Saving record: ', record);
    const temp=localStorage.getItem("user")
    const user=JSON.parse(temp)
    const res =await createPayroll({formData:record,currentuser:user})
    console.log(res);
    
    setOpenDialog(false);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const exportPdf = async() =>{
    const doc = new jsPDF({orientation: 'landscape'});
    doc.autoTable({
      html: '#my-table'
    })
    doc.save('record.pdf');
  };

  const filteredData = payrollData.filter(record => {
    const matchesStatus = statusFilter === '' || record.status === statusFilter;
    const matchesSearch = searchQuery === '' || Object.values(record).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesStatus && matchesSearch;
  });

  return (
    <Box sx={{ padding: 2 }}>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      {/* Top Header with Payroll Records and Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" sx={{ whiteSpace: 'nowrap' }}>Payroll Records</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            sx={{ minWidth: 180 }}
            size="small"
            variant="outlined"
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <Search />,
            }}
          />
          <FormControl sx={{ minWidth: 120 }} size="small" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="processed">Processed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FileDownload />}
            onClick={exportPdf}
          >
            Generate Report
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenDialog(false)}
          >
            Add Record
          </Button>
        </Box>
      </Box>

      {/* Payroll Records Table */}
      <TableContainer component={Paper} >
        <Table id = "my-table">
          <TableHead>
            <TableRow>
              <TableCell>Payroll ID</TableCell>
              <TableCell>Pay Period Start</TableCell>
              <TableCell>Pay Period End</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Deductions</TableCell>
              <TableCell>Net Pay</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(record => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.payPeriodStart
}</TableCell>
                <TableCell>{record.payPeriodEnd
}</TableCell>
                <TableCell>${record.salary}</TableCell>
                <TableCell>${record.deductions}</TableCell>
                <TableCell>${record.netPay}</TableCell>
                <TableCell>{record.status.charAt(0).toUpperCase() + record.status.slice(1)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(true, record)}>
                    <Edit />
                  </IconButton>
                  <IconButton>
                    <div onClick={()=>deletePayrollData(record)}>

                    <Delete  />
                    </div>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit/Add Record Dialog */}
      <EditPayrollRecord
        open={openDialog}
        onClose={handleCloseDialog}
        record={currentRecord}
        onSave={handleSaveRecord}
      />
    </Box>
  );
};

export default PayrollManagement;
