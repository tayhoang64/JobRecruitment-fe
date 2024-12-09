import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Box,
    Button,
    Container,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Typography,
    Grid,
    Autocomplete,
    Chip,
    Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { motion } from "framer-motion";
import { BASE_URL } from '../constants';
import dayjs from "dayjs";

import axios from 'axios';
import { Navigate, useParams } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
}));

const AnimatedButton = styled(motion.div)({
    width: "100%",
});

const UpdateJobForm = () => {
    const [skillsList, setSkillsList] = useState([]);
    const { companyId, id } = useParams();
    const [formData, setFormData] = useState({
        jobName: "",
        salary: "",
        location: "",
        workStyle: "",
        description: "",
        endDay: null,
        experienceYear: "",
        recruitmentCount: "",
        skillIds: [],
        companyId: companyId,
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/api/Skill`)
            .then(response => {
                setSkillsList(Array.from(response.data.$values))
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });

        axios.get(`${BASE_URL}/api/Job/${id}`)
            .then(response => {
                setFormData({
                    jobName: response.data.jobName,
                    salary: response.data.salary,
                    location: response.data.location,
                    workStyle: response.data.workStyle,
                    description: response.data.description,
                    endDay: dayjs(new Date(response.data.endDay)),
                    experienceYear: response.data.experienceYear,
                    recruitmentCount: response.data.recruitmentCount,
                    skillIds: Array.from(response.data.skills.$values).map(s => s.skillId),
                    companyId: response.data.companyId,
                })
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });

    }, [])

    const [errors, setErrors] = useState({});

    const workStyleOptions = ["Remote", "Hybrid", "On-site"];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleDateChange = (name, date) => {
        setFormData((prev) => ({
            ...prev,
            [name]: date,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.jobName.trim()) {
            newErrors.jobName = "Job name is required";
        }
        if (!formData.experienceYear) {
            newErrors.experienceYear = "Experience years is required";
        }
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        axios.put(`${BASE_URL}/api/job/${id}`, formData)
            .then((response) => {
                window.location.href = '/'
            })
            .catch((error) => {

            });
    };



    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <StyledPaper component="form" onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                    Update Job
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            label="Job Name"
                            name="jobName"
                            value={formData.jobName}
                            onChange={handleChange}
                            error={!!errors.jobName}
                            helperText={errors.jobName}
                            aria-label="Job Name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            aria-label="Salary"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            aria-label="Location"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Work Style</InputLabel>
                            <Select
                                name="workStyle"
                                value={formData.workStyle}
                                onChange={handleChange}
                                label="Work Style"
                            >
                                {workStyleOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                    label="End Day"
                                    value={formData.endDay}
                                    onChange={(date) => handleDateChange("endDay", date)}
                                    sx={{ width: "100%" }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            aria-label="Description"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            type="number"
                            label="Experience Years"
                            name="experienceYear"
                            value={formData.experienceYear}
                            onChange={handleChange}
                            error={!!errors.experienceYear}
                            helperText={errors.experienceYear}
                            aria-label="Experience Years"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Recruitment Count"
                            name="recruitmentCount"
                            value={formData.recruitmentCount}
                            onChange={handleChange}
                            aria-label="Recruitment Count"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            options={skillsList}
                            getOptionLabel={(option) => option.skillName}
                            value={formData.skillIds.map((skillId) =>
                                skillsList.find((skill) => skill.skillId === skillId)
                            )}
                            onChange={(_, newValue) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    skillIds: newValue.map((option) => option.skillId), // Save only skillId
                                }))
                            }
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        key={index}
                                        variant="outlined"
                                        label={option.skillName} // Display the skillName in the chip
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="Skills" placeholder="Select skills" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AnimatedButton
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ mt: 2 }}
                            >
                                Update Job
                            </Button>
                        </AnimatedButton>
                    </Grid>
                </Grid>
            </StyledPaper>
        </Container>
    );
};

export default UpdateJobForm;