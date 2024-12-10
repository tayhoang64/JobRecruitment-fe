import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants";

const EditCV = () => {
    const { id, type } = useParams(); 
    const [user, setUser] = useState(null);
    const [htmlContent, setHtmlContent] = useState(''); 
    const htmlRef = useRef(null); 
    const [error, setError] = useState(null); 

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

        axios.get(`${BASE_URL}/api/${type}/${id}/html`)
            .then(response => {
                setHtmlContent(response.data);
                setTimeout(() => {
                    if (htmlRef.current) {
                        const scripts = htmlRef.current.querySelectorAll("script");
                        scripts.forEach((script) => {
                            const newScript = document.createElement("script");
                            newScript.textContent = script.textContent;
                            document.body.appendChild(newScript);
                            document.body.removeChild(newScript);
                        });
                    }
                }, 0);
            })
            .catch(err => {
                console.error("Error fetching HTML:", err);
                setError("Không thể tải nội dung. Vui lòng thử lại!");
            });
    }, [id, type]);

    const handleSave = () => {
        if (htmlRef.current) {
            const updatedHtml = htmlRef.current.innerHTML; // Lấy nội dung đã chỉnh sửa
            if(type == 'template'){
                axios.post(`${BASE_URL}/api/CV`, {
                    userId: user.id,
                    templateId: id,
                    htmlContent: updatedHtml
                })
                .then(response => {
                    console.log(response.data)
                }).catch(error => {
                    console.error(error)
                    setError(error.message);
                })
            } else {
                axios.put(`${BASE_URL}/api/CV`, {
                    userId: user.id,
                    templateId: id,
                    htmlContent: updatedHtml
                })
                .then(response => {
                    console.log(response.data)
                }).catch(error => {
                    console.error(error)
                    setError(error.message);
                })
            }
        }
    };

    return (
        <div>
            <h1 style={{ marginTop: "50px" }}>Hello, id = {id}, type = {type}</h1>
            <button 
                onClick={handleSave} 
                style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", backgroundColor: "blue", cursor: "pointer" }}
            >
                Lưu nội dung
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div
                ref={htmlRef}
                contentEditable
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                style={{ border: '1px solid black', padding: '10px', minHeight: '300px', overflow: 'auto' }}
            />
        </div>
    );
};

export default EditCV;
