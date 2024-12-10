import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaCertificate } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../constants";

const StyledForm = styled("form")(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#ffffff",
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const FormHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const CertificateEditForm = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const [formData, setFormData] = useState({
    certificateName: "",
    organization: "",
    issueMonth: "",
    issueYear: "",
    certificateUrl: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false); // Thêm state disabled

  const navigate = useNavigate();

  // Lấy dữ liệu chứng chỉ khi sửa
  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/Certificates/${id}`)
        .then((response) => {
          setFormData(response.data); // Cập nhật dữ liệu vào form
        })
        .catch((error) => {
          console.log("Error fetching certificate data:", error);
        });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "issueYear" || name === "issueMonth" ? Number(value) : value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.certificateName.trim()) {
      newErrors.certificateName = "Certificate name is required.";
    }
    if (!formData.organization.trim()) {
      newErrors.organization = "Organization is required.";
    }
    if (!formData.issueMonth) {
      newErrors.issueMonth = "Issue month is required.";
    }
    if (!formData.issueYear) {
      newErrors.issueYear = "Issue year is required.";
    } else if (isNaN(formData.issueYear)) {
      newErrors.issueYear = "Issue year must be a number.";
    }
    if (!formData.certificateUrl.trim()) {
      newErrors.certificateUrl = "Certificate URL is required.";
    } else if (!/^https?:\/\/[^\s]+$/.test(formData.certificateUrl)) {
      newErrors.certificateUrl = "Invalid URL format.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.issueMonth) {
      formData.issueMonth = null;
    }

    // Sử dụng PUT để cập nhật chứng chỉ
    axios
      .put(`${BASE_URL}/api/Certificates/${id}`, formData)
      .then((response) => {
        alert("Certificate updated successfully!", response);
        setFormData({
          certificateName: "",
          organization: "",
          issueMonth: null,
          issueYear: "",
          certificateUrl: "",
          description: "",
        });
        setDisabled(true);
        navigate("/certificates");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log("Error response from API:", error.response.data);
          const apiErrors = error.response.data.errors;
          const formattedErrors = {};

          if (apiErrors.certificate) {
            formattedErrors.certificate = apiErrors.certificate[0];
          }
          if (apiErrors["$.issueMonth"]) {
            formattedErrors.issueMonth = apiErrors["$.issueMonth"][0];
          }
          if (apiErrors["$.issueYear"]) {
            formattedErrors.issueYear = apiErrors["$.issueYear"][0];
          }

          setErrors(formattedErrors);
        }
        setDisabled(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <StyledForm onSubmit={handleSubmit}>
        <FormHeader>
          <FaCertificate size={32} color="#1976d2" />
          <Typography variant="h4" component="h1" color="primary">
            Edit Certificate Information
          </Typography>
        </FormHeader>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Certificate Name"
              name="certificateName"
              value={formData.certificateName}
              onChange={handleChange}
              error={Boolean(errors.certificateName)}
              helperText={errors.certificateName}
              required
              disabled={disabled} // Tắt trường sau khi disabled = true
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              error={Boolean(errors.organization)}
              helperText={errors.organization}
              required
              disabled={disabled} // Tắt trường sau khi disabled = true
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Issue Month"
              name="issueMonth"
              value={formData.issueMonth}
              onChange={handleChange}
              error={Boolean(errors.issueMonth)}
              helperText={errors.issueMonth}
              required
              disabled={disabled}
            >
              {months.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Issue Year"
              name="issueYear"
              value={formData.issueYear}
              onChange={handleChange}
              error={Boolean(errors.issueYear)}
              helperText={errors.issueYear}
              required
              disabled={disabled} // Tắt trường sau khi disabled = true
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Certificate URL"
              name="certificateUrl"
              value={formData.certificateUrl}
              onChange={handleChange}
              placeholder="https://example.com/certificate"
              disabled={disabled} // Tắt trường sau khi disabled = true
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter certificate description or additional details"
              disabled={disabled} // Tắt trường sau khi disabled = true
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              fullWidth
              disabled={disabled} // Tắt nút submit sau khi disabled = true
            >
              {isLoading ? "Updating..." : "Update Certificate"}
            </Button>
          </Grid>
        </Grid>
      </StyledForm>
    </Container>
  );
};

export default CertificateEditForm;
