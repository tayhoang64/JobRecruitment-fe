import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Container, TextField, Pagination, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { FiDownload, FiSearch } from "react-icons/fi";
import isAdmin from "../utils/isAdmin";
import { BASE_URL } from '../constants';
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteButtonWithConfirmation from "./DeleteButtonWithConfirmation";

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
    fetchTemplates();
  }, [])

  const fetchTemplates = () => {
    axios.get(`${BASE_URL}/api/Template`)
      .then(response => {
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
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const handleDeleteSuccess = () => {
    fetchTemplates(); // Refresh danh sách sau khi xóa
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
    <Container maxWidth="lg" sx={{ py: 4 }} style={{ marginTop: "40px" }}>
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
      <Button>
        <Link to={`/dashboard/template/add`}>Add Template</Link>
      </Button>

      <Grid container spacing={3} style={{ marginTop: "10px" }}>
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
                  href={`${BASE_URL}${template.fileUrl}`}
                  target="_blank"
                  variant="contained"
                  color="primary"
                >
                  View Template
                </StyledButton>
                <StyledButton
                  component="a"
                  href={`/dashboard/template/update/${template.id}`}
                  variant="contained"
                  color="primary"
                >
                  Update
                </StyledButton>
                <DeleteButtonWithConfirmation id={template.id} onDeleteSuccess={ handleDeleteSuccess } />
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
