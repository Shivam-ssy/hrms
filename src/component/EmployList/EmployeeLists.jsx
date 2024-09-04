import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data } from './data';
import { deleteEmployeeById, getEmployeeList, updateEmployeeById } from '../../BackendAsService/Crud.js';
const columns = [
  { id: 'checkbox', label: '', minWidth: 50 }, // Checkbox column
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'role', label: 'Role', minWidth: 170 },
  { id: 'number', label: 'Phone Number', minWidth: 170 },
  { id: 'date', label: 'Joining Date', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 }, // Actions column
];

const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Designer',
  'Product Manager',
]; // Predefined roles

const initialRows = data

export default function StickyHeadTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editingRow, setEditingRow] = React.useState(null);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  React.useEffect(()=>{

      const getdata=async()=>{
        const data=await getEmployeeList()
        console.log(data.data);
        let unsorted=data.data
        const sortedByName = unsorted.sort((a, b) => a.name.localeCompare(b.name));
        console.log(sortedByName);

        setRows(sortedByName)
      }
      getdata()
  },[])

  const [editData, setEditData] = React.useState({
    name: '',
    email: '',
    role: '',
    number: '',
    date: '',
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > -1) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteSelected =async () => {
    const newRows = rows.filter((row) => !selected.includes(row.id));
    selected.map(async (id)=>{
      const res= await deleteEmployeeById(id)
      if (res.status===200) {
        toast.success(res.message)
      }
      else{
        toast.error(res.message)
      }
    }

    )
    setRows(newRows);
    setSelected([]);
  };

  const handleEditClick = (row) => {
    setEditingRow(row);
    setEditData(row);
    setOpenEditDialog(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (event) => {
    setEditData((prev) => ({
      ...prev,
      role: event.target.value,
    }));
  };

  const handleEditSave =async () => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === editingRow.id ? { ...row, ...editData } : row,
      ),
    );
    let id=editingRow.id;
    console.log(id,editData);
    const data=editData
    console.log(data);
    
    const res=await updateEmployeeById({id:id,form:editData})
    if(res.status===200){
      toast.success(res.message)
    }
    if(res.status===500){
      toast.error(res.message)
    }
    console.log(res);
    
    setOpenEditDialog(false);
  };

  const handleEditCancel = () => {
    setOpenEditDialog(false);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
      {selected.length > 0 && (
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
            {selected.length} selected
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
          >
            Delete
          </Button>
        </Toolbar>
      )}
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {columns.slice(1).map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${row.id}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        onClick={(event) => handleClick(event, row.id)}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.number}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        sx={{ marginRight: 1 }}
                        onClick={() => handleEditClick(row)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditCancel}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            value={editData.name}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={editData.email}
            onChange={handleEditChange}
            fullWidth
          />
          <FormControl margin="dense" fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={editData.role}
              onChange={handleRoleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Phone Number"
            name="number"
            value={editData.number}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Joining Date"
            name="date"
            value={editData.date}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
