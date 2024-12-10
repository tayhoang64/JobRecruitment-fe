import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  ImageList,
  ImageListItem
} from "@mui/material";
import { FaEye, FaBuilding, FaGlobe, FaPhone, FaInfoCircle, FaImages } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../constants";
import { address } from "framer-motion/client";

const OwnCompanies = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    GetOwnCompanies();
  }, []);

  
  const GetOwnCompanies = () => {
    axios.get(`${BASE_URL}/api/company/get-own-companies`).then((response) => {
        console.log(response.data.$values)
        let companies = Array.from(response.data.$values).map(company => {

            return {
                id: company.companyId,
                logo: company.logo,
                name: company.companyName,
                type: company.companyType,
                country: company.companyCountry,
                hotline: company.hotline,
                description: company.description,
                employees: company.companySize,
                address: company.address,
                workingDay: company.workingDay,
                website: company.website,
                images: Array.from(company.companyImages.$values).map(c => c.file),
                overtimePolicy: company.overtimePolicy, 
                emailCompany : company.emailCompany
            }
        })
        setCompanies(companies)
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (company) => {
    setSelectedCompany(company);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="company list table">
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Hotline</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <Avatar
                      src={company.logo}
                      alt={company.name}
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.type}</TableCell>
                  <TableCell>{company.country}</TableCell>
                  <TableCell>{company.hotline}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(company)}
                    >
                      <FaEye />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <Button href={`/company/update/${company.id}`}>Update</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={companies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedCompany && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={selectedCompany.logo}
                  alt={selectedCompany.name}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Typography variant="h5">{selectedCompany.name}</Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        <FaInfoCircle style={{ marginRight: "8px" }} />
                        Company Overview
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {selectedCompany.description}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" gutterBottom>
                            <FaBuilding style={{ marginRight: "8px" }} />
                            <strong>Type:</strong> {selectedCompany.type}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <FaGlobe style={{ marginRight: "8px" }} />
                            <strong>Country:</strong> {selectedCompany.country}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <FaPhone style={{ marginRight: "8px" }} />
                            <strong>Hotline:</strong> {selectedCompany.hotline}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" gutterBottom>
                            <strong>Employees:</strong> {selectedCompany.employees.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>OvertimePolicy:</strong> {selectedCompany.overtimePolicy.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>EmailCompany:</strong> {selectedCompany.emailCompany.toLocaleString()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2" gutterBottom>
                        <strong>Website:</strong> {selectedCompany.website}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        <FaImages style={{ marginRight: "8px" }} />
                        Company Images
                      </Typography>
                      <ImageList sx={{ width: "100%", height: 450 }} cols={3} rowHeight={164}>
                        {selectedCompany.images.map((image, index) => (
                          <ImageListItem key={index}>
                            <img
                              src={image}
                              alt={`${selectedCompany.name} image ${index + 1}`}
                              loading="lazy"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="contained" color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default OwnCompanies;