import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Badge,
  styled
} from "@mui/material";
import { FiEdit2 } from "react-icons/fi";
import { FaShare, FaDownload, FaArrowUp } from "react-icons/fa";
import { BASE_URL } from '../constants';
import axios from 'axios';
import { saveAs } from "file-saver";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  "& .MuiCardContent-root": {
    padding: theme.spacing(3)
  }
}));

const CardHeader = styled(Box)({
  backgroundColor: "#e8f5e9",
  padding: "16px",
  position: "relative"
});

const PlaceholderLine = styled(Box)({
  height: "8px",
  backgroundColor: "#f5f5f5",
  margin: "8px 0",
  borderRadius: "4px"
});

const SavedCV = () => {
  const [dummyData, setDummyData] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get(`${BASE_URL}/api/User/profile`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }

    axios.get(`${BASE_URL}/api/CV`)
        .then(response => {
            let cvs = Array.from(response.data.$values);
            setDummyData(cvs.map(cv => {
                let nameArr = cv.file.split('/');
                return {
                    id: cv.cvid,
                    name: nameArr[nameArr.length -1],
                    file: cv.file,
                    lastUpdated: new Date(cv.lastUpdateAt).toLocaleString(),
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&w=100"
                }
            }))
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
  }, [])

  // const handleDownload = async (id) => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  //     axios.get(`${BASE_URL}/api/cv/${id}/download`)
  //       .catch(error => {
  //         alert(error.message);
  //       });
  //   }
  // }

  return (
    <Box sx={{ p: 4 }} style={{marginTop: "60px"}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1">
          CVs created
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: "20px" }}
          href={`/templates`}
        >
          + NEW
        </Button>
      </Box>

      <Grid container spacing={3}>
        {dummyData.map((cv) => (
          <Grid item xs={12} md={6} key={cv.id}>
            <StyledCard>
              <CardHeader>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={cv.avatar}
                    alt="Profile"
                    sx={{ width: 60, height: 60 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="h6">{cv.name}</Typography>
                      <Button href={`/edit/CV/${cv.id}`}>
                        <FiEdit2  style={{ cursor: "pointer" }} />
                      </Button>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Last Update At: {cv.lastUpdated}
                    </Typography>
                  </Box>
                </Box>
              </CardHeader>

              <Box sx={{ p: 2, display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <Button
                  startIcon={<FaDownload />}
                  variant="outlined"
                  size="small"
                  href={`${BASE_URL}/api/cv/${cv.id}/download`}
                >
                    Download PDF
                </Button>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SavedCV;