import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Skeleton,
  Alert,
  styled,
  useTheme,
  Tooltip,
  Fade,
  Pagination,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { BASE_URL } from '../constants';
import axios from 'axios';
import { FiEdit2, FiEye, FiAlertCircle, FiSearch } from "react-icons/fi";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4]
  }
}));

const PreviewFrame = styled("iframe")({
  width: "100%",
  height: "200px",
  border: "none",
  borderRadius: "4px",
  pointerEvents: "none"
});

const SearchBar = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: "100%",
  maxWidth: "400px"
}));

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const theme = useTheme();

  // Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState(0);

  async function getHTMLContent(url) {
    try {
      const response = await axios.get(url);
      return response.data; // HTML content
    } catch (error) {
      console.error('Error fetching the HTML content:', error);
    }
  }

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(`${BASE_URL}/api/Template`);
        let data = await Promise.all(
          Array.from(response.data.$values).map(async (value) => {
            var htmlContent = await getHTMLContent(BASE_URL + value.file)
            return {
              id: value.templateId,
              title: value.title,
              htmlContent: htmlContent,
              createdAt: new Date(value.createdAt),
              lastUpdatedAt: new Date(value.lastUpdatedAt),
            };
          })
        );

        setTemplates(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch templates. Please try again later.");
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  // Filter templates based on search term
  const filteredTemplates = templates.filter((template) =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTemplates.slice(startIndex, endIndex);
  };

  const handleModalOpen = (htmlContent) => {
    setModalContent(htmlContent);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalContent("");
  };

  if (error) {
    return (
      <Alert
        severity="error"
        icon={<FiAlertCircle />}
        sx={{ mt: 2 }}
        role="alert"
      >
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4 }}
        role="heading"
      >
        Template Library
      </Typography>

      <Box sx={{ mb: 3 }}>
        <SearchBar
          placeholder="Search templates..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton
                variant="rectangular"
                height={300}
                sx={{ borderRadius: 1 }}
              />
            </Grid>
          ))
          : getCurrentPageItems().map((template) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={template.id}
              role="article"
            >
              <Fade in={true} timeout={500}>
                <StyledCard>
                  <PreviewFrame
                    title={`Preview of ${template.title}`}
                    srcDoc={template.htmlContent}
                    sandbox=""
                    aria-label={`Template preview for ${template.title}`}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h2"
                      gutterBottom
                      sx={{ fontWeight: "medium" }}
                    >
                      {template.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2
                      }}
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          Created: {formatDate(template.createdAt)}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          Updated: {formatDate(template.lastUpdatedAt)}
                        </Typography>
                      </Box>

                      <Box>
                        <Tooltip title="View Details" arrow>
                          <IconButton
                            onClick={() => handleModalOpen(template.htmlContent)}
                          >
                            <FiEye />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Template" arrow>
                          <IconButton
                            aria-label={`Edit ${template.title}`}
                            sx={{
                              "&:hover": { color: theme.palette.primary.main }
                            }}
                          >
                            <FiEdit2 />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Fade>
            </Grid>
          ))}
      </Grid>

      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Preview</DialogTitle>
        <DialogContent>
          <Box sx={{ height: "80vh", position: "relative" }}>
            <iframe
              srcDoc={modalContent}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                overflow: "auto", 
              }}
              title="Preview"
              sandbox="allow-same-origin"
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                zIndex: 2,
                pointerEvents: "none", 
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>




      {/* Pagination */}
      {!loading && filteredTemplates.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(filteredTemplates.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {!loading && filteredTemplates.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          No templates found matching your search.
        </Typography>
      )}
    </Box>
  );
};

export default TemplateList;