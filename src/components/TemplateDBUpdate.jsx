import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    FormHelperText,
} from "@mui/material";
import { BASE_URL } from '../constants';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const TemplateBDUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [filePreview, setFilePreview] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            axios
                .get(`${BASE_URL}/api/User/profile`)
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user profile:", error);
                });

            axios
                .get(`${BASE_URL}/api/Template/${id}`)
                .then((response) => {
                    console.log(response.data);
                    const template = response.data;

                    setTitle(template.title);
                    setFilePreview(`${BASE_URL}${template.file}`);
                    setImagePreview(template.image);
                })
                .catch((error) => {
                    console.log("Error fetching template:", error);
                });
        }
    }, [id]);


    const validate = () => {
        const newErrors = {};

        if (title.length === 0) {
            newErrors.title = "Title is required.";
        } else if (file && !file.name.endsWith(".html")) {
            newErrors.file = "File must be an HTML file.";
        } else if (image && !image.type.startsWith("image/")) {
            newErrors.image = "File must be an image.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            setFilePreview(fileURL);
        } else {
            setFilePreview("");
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        if (selectedImage) {
            setImagePreview(URL.createObjectURL(selectedImage));
        } else {
            setImagePreview("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("uploadedBy", user.id);
        formData.append("file", file);
        formData.append("image", image);

        axios.put(`${BASE_URL}/api/Template/${id}`, formData)
            .then((response) => {
                navigate(`/dashboard/template`)
            })
            .catch((error) => {
                const uploadError = {};
                uploadError.title = error;
                setErrors(uploadError);
            })
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: "auto" }} style={{ marginTop: "80px" }}>
            <Typography variant="h5" gutterBottom>
                Update Template Form
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!!errors.title}
                    helperText={errors.title}
                    required
                />
                <TextField value={user.userName} disabled />
                <Box>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ marginBottom: 1 }}
                    >
                        Upload HTML File
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                            accept=".html"
                        />
                    </Button>
                    {errors.file && <FormHelperText error>{errors.file}</FormHelperText>}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            HTML File Preview
                        </Typography>
                        {filePreview && (
                            <iframe
                                src={filePreview}
                                title="HTML Preview"
                                style={{
                                    width: "100%",
                                    height: "300px",
                                    border: "1px solid #ccc",
                                    marginTop: "10px",
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ marginBottom: 1 }}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </Button>
                    {errors.image && <FormHelperText error>{errors.image}</FormHelperText>}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Image Preview
                        </Typography>
                        {imagePreview && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 2,
                                    width: "200px",
                                    height: "200px",
                                    border: "1px solid #ccc",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={imagePreview}
                                    alt="Template Preview"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Save
                </Button>
                <Button href="/dashboard/template">
                    Back
                </Button>
            </Box>
        </Paper>
    );
};

export default TemplateBDUpdate;
