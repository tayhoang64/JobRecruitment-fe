import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Container, TextField, Pagination, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { FiDownload, FiSearch } from "react-icons/fi";
import isAdmin from "../utils/isAdmin";
import { BASE_URL } from '../constants';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)"
  }
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  backgroundSize: "cover"
});

const StyledButton = styled(Button)({
  marginTop: "auto",
  textTransform: "none"
});

const SearchBox = styled(Box)({
  marginBottom: "2rem",
  display: "flex",
  alignItems: "center"
});

const TemplateDB = () => {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/Template`)
        .then(response => {
            console.log(response.data.$values)
            let data = Array.from(response.data.$values).map(value => {
                return {
                    id: value.templateId,
                    title: value.title,
                    createdAt: new Date(value.createdAt),
                    lastUpdated: new Date(value.lastUpdatedAt),
                    uploadedBy: value.user.email,
                    fileUrl: value.file,
                    image: value.image
                }
            })
            setTemplates(data);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
  }, [])

//   const templates = [
//     {
//       id: 1,
//       title: "Business Report Template",
//       createdAt: "2024-01-15",
//       lastUpdated: "2024-01-20",
//       uploadedBy: "John Smith",
//       fileUrl: "#",
//       image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
//     },
//     {
//       id: 2,
//       title: "Marketing Presentation",
//       createdAt: "2024-01-10",
//       lastUpdated: "2024-01-18",
//       uploadedBy: "Emma Wilson",
//       fileUrl: "#",
//       image: "https://images.unsplash.com/photo-1557804506-669a67965ba0"
//     },
//     {
//       id: 3,
//       title: "Financial Analysis Sheet",
//       createdAt: "2024-01-05",
//       lastUpdated: "2024-01-15",
//       uploadedBy: "Michael Brown",
//       fileUrl: "#",
//       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
//     },
//     {
//       id: 4,
//       title: "Project Timeline Template",
//       createdAt: "2024-01-01",
//       lastUpdated: "2024-01-12",
//       uploadedBy: "Sarah Johnson",
//       fileUrl: "#",
//       image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d"
//     }
//   ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Filter templates based on search term
  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} style={{marginTop:"40px"}}>
      <SearchBox>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search templates by title or uploader..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <FiSearch style={{ marginRight: "8px" }} />
          }}
        />
      </SearchBox>

      <Grid container spacing={3}>
        {paginatedTemplates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <StyledCard>
              <StyledCardMedia
                image={template.image}
                title={template.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5";
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {template.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Created: {formatDate(template.createdAt)}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Last Updated: {formatDate(template.lastUpdated)}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Uploaded By: {template.uploadedBy}
                </Typography>
                <StyledButton
                  component="a"
                  href={template.fileUrl}
                  variant="contained"
                  color="primary"
                  startIcon={<FiDownload />}
                  fullWidth
                >
                  Download Template
                </StyledButton>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {filteredTemplates.length > itemsPerPage && (
        <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Stack>
      )}
    </Container>
  );
};

export default TemplateDB;
