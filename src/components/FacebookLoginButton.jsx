import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, FB_APP_ID } from '../constants';

function FacebookLoginButton() {

  // Tải SDK của Facebook
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FB_APP_ID, 
        cookie: true,
        xfbml: true,
        version: 'v12.0',
      });
    };
    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);
  const handleFacebookLogin = () => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        axios.post(`${BASE_URL}/api/Auth/facebook-login`, { token: accessToken })
          .then(res => {
            const token = res.data.token;
            localStorage.setItem('token', token); 
            window.location.href = '/';
          })
          .catch(err => console.error('Error during login with Facebook:', err));
      }
    }, { scope: 'email,public_profile' }); 
  };

  return (
    <button onClick={handleFacebookLogin}>
      Login with Facebook
    </button>
  );
}

export default FacebookLoginButton;
