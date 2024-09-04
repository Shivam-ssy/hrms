import React from "react";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getPayrollList } from "../../BackendAsService/Crud";

const PayrollReports = () => {
  const [payrollData,setPayrollData]=React.useState(  [
    { employee: "John Doe", 
payPeriodStart
: "June 2023", grossPay: 5000, deductions: 1000, netPay: 4000 },
    { employee: "Jane Smith", payPeriod: "June 2023", grossPay: 6000, deductions: 1200, netPay: 4800 },
  ]);
  React.useEffect( ()=>{
    const data= async()=>{

      const res= await getPayrollList()
      setPayrollData(res.data)
      console.log(payrollData);
      
    }
    data()
  },[])
  const exportPdf = async() =>{
    const doc = new jsPDF({orientation: 'landscape'});
    doc.autoTable({
      html: '#my-tableNew'
    })
    doc.save('report.pdf');
  };


  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Payroll Reports
      </Typography>
      <Button 
        onClick={exportPdf}
        variant="contained"
        color="primary"
        sx={{
          marginBottom: "20px",
          width: "130px",
          padding: "8px 5px", 
          fontSize: "10px",
          alignSelf: "flex-start",
        }}
      >
        GENERATE REPORT
      </Button>

 
      <TableContainer
        component={Paper}
        sx={{
          flex: 1,
          overflow: "auto",
          width: "104   %", 
        }}
      >
        <Table id= "my-tableNew">
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Pay Period</TableCell>
              <TableCell>Gross Pay</TableCell>
              <TableCell>Deductions</TableCell>
              <TableCell>Net Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.employee}</TableCell>
                <TableCell>{row.payPeriod}</TableCell>
                <TableCell>${row.grossPay}</TableCell>
                <TableCell>${row.deductions}</TableCell>
                <TableCell>${row.netPay}</TableCell>
                <TableCell>
                  
                </TableCell>
                {/* <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ marginRight: "10px" }}
                    startIcon={<EditIcon />}
                  >
                    EDIT
                  </Button> */}
                  <Button variant="contained" color="secondary" size="small" startIcon={<DeleteIcon />}>
                    DELETE
                  </Button>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PayrollReports;
