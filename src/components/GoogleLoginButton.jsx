import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { Navigate } from 'react-router-dom';

function GoogleLoginButton() {
    const handleSuccess = (credentialResponse) => {
        const token = credentialResponse.credential;
      
        axios.post(`${BASE_URL}/api/Auth/google-login`, { token })
          .then(response => {
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
          })
          .catch(error => {
            console.error("Error during login with Google:", error);
            window.location.href = '/';
          });
      };

  const handleFailure = (error) => {
    console.error("Google login failed", error);
    window.location.href = '/';
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
      />
    </div>
  );
}

export default GoogleLoginButton;
