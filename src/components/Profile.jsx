import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  Button,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe, FaChevronDown, FaEdit } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "50px",
  margin: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: "150px",
  height: "150px",
  marginBottom: "16px",
  border: "4px solid #fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}));

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const userData = {
    fullName: "Nguyen Van A",
    title: "Front-End Developer",
    location: "Ho Chi Minh",
    email: "nguyen.van.a@example.com",
    phone: "+84 123 456 789",
    website: "www.example.com",
    about: "Passionate front-end developer with 5+ years of experience in creating responsive and user-friendly web applications. Proficient in modern JavaScript frameworks and libraries.",
    skills: ["React", "TypeScript", "Material-UI", "Node.js", "MongoDB", "AWS"],
    education: [
      {
        degree: "Bachelor of Computer Science",
        institution: "XYZ University",
        year: "2015-2019",
      },
    ],
    certificates: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        year: "2021",
      },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Developed a full-stack e-commerce platform using MERN stack",
        year: "2022",
      },
    ],
    experience: [
      {
        position: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        duration: "2019-Present",
        description: "Leading frontend development team and implementing new features",
      },
    ],
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="1200px" margin="0 auto" padding="24px">
      <StyledPaper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
            <ProfileAvatar
              src="images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"
              alt={userData.fullName}
            />
            <Typography variant="h4" gutterBottom align="center">
              {userData.fullName}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {userData.title}
            </Typography>
            <Box display="flex" alignItems="center" marginBottom="8px">
              <FaMapMarkerAlt style={{ marginRight: "8px" }} />
              <Typography>{userData.location}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaEdit />}
              sx={{ marginTop: "16px" }}
            >
              Edit Profile
            </Button>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box marginBottom="24px">
              <Typography variant="h6" gutterBottom>
                About Me
              </Typography>
              <Typography>{userData.about}</Typography>
            </Box>

            <Box marginBottom="24px">
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <FaEnvelope style={{ marginRight: "8px" }} />
                    <Typography>{userData.email}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <FaPhone style={{ marginRight: "8px" }} />
                    <Typography>{userData.phone}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <FaGlobe style={{ marginRight: "8px" }} />
                    <Typography>{userData.website}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box marginBottom="24px">
              <Typography variant="h6" gutterBottom>
                Skills
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {userData.skills.map((skill) => (
                  <Chip key={skill} label={skill} color="primary" variant="outlined" />
                ))}
              </Box>
            </Box>

            {["education", "certificates", "projects", "experience"].map((section) => (
              <Accordion
                key={section}
                expanded={expanded === section}
                onChange={handleAccordionChange(section)}
                sx={{ marginBottom: "8px" }}
              >
                <AccordionSummary expandIcon={<MdExpandMore />}>
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {section}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {userData[section].map((item, index) => (
                    <Box key={index} marginBottom={index !== userData[section].length - 1 ? 2 : 0}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.degree || item.name || item.position}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.institution || item.issuer || item.company}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.year || item.duration}
                      </Typography>
                      {item.description && (
                        <Typography variant="body2" style={{ marginTop: "8px" }}>
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default Profile;