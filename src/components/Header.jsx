import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'
import React, { useState, useEffect,useRef  } from 'react';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { Avatar } from '@mui/material';
import AccountMenu from './AccountMenu';

function Header({ offSlide }) {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");
  const hasFetchedUser = useRef(false)
  console.log("Header loaded");
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !hasFetchedUser.current) {
      hasFetchedUser.current = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get(`${BASE_URL}/api/User/profile`)
        .then(response => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, []);
    
  useEffect(() => {
    if(user != null){
        setAvatar(user.avatar);
    }
  }, [user]);

  

    return (
      <>
      <header id='header-wrap'>
        <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar indigo">
            <div className="container">
            <div className="navbar-header">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                <span className="icon-menu"></span>
                <span className="icon-menu"></span>
                <span className="icon-menu"></span>
                </button>
                <Link to="/" className="navbar-brand"><img src={logo} alt="" /></Link>
            </div>
            <div className="collapse navbar-collapse" id="main-navbar">
                <ul className="onepage-nev navbar-nav mr-auto w-100 justify-content-end clearfix">
                <li className="nav-item active">
                    <a className="nav-link" href="#hero-area">
                    Home
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#about">
                    About
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#services">
                    Services
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#resume">
                    Resume
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#portfolios">
                    Work
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#contact">
                    Contact
                    </a>
                </li>
                {user == null && <li className="nav-item">
                    <Link className="nav-link" to="/auth">Login/Sign up</Link>
                  </li> || <>
                        <li className="nav-item" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                             {/* <Avatar src={avatar}/>  */}
                             <AccountMenu avatar={<Avatar src={avatar}/>} setUser={setUser} />
                        </li>
                    </>}
                </ul>
            </div>
            </div>
            <ul className="onepage-nev mobile-menu">
            <li>
                <a href="#home">Home</a>
            </li>
            <li>
                <a href="#about">about</a>
            </li>
            <li>
                <a href="#services">Services</a>
            </li>
            <li>
                <a href="#resume">resume</a>
            </li>
            <li>
                <a href="#portfolio">Work</a>
            </li>
            <li>
                <a href="#contact">Contact</a>
            </li>
            </ul>
        </nav>
        {offSlide == true && <div className='hero-area-bg hero-area'>
            <div className="overlay"></div>
            <div className="container">
            <div className="row">
                <div className="col-md-12 col-sm-12 text-center">
                <div className="contents">
                    <h5 className="script-font wow fadeInUp" data-wow-delay="0.2s">Hi This is</h5>
                    <h2 className="head-title wow fadeInUp" data-wow-delay="0.4s">Tom Saulnier</h2>
                    <p className="script-font wow fadeInUp" data-wow-delay="0.6s">Front-end Web Developer and Graphic Designer</p>
                    <ul className="social-icon wow fadeInUp" data-wow-delay="0.8s">
                    <li>
                        <a className="facebook" href="#"><i className="icon-social-facebook"></i></a>
                    </li>
                    <li>
                        <a className="twitter" href="#"><i className="icon-social-twitter"></i></a>
                    </li>
                    <li>
                        <a className="instagram" href="#"><i className="icon-social-instagram"></i></a>
                    </li>
                    <li>
                        <a className="linkedin" href="#"><i className="icon-social-linkedin"></i></a>
                    </li>
                    <li>
                        <a className="google" href="#"><i className="icon-social-google"></i></a>
                    </li>
                    </ul>
                    <div className="header-button wow fadeInUp" data-wow-delay="1s">
                    <a href="#" className="btn btn-common">Get a Free Quote</a>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>}
        </header>
      </>
    )
  }
  
  export default Header