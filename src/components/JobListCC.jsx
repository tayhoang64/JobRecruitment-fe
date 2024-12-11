import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  Container,
  Avatar,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
  Slider
} from "@mui/material";
import { styled } from "@mui/system";
import { MdExpandMore, MdLocationOn, MdWorkOutline, MdAccessTime, MdBusinessCenter, MdDescription, MdSearch, MdFilterList } from "react-icons/md";
import { BASE_URL } from '../constants';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: "16px",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
  }
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: "4px",
  fontWeight: 500
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  marginBottom: "24px",
  display: "flex",
  gap: "16px",
  flexWrap: "wrap"
}));

const JobListCC = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  useEffect(() => {
    fetchJob();
  },[])

  const fetchJob = () => {
    axios.get(`${BASE_URL}/api/Job/company/${id}`)
        .then(response => {
            console.log(response.data)
            let data = Array.from(response.data.$values).map(value => {
                return {
                    jobId: value.jobId,
                    jobName: value.jobName,
                    salary: value.salary,
                    location: value.location,
                    workStyle: value.workStyle,
                    postedDay: value.postedDay,
                    description: value.description,
                    endDay: value.endDay,
                    experienceYear: value.experienceYear,
                    skills: Array.from(value.skills.$values).map(skill => skill.skillName),
                    companyDetails: {
                      companyName: value.company.companyName,
                      address: value.company.address,
                      description: value.company.description,
                      companyType: value.company.companyType,
                    }
                  
                }
            })
            setJobs(data);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: "bold" }}>
        Available Positions
      </Typography>

      <SearchContainer>
        <TextField
          fullWidth
          placeholder="Search jobs or companies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <MdSearch size={24} style={{ marginRight: "8px" }} />
          }}
        />
      </SearchContainer>
      <Button href={`/company/${id}/jobs/create`}>Add New Job</Button>

      <Grid container spacing={3}>
        {jobs.map((job, index) => (
          <Grid item xs={12} key={index}>
            <StyledCard>
              <Accordion
                sx={{ boxShadow: "none" }}
              >
                <AccordionSummary>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {job.companyDetails.companyName.charAt(0)}
                      </Avatar>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={1}>
                        <Grid item>
                          <Typography variant="h6" fontWeight="bold">
                            {job.jobName}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                            {job.companyDetails.companyName}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          <StyledChip
                            icon={<MdBusinessCenter />}
                            label={
                                isNaN(parseInt(job.salary))
                                ? "Wage Agreement"
                                : `$${parseInt(job.salary).toLocaleString()}`
                            }
                            variant="outlined"
                            color="primary"
                            />

                            <StyledChip
                              icon={<MdLocationOn />}
                              label={job.location}
                              variant="outlined"
                            />
                            <StyledChip
                              icon={<MdWorkOutline />}
                              label={job.workStyle}
                              variant="outlined"
                            />
                            <StyledChip
                              icon={<MdAccessTime />}
                              label={new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(job.postedDay))}
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 1 }}
                        >
                         <Link to={`/company/${id}/jobs/update/${job.jobId}`} style={{ color: "white" }}>Update</Link>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Job Details
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" gutterBottom>
                          <MdDescription style={{ verticalAlign: "middle" }} /> Description:
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {job.description}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        <strong>Experience Required:</strong> {job.experienceYear} years
                      </Typography>
                      <Typography variant="body2">
                        <strong>Skills Required:</strong> {job.skills.join(", ")}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Application Deadline:</strong> {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(job.endDay))}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Company Details
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Type:</strong> {job.companyDetails.companyType}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Address:</strong> {job.companyDetails.address}
                      </Typography>
                      <strong>About:</strong>
                      <Typography 
                        variant="body2" 
                        paragraph
                        component="div"
                        dangerouslySetInnerHTML={{ __html: job.companyDetails.description }}
                    />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobListCC;