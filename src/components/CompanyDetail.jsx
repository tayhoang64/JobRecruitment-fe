import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Typography,
  useTheme,
  ImageList,
  ImageListItem
} from "@mui/material";
import { styled } from "@mui/system";
import { FaMapMarkerAlt, FaGlobe, FaPhone, FaEnvelope, FaClock, FaUsers, FaBuilding } from "react-icons/fa";
import { BASE_URL } from '../constants';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { color } from "framer-motion";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "transparent",
  boxShadow: "none",
  padding: theme.spacing(3),
}));

const InfoCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const CompanyViewDetail = () => {

  const [companyData, setCompanyData] = useState({

  });
  const { id } = useParams();
  useEffect(() => {
    CompanyDetailPage();
    console.log(companyData)
  }, []);
  const CompanyDetailPage = () => {
    axios.get(`${BASE_URL}/api/Company/${id}`).then(respone => {
      let company = respone.data;
      console.log(company)
      setCompanyData({
        logo: company.logo,
        name: company.companyName,
        type: company.companyType,
        size: company.companySize,
        description: company.description,
        address: company.address,
        country: company.companyCountry,
        workingDays: company.workingDay,
        overtimePolicy: company.overtimePolicy,
        email: company.emailCompany,
        ownerEmail: company.emailOwner,
        hotline: company.hotline,
        website: company.website,
        images: Array.from(company.companyImages.$values).map(c => c.file)
      });

    })
    
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, py: 4 }}>
        <StyledAppBar position="static">
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} md={3}>
              <CardMedia
                component="img"
                height="120"
                image={companyData.logo}
                alt="Company Logo"
                sx={{ objectFit: "contain" }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h4" component="h1" style={{color:"black"}}>
                  {companyData.name}
                </Typography>
              </Box>
              <Typography variant="subtitle1" color="text.secondary">
                {companyData.type} • {companyData.size}
              </Typography>
            </Grid>
          </Grid>
        </StyledAppBar>

        <InfoCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" paragraph>
              {companyData.description}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <FaMapMarkerAlt />
                  <Typography>{companyData.address}, {companyData.country}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <FaClock />
                  <Typography>{companyData.workingDays}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <FaUsers />
                  <Typography>{companyData.overtimePolicy}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <FaEnvelope />
                  <Typography>{companyData.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <FaPhone />
                  <Typography>{companyData.hotline}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <FaGlobe />
                  <Typography>{companyData.website}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </InfoCard>

        <InfoCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Company Gallery
            </Typography>
            <ImageList cols={3} gap={16}>
                {companyData.images?.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={image}
                      alt={`Company Image ${index + 1}`}
                      loading="lazy"
                      style={{ height: 200, width: "100%", objectFit: "cover" }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
          </CardContent>
        </InfoCard>
      </Box>
    </Container>
  );
}



export default CompanyViewDetail;