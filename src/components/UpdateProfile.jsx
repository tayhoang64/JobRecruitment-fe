import { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  Stack,
  Container,
  Avatar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FiUpload } from "react-icons/fi";
import dayjs from "dayjs";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  cursor: "pointer",
  margin: "0 auto",
  border: "2px solid #e0e0e0",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    phone: "",
    dob: null,
    gender: "",
    city: "",
    address: "",
    personalLink: "",
    aboutMe: "",
    avatar: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/User/profile`)
      .then((response) => {
        const user = response.data;
        console.log(response.data);
        setFormData({
          fullName: user.fullName || "",
          title: user.title || "",
          phone: user.phone || "",
          dob: dayjs(user.dateOfBirth) || null,
          gender: user.gender || "",
          city: user.city || "",
          address: user.address || "",
          personalLink: user.personalLink || "",
          aboutMe: user.aboutMe || "",
          avatar: user.avatar || "",
          certificates: user.certificates || "",
        });
      })
      .catch((error) => console.error("Failed to fetch user data:", error));
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);

    const formData = new FormData();
    formData.append("avatarFile", file);

    axios
      .put(`${BASE_URL}/api/User/uploadAvatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setFormData((prev) => ({ ...prev, avatar: response.data.avatarUrl }));
      })
      .catch((error) => console.error("Failed to upload avatar:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, dob: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.phone) newErrors.phone = "Phone is required.";
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.address) newErrors.address = "Address is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    axios
      .put(`${BASE_URL}/api/User/update`, formData)
      .then(() => {
        alert("Profile updated successfully!");
        setIsLoading(false);
        navigate("/profile");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors({
            general:
              error.response.data.message ||
              "An error occurred while updating the profile.",
          });
        }
        setIsLoading(false);
      });
  };

  return (
    <Container style={{ padding: "70px" }} maxWidth="md" sx={{ py: 4 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Box textAlign="center">
            <label htmlFor="avatar-upload">
              <StyledAvatar src={formData.avatar}>
                {!formData.avatar && <FiUpload size={40} />}
              </StyledAvatar>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </Box>

          {errors.general && <Alert severity="error">{errors.general}</Alert>}

          <Stack spacing={3}>
            <TextField
              name="fullName"
              label="Full Name"
              variant="outlined"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.fullName}
              helperText={errors.fullName}
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
                error={!!errors.phone}
                helperText={errors.phone}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dob}
                  onChange={handleDateChange}
                />
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
                  <MenuItem value="0">Male</MenuItem>
                  <MenuItem value="1">Female</MenuItem>
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
                error={!!errors.city}
                helperText={errors.city}
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
              error={!!errors.address}
              helperText={errors.address}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </Box>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
