    import React, { useState, useEffect, useRef } from "react";
    import {
      Box,
      TextField,
      MenuItem,
      Checkbox,
      FormControlLabel,
      Typography,
      Button,
      Grid,
      FormControl,
      InputLabel,
      Select,
      FormGroup,
      Paper,
      Chip,
      IconButton
    } from "@mui/material";
    import { styled } from "@mui/system";
    import ReactQuill from "react-quill";
    import "react-quill/dist/quill.snow.css";
    import { FiUpload, FiX } from "react-icons/fi";
    import { BASE_URL } from '../constants';
    import axios from 'axios';
    import { useParams } from "react-router-dom";

    const StyledQuill = ReactQuill;

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

    const PreviewImage = styled("img")({
      width: "100px",
      height: "100px",
      objectFit: "cover",
      margin: "8px"
    });

    const CompanyUpdate = () => {
      const {id} = useParams();
      const [formData, setFormData] = useState({
        companyType: "",
        companySize: "",
        sizeRange: { min: "", max: "" },
        description: "",
        companyCountry: "",
        workingDays: [],
        overtimePolicy: 0,
        companyName: "",
        address: "",
        emailCompany: "",
        emailOwner: "",
        hotline: "",
        website: "",
        logo: null,
        companyImages: []
      });

      useEffect(() => {
        axios.get(`${BASE_URL}/api/company/${id}`).then((response) => {
            
            setFormData ({
                companyType: response.data.companyType,
                companySize: response.data.companySize,
                sizeRange: { min: "", max: "" },
                description: response.data.description,
                companyCountry: response.data.companyCountry,
                workingDays: response.data.workingDay != null ? response.data.workingDay.split(" to ") : [],
                overtimePolicy: response.data.overtimePolicy,
                companyName: response.data.companyName,
                address: response.data.address,
                emailCompany: response.data.emailCompany,
                emailOwner: response.data.emailOwner,
                hotline: response.data.hotline,
                website: response.data.website,
                logo: response.data.logo,
                companyImages: Array.from(response.data.companyImages.$values).map(c => c.file)
            })
            setLogoPreview(response.data.logo);
            setImagesPreviews(Array.from(response.data.companyImages.$values).map(c => c.file));
        })
      },[])
      const hasFetchedUser = useRef(false);

      const [countries, setCountries] = useState([]);
      const [errors, setErrors] = useState({});
      const [logoPreview, setLogoPreview] = useState("");
      const [imagesPreviews, setImagesPreviews] = useState([]);

      


      const companyTypes = [
        "Product Companies",
        "Service Companies",
        "Outsourcing Companies",
        "Outstaffing Companies",
        "Startups",
        "Research Laboratories",
        "E-commerce Companies",
        "SaaS Companies",
        "Gaming Companies",
        "Telecommunications Companies",
        "Marketplace and Platform Companies",
        "IT Departments in Non-IT Companies"
      ];

      const weekDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ];

      



      useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
          .then((response) => response.json())
          .then((data) => {
            const sortedCountries = data
              .map((country) => country.name.common)
              .sort();
            setCountries(sortedCountries);
          })
          .catch((error) => console.error("Error fetching countries:", error));

        const token = localStorage.getItem('token');
        if (token && !hasFetchedUser.current) {
          hasFetchedUser.current = true;
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          axios.get(`${BASE_URL}/api/User/profile`)
            .then(response => {
              setFormData((prev) => ({ ...prev, emailOwner: response.data.email }))
            })
            .catch(error => {
              console.error('Error fetching user profile:', error);
            });
        }


      }, []);

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
      };

      const handleDayChange = (day) => {
        const updatedDays = formData.workingDays.includes(day)
          ? formData.workingDays.filter((d) => d !== day)
          : [...formData.workingDays, day].sort(
              (a, b) => weekDays.indexOf(a) - weekDays.indexOf(b)
            );
      
            // console.log(updatedDays)
        setFormData((prev) => ({ ...prev, workingDays: updatedDays }));
      };

      const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          if (file.size > 5000000) {
            setErrors((prev) => ({ ...prev, logo: "File size should be less than 5MB" }));
            return;
          }
          setFormData((prev) => ({ ...prev, logo: file }));
          setLogoPreview(URL.createObjectURL(file));
          setErrors((prev) => ({ ...prev, logo: null }));
        }
      };

      const handleImagesChange = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter((file) => file.size <= 5000000);

        if (validFiles.length !== files.length) {
          setErrors((prev) => ({
            ...prev,
            images: "Some files were too large and were not included"
          }));
        }

        setFormData((prev) => ({
          ...prev,
          companyImages: [...prev.companyImages, ...validFiles]
        }));

        const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
        setImagesPreviews((prev) => [...prev, ...newPreviews]);
      };

      const removeImage = (index) => {
        setFormData((prev) => ({
          ...prev,
          companyImages: prev.companyImages.filter((_, i) => i !== index)
        }));
        setImagesPreviews((prev) => prev.filter((_, i) => i !== index));
      };

      const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
          case "emailCompany":
          case "emailOwner":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              newErrors[name] = "Invalid email format";
            } else {
              delete newErrors[name];
            }
            break;
          case "website":
            const urlRegex = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
            if (!urlRegex.test(value)) {
              newErrors[name] = "Invalid website URL";
            } else {
              delete newErrors[name];
            }
            break;
          default:
            break;
        }

        setErrors(newErrors);
      };

      const handleSubmit = (event) => {
        event.preventDefault();

        const formDataToSend = new FormData();

         formDataToSend.append('companyType', formData.companyType)
        formDataToSend.append('companySize', formData.companySize)
        formDataToSend.append('sizeRange', formData.sizeRange)
        formDataToSend.append('description', formData.description)
        formDataToSend.append('companyCountry', formData.companyCountry)
        formDataToSend.append('workingDay', `${formData.workingDays[0]} to ${formData.workingDays[1]}`);
        formDataToSend.append('overtimePolicy', formData.overtimePolicy)
        formDataToSend.append('companyName', formData.companyName)
        formDataToSend.append('address', formData.address)
        formDataToSend.append('emailCompany', formData.emailCompany)
        formDataToSend.append('emailOwner', formData.emailOwner)
        formDataToSend.append('hotline', formData.hotline)   
        formDataToSend.append('logo', formData.logo)
        formDataToSend.append('website', formData.website)
        formDataToSend.append('companyImages', formData.companyImages)


        axios.put(`${BASE_URL}/api/Company/${id}`, formDataToSend)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            if (error.response) {
              setErrors(error.response.data);
            } else {
              console.error('Error:', error);
            }
          });

      };

      return (
        <Paper elevation={3} style={{
          padding: "24px",
          margin: "75px auto",
          maxWidth: "900px",
        }}>
          <Typography variant="h4" gutterBottom>
            Company Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Company Type</InputLabel>
                  <Select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleInputChange}
                    label="Company Type"
                  >
                    {companyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Company Size</InputLabel>
                  <Select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    label="Company Size"
                  >
                    <MenuItem value="150+">150+</MenuItem>
                    <MenuItem value="range">Custom Range</MenuItem>
                  </Select>
                </FormControl>
                {formData.companySize === "range" && (
                  <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <TextField
                      label="Min"
                      type="number"
                      value={formData.sizeRange.min}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          sizeRange: { ...prev.sizeRange, min: e.target.value }
                        }))
                      }
                    />
                    <TextField
                      label="Max"
                      type="number"
                      value={formData.sizeRange.max}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          sizeRange: { ...prev.sizeRange, max: e.target.value }
                        }))
                      }
                    />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Company Description
                </Typography>
                <StyledQuill style={{
                  marginBottom: "20px",
                  "& .ql-container": {
                    minHeight: "150px"
                  }
                }}
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, description: value }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Company Country</InputLabel>
                  <Select
                    name="companyCountry"
                    value={formData.companyCountry}
                    onChange={handleInputChange}
                    label="Company Country"
                  >
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Working Days
                </Typography>
                <FormGroup row>
                  {weekDays.map((day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={formData.workingDays.includes(day)}
                          onChange={() => handleDayChange(day)}
                          disabled={formData.workingDays.length >= 2 && !formData.workingDays.includes(day)}
                        />
                      }
                      label={day}
                    />
                  ))}
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.overtimePolicy == true}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          overtimePolicy: e.target.checked == true ? 1 : 0
                        }))
                      }
                    />
                  }
                  label="Overtime Policy"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Email"
                  name="emailCompany"
                  value={formData.emailCompany}
                  onChange={handleInputChange}
                  error={!!errors.emailCompany}
                  helperText={errors.emailCompany}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Owner Email"
                  name="emailOwner"
                  value={formData.emailOwner}
                  disabled={true}
                  error={!!errors.emailOwner}
                  helperText={errors.emailOwner}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hotline"
                  name="hotline"
                  value={formData.hotline}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  error={!!errors.website}
                  helperText={errors.website}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<FiUpload />}
                >
                  Upload Logo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleLogoChange}
                    accept="image/*"
                  />
                </Button>
                {errors.logo && (
                  <Typography color="error" variant="caption" display="block">
                    {errors.logo}
                  </Typography>
                )}
                {logoPreview && (
                  <Box sx={{ mt: 2 }}>
                    <PreviewImage src={logoPreview} alt="Logo preview" />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<FiUpload />}
                >
                  Upload Company Images
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleImagesChange}
                    accept="image/*"
                    multiple
                  />
                </Button>
                {errors.images && (
                  <Typography color="error" variant="caption" display="block">
                    {errors.images}
                  </Typography>
                )}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  {imagesPreviews.map((preview, index) => (
                    <Box key={index} sx={{ position: "relative" }}>
                      <PreviewImage src={preview} alt={`Preview ${index + 1}`} />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "rgba(255, 255, 255, 0.8)"
                        }}
                        onClick={() => removeImage(index)}
                      >
                        <FiX />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      );
    };

    export default CompanyUpdate;
