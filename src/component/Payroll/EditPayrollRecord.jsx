import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';

const EditPayrollRecord = ({ open, onClose, record, onSave }) => {
  // State to handle form values
  const [formValues, setFormValues] = useState({
    payPeriodStart: record?.payPeriodStart || '',
    payPeriodEnd: record?.payPeriodEnd || '',
    salary: record?.salary || '',
    deductions: record?.deductions || '',
    status: record?.status || 'Processed'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    // Logic to save the record
    onSave(formValues);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Payroll Record</DialogTitle>
      <DialogContent>
        {/* Pay Period Start Date */}
        <TextField
          name="payPeriodStart"
          label="Pay Period Start"
          type="date"
          fullWidth
          margin="normal"
          value={formValues.payPeriodStart}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Pay Period End Date */}
        <TextField
          name="payPeriodEnd"
          label="Pay Period End"
          type="date"
          fullWidth
          margin="normal"
          value={formValues.payPeriodEnd}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Salary Input */}
        <TextField
          name="salary"
          label="Salary"
          type="number"
          fullWidth
          margin="normal"
          value={formValues.salary}
          onChange={handleInputChange}
        />

        {/* Deductions Input */}
        <TextField
          name="deductions"
          label="Deductions"
          type="number"
          fullWidth
          margin="normal"
          value={formValues.deductions}
          onChange={handleInputChange}
        />

        {/* Net Pay Input */}
        <TextField
          name="netPay"
          label="Net Pay"
          type="number"
          fullWidth
          margin="normal"
          value={(parseFloat(formValues.salary) || 0) - (parseFloat(formValues.deductions) || 0)}
          disabled
        />

        {/* Status Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formValues.status}
            onChange={handleInputChange}
          >
            <MenuItem value="Processed">Processed</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPayrollRecord;
