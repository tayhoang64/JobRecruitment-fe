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
import { Link } from "react-router-dom";

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

const JobList = () => {
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [workStyleFilter, setWorkStyleFilter] = useState("all");
  const [salaryRange, setSalaryRange] = useState([0, 200000]);
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const itemsPerPage = 5;
  useEffect(() => {
    fetchJob();
  },[expanded, page, searchTerm, locationFilter, workStyleFilter, salaryRange, experienceFilter, skillFilter])

  const fetchJob = () => {
    axios.get(`${BASE_URL}/api/Job`)
        .then(response => {
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
            const jobsData = {
                jobs: data
              };
            
              const filteredJobs = jobsData.jobs.filter(job => {
                const matchesSearch = job.jobName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  job.companyDetails.companyName.toLowerCase().includes(searchTerm.toLowerCase());
              
                const matchesLocation = locationFilter === "all" || job.location.toLowerCase().includes(locationFilter.toLowerCase());
                
                const matchesWorkStyle = workStyleFilter === "all" || job.workStyle.toLowerCase() === workStyleFilter.toLowerCase();
                
                const matchesSalary = job.salary.toLowerCase() === "thỏa thuận" || job.salary.toLowerCase() === "wage agreement" ||
                  (parseInt(job.salary) >= salaryRange[0] && parseInt(job.salary) <= salaryRange[1]);
              
                const matchesExperience = experienceFilter === "all" || job.experienceYear.toString() === experienceFilter;
              
                const matchesSkill = skillFilter === "all" || job.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));
              
                return matchesSearch && matchesLocation && matchesWorkStyle && matchesSalary && matchesExperience && matchesSkill;
              });
              
              
              const startIndex = (page - 1) * itemsPerPage;
              const endIndex = startIndex + itemsPerPage;
              const displayedJobs = filteredJobs.slice(startIndex, endIndex);
              setDisplayedJobs(displayedJobs)
              setFilteredJobs(filteredJobs)
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
  }

  

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleViewDetails = (job) => {
    console.log("View details for:", job);
  };

  const handleSalaryRangeChange = (event, newValue) => {
    setSalaryRange(newValue);
  };

  

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

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Location</InputLabel>
          <Select
            value={locationFilter}
            label="Location"
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <MenuItem value="all">All Locations</MenuItem>
            <MenuItem value="San Francisco">San Francisco</MenuItem>
            <MenuItem value="New York">New York</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Work Style</InputLabel>
          <Select
            value={workStyleFilter}
            label="Work Style"
            onChange={(e) => setWorkStyleFilter(e.target.value)}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Remote">Remote</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Experience (Years)</InputLabel>
          <Select
            value={experienceFilter}
            label="Experience"
            onChange={(e) => setExperienceFilter(e.target.value)}
          >
            <MenuItem value="all">All Experience</MenuItem>
            <MenuItem value="3">3 Years</MenuItem>
            <MenuItem value="5">5 Years</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Skills</InputLabel>
          <Select
            value={skillFilter}
            label="Skills"
            onChange={(e) => setSkillFilter(e.target.value)}
          >
            <MenuItem value="all">All Skills</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="JavaScript">JavaScript</MenuItem>
            <MenuItem value="Figma">Figma</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ width: 300 }}>
          <Typography gutterBottom>Salary Range</Typography>
          <Slider
            value={salaryRange}
            onChange={handleSalaryRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={200000}
            step={10000}
            valueLabelFormat={(value) => `$${value.toLocaleString()}`}
          />
        </Box>
      </SearchContainer>

      <Grid container spacing={3}>
        {displayedJobs.map((job, index) => (
          <Grid item xs={12} key={index}>
            <StyledCard>
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{ boxShadow: "none" }}
              >
                <AccordionSummary
                  expandIcon={<MdExpandMore size={24} />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
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
                              label={job.postedDay}
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewDetails(job)}
                          sx={{ mt: 1 }}
                        >
                         <Link to={`/jobs/${job.jobId}`} style={{ color: "white" }}>View Detail</Link>
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
                        <strong>Application Deadline:</strong> {job.endDay}
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
                      <Typography variant="body2" paragraph>
                        <strong>About:</strong> {job.companyDetails.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(filteredJobs.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default JobList;