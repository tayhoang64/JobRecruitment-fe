import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  Card,
  CardContent,
  Box,
  Divider,
  Paper,
  Avatar,
} from "@mui/material";
import { BASE_URL } from "../constants";
import axios from "axios";
import { styled } from "@mui/system";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaBriefcase,
  FaDollarSign,
  FaLaptopHouse,
} from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useParams } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "2rem",
  marginTop: "2rem",
  marginBottom: "2rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
}));

const InfoChip = styled(Chip)(({ theme }) => ({
  margin: "0.5rem",
  padding: "1rem",
  fontSize: "1rem",
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  padding: "1rem 2rem",
  fontSize: "1.1rem",
  marginTop: "2rem",
}));

const RecommendedJobCard = styled(Card)(({ theme }) => ({
  margin: "1rem 0",
  padding: "1rem",
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));
const JobViewDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    fetchJobDetail();
  }, []);

  const fetchJobDetail = () => {
    axios
      .get(`${BASE_URL}/api/Job/${id}`)
      .then((response) => {
        let job = response.data;
        setJobData({
          title: job.jobName,
          company: job.company.companyName,
          companyLogo: job.company.logo,
          salary: job.salary,
          location: job.location,
          workStyle: job.workStyle,
          description: job.description,
          endDate: job.endDate,
          experienceYears: job.experienceYear,
          recruitmentCount: job.recruitmentCount,
          skills: Array.from(job.skills.$values).map((s) => s.skillName),
        });
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };
  const [jobData, setJobData] = useState({});

  const [recommendedJobs] = useState([
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Digital Innovators Inc",
      location: "San Francisco, CA",
      salary: "$130,000 - $160,000",
    },
    {
      id: 2,
      title: "React Native Developer",
      company: "Mobile Tech Solutions",
      location: "Boston, MA",
      salary: "$110,000 - $140,000",
    },
    {
      id: 3,
      title: "UI/UX Developer",
      company: "Creative Works Ltd",
      location: "Austin, TX",
      salary: "$100,000 - $130,000",
    },
  ]);

  const handleApply = () => {
    console.log("Application submitted");
  };

  const handleBack = () => {
    console.log("Navigate back");
  };

  return (
    <Container maxWidth="lg">
      <Button
        startIcon={<IoArrowBack />}
        onClick={handleBack}
        sx={{ mt: 3, mb: 2 }}
        variant="outlined"
      >
        Back to Jobs
      </Button>

      <StyledCard>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2}>
            <Avatar
              src={`https://${jobData.companyLogo}`}
              alt={jobData.company}
              sx={{ width: 100, height: 100 }}
              variant="rounded"
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {jobData.title}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {jobData.company}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "background.default" }}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <FaDollarSign />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      <strong>Salary:</strong> {jobData.salary}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "background.default" }}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <FaMapMarkerAlt />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      <strong>Location:</strong> {jobData.location}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "background.default" }}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <FaLaptopHouse />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      <strong>Work Style:</strong> {jobData.workStyle}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "background.default" }}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <FaBriefcase />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      <strong>Experience:</strong> {jobData.experienceYears}+
                      years
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Job Description
          </Typography>
          <Typography variant="body1" paragraph>
            {jobData.description}
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Required Skills
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {jobData.skills && jobData.skills.length > 0 ? (
              jobData.skills.map((skill) => (
                <InfoChip
                  key={skill}
                  label={skill}
                  color="primary"
                  variant="outlined"
                />
              ))
            ) : (
              <Typography variant="body1">No skills listed.</Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <FaUsers /> {jobData.recruitmentCount} positions available
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <FaCalendarAlt /> Application Deadline:{" "}
                {new Date(jobData.endDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
              <ApplyButton
                variant="contained"
                color="primary"
                onClick={handleApply}
                size="large"
              >
                Apply Now
              </ApplyButton>
            </Grid>
          </Grid>
        </Box>
      </StyledCard>

      {/* Recommended Jobs Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Recommended Jobs
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {recommendedJobs.map((job) => (
            <Grid item xs={12} md={4} key={job.id}>
              <RecommendedJobCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {job.title}
                  </Typography>
                  <Typography color="primary" gutterBottom>
                    {job.company}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                    <Typography variant="body2">{job.location}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <FaDollarSign style={{ marginRight: "8px" }} />
                    <Typography variant="body2">{job.salary}</Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </RecommendedJobCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default JobViewDetail;
