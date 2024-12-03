import React, { useState, useEffect,useRef  } from 'react';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { Link } from 'react-router-dom'

function Footer() {
  const [user, setUser] = useState(null);
  const [role, SetRole] = useState([]);
  const hasFetchedUser = useRef(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !hasFetchedUser.current) {
      hasFetchedUser.current = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get(`${BASE_URL}/api/User/profile`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get(`${BASE_URL}/api/User/getRoles`)
        .then(response => {
            SetRole(Array.from(response.data.$values))
        })
        .catch(error => {
          console.error('Error fetching user role:', error);
        });
  }, []);

    return (
      <>
      <footer className="footer-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="footer-text text-center wow fadeInDown" data-wow-delay="0.3s">
              <ul className="social-icon">
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
                  <a className="instagram" href="#"><i className="icon-social-linkedin"></i></a>
                </li>
                <li>
                  <a className="instagram" href="#"><i className="icon-social-google"></i></a>
                </li>
              </ul>
              <p>Copyright © 2018 UIdeck All Right Reserved</p>
              {user != null && (
                <Link to={`/company/signup`}>Are you a company? click here</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
      </>
    )
  }
  
  export default Footer