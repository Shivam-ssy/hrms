import { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper, Container, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'; // Assuming you have react-router for routing

const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Designer',
  'Product Manager',
];

// Mock function to fetch user data
const fetchUserData = async (userId) => {
  // Replace with your API call
  return {
    id: userId,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Frontend Developer',
    number: '+1-555-1234',
    date: '2023-06-15',
  };
};

// Mock function to update user data
const updateUserData = async (userData) => {
  // Replace with your API call
  console.log('Updating user data:', userData);
  return userData;
};

export default function EditUserPage() {
  const { userId } = useParams(); // Assumes the user ID is passed in the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData(userId);
      setFormData(data);
    };

    loadUserData();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await updateUserData(formData);
    navigate('/profile'); // Redirect after saving, adjust path as needed
  };

  if (!formData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Edit Your Information
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Phone Number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Joining Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
}
