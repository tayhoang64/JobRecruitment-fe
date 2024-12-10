import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
  Box,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiExternalLink } from "react-icons/fi";
import { BiCertification } from "react-icons/bi";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  "& .MuiTableCell-head": {
    fontWeight: "bold",
  },
}));

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi API để lấy dữ liệu chứng chỉ
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/certificates`);
        setCertificates(response.data); // Lưu dữ liệu vào state
        setLoading(false);
      } catch {
        setError("Error loading certificates");
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleDelete = (certificateId) => {
    axios
      .delete(`${BASE_URL}/api/certificates/${certificateId}`)
      .then(() => {
        // Cập nhật lại danh sách chứng chỉ sau khi xóa
        setCertificates(
          certificates.filter((cert) => cert.certificateId !== certificateId)
        );
      })
      .catch((error) => {
        console.error("Error deleting certificate:", error);
        setError("Error deleting certificate");
      });
  };
  const handleAdd = (newCertificate) => {
    axios;
    navigate(`/certificates/add`, newCertificate)
      //.post(`${BASE_URL}/api/Certificates/add`, newCertificate)
      .then((response) => {
        // Cập nhật danh sách chứng chỉ sau khi thêm thành công
        setCertificates([...certificates, response.data]);

        // Điều hướng tới trang /certificates/add
      })
      .catch((error) => {
        console.error("Error adding certificate:", error);
        setError("Error adding certificate");
      });
  };

  const handleUpdate = (certificateId) => {
    // Đoạn mã xử lý cập nhật chứng chỉ
    //  console.log(`Update certificate with ID: ${certificateId}`);
    navigate(`/Certificates/update/${certificateId}`);
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <BiCertification size={32} color="primary" />
        <Typography variant="h4" component="h1" ml={2}>
          Professional Certifications
        </Typography>
      </Box>

      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="certificates table">
          <TableHead>
            <Button
              variant="contained"
              color="success" // Đổi màu nút thành xanh (success)
              size="medium" // Tăng kích thước thành "medium"
              onClick={() => handleAdd()} // Gọi hàm handleAdd trực tiếp
              sx={{ ml: 2 }} // Thay đổi margin bên trái (margin-left)
            >
              Add Certificate
            </Button>
            <TableRow>
              <TableCell>Certificate Name</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Issue Month</TableCell>
              <TableCell>Issue Year</TableCell>
              <TableCell>Certificate URL</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((certificate) => (
              <TableRow
                key={certificate.certificateId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="body1" fontWeight="medium">
                    {certificate.certificateName || "N/A"}
                  </Typography>
                </TableCell>
                <TableCell>{certificate.organization || "N/A"}</TableCell>
                <TableCell>{certificate.issueMonth || "N/A"}</TableCell>
                <TableCell>{certificate.issueYear || "N/A"}</TableCell>
                <TableCell>
                  {certificate.certificateUrl ? (
                    <Tooltip title="Open certificate URL">
                      <IconButton
                        component={Link}
                        href={certificate.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        size="small"
                      >
                        <FiExternalLink />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: 250,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {certificate.description || "N/A"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleUpdate(certificate.certificateId)}
                    sx={{ mr: 1 }}
                  >
                    update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(certificate.certificateId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default Certificates;
