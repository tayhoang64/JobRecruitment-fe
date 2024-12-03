import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { BASE_URL } from "../constants";
import { Link } from "react-router-dom";

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
  const [userData, setUserData] = useState({});

  //dung useEffect truoc khi fetch data
  useEffect(() => {
    axios.get(`${BASE_URL}/api/user/Profile`)
      .then((response) => {
        let user = response.data;
        setUserData({
          fullName: user.fullName,
          title: user.title,
          location: user.address,
          email: user.email,
          website: user.personalLink, 
          phone: user.phone,
          about: user.aboutMe,
          skills: user.mySkills.$values,
          education: user.educations.$values,
          certificates: user.certificates.$values,
          projects: user.projects.$values,
          experience: user.workExperience,
          avatar: user.avatar,
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  // useEffect(() => {
  //   console.log(userData)
  // }, [userData]);

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
              src={userData.avatar}
              alt={userData.fullName != null ? userData.fullName : "Chưa cập nhật"}
            />
            <Typography variant="h4" gutterBottom align="center">
              {userData.fullName != null ? userData.fullName : "Chưa cập nhật"}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {userData.title != null ? userData.title : "Chưa cập nhật"}
            </Typography>
            <Box display="flex" alignItems="center" marginBottom="8px">
              <FaMapMarkerAlt style={{ marginRight: "8px" }} />
              <Typography>{userData.location != null ? userData.location : "Chưa cập nhật"}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginBottom="8px">
              <FaMapMarkerAlt style={{ marginRight: "8px" }} />
              <Typography>{userData.website != null ? userData.website : "Chưa cập nhật"}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaEdit />}
              sx={{ marginTop: "16px" }}
            >
              <Link to ="/profile/update" style={{color: "white"}}>Edit</Link>
            </Button>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box marginBottom="24px">
              <Typography variant="h6" gutterBottom>
                About Me
              </Typography>
              <Typography>{userData.about != null ? userData.about : "Chưa cập nhật"}</Typography>
            </Box>

            <Box marginBottom="24px">
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <FaEnvelope style={{ marginRight: "8px" }} />
                    <Typography>{userData.email != null ? userData.email : "Chưa cập nhật"}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <FaPhone style={{ marginRight: "8px" }} />
                    <Typography>{userData.phone != null ? userData.phone : "Chưa cập nhật"}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box marginBottom="24px">
              <Typography variant="h6" gutterBottom>
                Skills
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {userData?.skills?.length > 0 ? (
                  userData.skills.map((skill) => (
                    <Chip key={skill} label={skill} color="primary" variant="outlined" />
                  ))
                ) : (
                  "Chưa cập nhật"
                )}
              </Box>
            </Box>


            {["education", "certificates", "projects", "experience"].map((section) => (
              <>
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
                  {(Array.isArray(userData[section]) && userData[section].length > 0) ? (
                    userData[section].map((item, index) => (
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
                    ))
                  ) : (
                    "Chưa cập nhật"
                  )}
                </AccordionDetails>
              </Accordion>
              <Link to={`/profile/${section}`}>Manage {section}</Link>
              </>
            ))}

          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default Profile;