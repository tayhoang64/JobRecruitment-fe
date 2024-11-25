import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Box, Stack, Typography, Container, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FiUpload } from "react-icons/fi";
import dayjs from "dayjs";
import { Link } from 'react-router-dom'

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  cursor: "pointer",
  margin: "0 auto",
  border: "2px solid #e0e0e0",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    // borderColor: theme.palette.primary.main
  }
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    title: "Software Engineer",
    phone: "123-456-7890",
    dob: dayjs("2000-01-01"),
    gender: "Male",
    city: "New York",
    address: "123 Main St",
    personalLink: "https://example.com",
    aboutMe: "Lorem ipsum dolor sit amet",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, dob: newValue });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container style={{padding: "70px"}} maxWidth="md" sx={{ py: 4 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Box textAlign="center">
            {/* <Typography variant="h4" gutterBottom>
              Edit Profile
            </Typography> */}

            <Box position="relative" display="inline-block">
              <StyledAvatar src={formData.avatar} alt={formData.fullName}>
                <FiUpload size={40} />
              </StyledAvatar>
              {/* <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              /> */}
            </Box>
          </Box>

          <Stack spacing={3}>
            <TextField
              name="fullName"
              label="Full Name"
              variant="outlined"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="title"
              label="Title"
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                name="phone"
                label="Phone"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={handleDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                name="city"
                label="City"
                variant="outlined"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                required
              />
            </Stack>

            <TextField
              name="address"
              label="Address"
              variant="outlined"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="personalLink"
              label="Personal Link"
              variant="outlined"
              value={formData.personalLink}
              onChange={handleChange}
              fullWidth
              type="url"
            />

            <TextField
              name="aboutMe"
              label="About Me"
              variant="outlined"
              value={formData.aboutMe}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Update Profile
              </Button>
            </Box>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default UpdateProfile;