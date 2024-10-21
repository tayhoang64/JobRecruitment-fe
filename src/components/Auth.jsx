import { useState, useEffect } from 'react';
import '../assets/auth/main.css';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';
import GoogleLoginButton from './GoogleLoginButton';
import FacebookLoginButton from './FacebookLoginButton';

function Auth() {
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [singupUsername, setSingupUsername] = useState('');
  const [singupEmail, setSingupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowSignup(!showSignup);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeSignupUserName = (e) => {
    setSingupUsername(e.target.value);
  }

  const handleChangeSignupEmail = (e) => {
    setSingupEmail(e.target.value);
  }

  const handleChangeSignupPassword = (e) => {
    setSignupPassword(e.target.value);
  }

  const handleChangeLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  }

  const handleChangeLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const signupData = {
      username: singupUsername,
      email: singupEmail,
      password: signupPassword,
    };
  
    axios.post(`${BASE_URL}/api/Auth/register`, signupData)
      .then((response) => {
        
        setShowSignup(false);
        setLoginEmail('')
        setLoginPassword('')
        toast.success(response.data, {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errors = error.response.data.errors;
  
          for (const field in errors) {
            if (errors.hasOwnProperty(field)) {
              errors[field].forEach((message) => {
                toast.error(message, {
                  position: "top-center",
                  autoClose: 3500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              });
            }
          }
        } 
        
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };


    axios.post(`${BASE_URL}/api/Auth/login`, loginData)
      .then((response) => {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
      .catch((error) => {
        toast.error("Login failed. Please check your credentials.", {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };
  
  return (
    <>
    <div className="content">
      {!showSignup ? (
        <form className="signin-form" onSubmit={handleLoginSubmit}>
          <h2>Sign In</h2>
          <div className="input-bx">
            <input type="text" id="signinEmail" value={loginEmail} onChange={handleChangeLoginEmail} required placeholder="Email" />
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="input-bx">
            <input type="password" id="signinPassword" value={loginPassword} onChange={handleChangeLoginPassword} required placeholder="Password" />
            <i className="fa-solid fa-key"></i>
            <p>forgot password?</p>
          </div>
          <button className="btn-signin">
            Sign In <i className="fa-solid fa-right-to-bracket"></i>
          </button>
          <div className="option-text">
            <hr />
            <p>or sign in with</p>
          </div>
          <div className="button-group">
              <GoogleLoginButton />
              <FacebookLoginButton/>
          </div>
          <p className="message">
            <a href="#" onClick={toggleForm}>Not a Member? click here</a>
          </p>
        </form>
      ) : (
        <form className="signup-form" onSubmit={handleSignupSubmit}>
          <h2>Sign Up</h2>
          <div className="input-bx">
            <input type="text" id="signupUsername" value={singupUsername} onChange={handleChangeSignupUserName} required placeholder="Username" />
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="input-bx">
            <input type="text" id="signupEmail" value={singupEmail} onChange={handleChangeSignupEmail} required placeholder="Email" />
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="input-bx">
            <input
              type={showPassword ? 'text' : 'password'}
              id="signupPassword"
              required
              placeholder="Password"
              value={signupPassword} onChange={handleChangeSignupPassword}
            />
            <i className="fa-solid fa-key"></i>
            <p className="passShowHide" onClick={togglePasswordVisibility}>
              {showPassword ? 'hide' : 'show'}
            </p>
          </div>
          <button className="btn-signin" onClick={handleSignupSubmit}>
            Sign Up <i className="fa-solid fa-user-plus"></i>
          </button>
          
          <p className="message">
            <a href="#" onClick={toggleForm}>Already a Member? click here</a>
          </p>
        </form>
      )}
    </div>
    <ToastContainer
      position="top-center"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />      
    </>
  );
}

export default Auth;
