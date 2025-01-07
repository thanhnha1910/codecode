import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [tours, setTours] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSection, setCurrentSection] = useState('tours');
  const [formData, setFormData] = useState({});

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [toursRes, hotelsRes, restaurantsRes, attractionsRes] = await Promise.all([
        axios.get('api/Management/tours'),
        axios.get('api/Management/hotels'),
        axios.get('api/Management/restaurants'),
        axios.get('api/Management/attractions')
      ]);

      setTours(toursRes.data);
      setHotels(hotelsRes.data);
      setRestaurants(restaurantsRes.data);
      setAttractions(attractionsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle add new item
  const handleAdd = (section) => {
    setCurrentSection(section);
    setFormData({});
    setOpenDialog(true);
  };

  // Handle edit item
  const handleEdit = (section, item) => {
    setCurrentSection(section);
    setFormData(item);
    setOpenDialog(true);
  };

  // Handle delete item
  const handleDelete = async (section, id) => {
    try {
      await axios.delete(`api/Management/${section}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      if (formData.id) {
        await axios.put(`api/Management/${currentSection}/${formData.id}`, formData);
      } else {
        await axios.post(`api/Management/${currentSection}`, formData);
      }
      setOpenDialog(false);
      fetchData();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Tours Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Tours</Typography>
              <Button variant="contained" onClick={() => handleAdd('tours')}>
                Add Tour
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Available Slots</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tours.map((tour) => (
                    <TableRow key={tour.id}>
                      <TableCell>{tour.tourName}</TableCell>
                      <TableCell>{tour.price}</TableCell>
                      <TableCell>{tour.availableSlots}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit('tours', tour)}>Edit</Button>
                        <Button onClick={() => handleDelete('tours', tour.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Hotels Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Hotels</Typography>
              <Button variant="contained" onClick={() => handleAdd('hotels')}>
                Add Hotel
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hotels.map((hotel) => (
                    <TableRow key={hotel.id}>
                      <TableCell>{hotel.hotelName}</TableCell>
                      <TableCell>{hotel.address}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit('hotels', hotel)}>Edit</Button>
                        <Button onClick={() => handleDelete('hotels', hotel.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Form Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{formData.id ? 'Edit' : 'Add'} {currentSection}</DialogTitle>
          <DialogContent>
            {/* Dynamic form fields based on currentSection */}
            {currentSection === 'tours' && (
              <>
                <TextField
                  fullWidth
                  label="Tour Name"
                  value={formData.tourName || ''}
                  onChange={(e) => setFormData({ ...formData, tourName: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Available Slots"
                  type="number"
                  value={formData.availableSlots || ''}
                  onChange={(e) => setFormData({ ...formData, availableSlots: e.target.value })}
                  margin="normal"
                />
              </>
            )}
            {/* Add similar form fields for other sections */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Container>
  );
};

export default Dashboard;
