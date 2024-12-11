import { useEffect, useState } from "react"
import axios from "axios";
import { BASE_URL } from "../constants";
import { Link } from "react-router-dom";

const OurCompaniesCC = () => {
  
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get(`${BASE_URL}/api/staff/companies`)
        .then(response => {
          setCompanies(response.data.$values);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [])

  return (
    <>
      <div style={{marginTop: "120px"}}></div>
      {companies.map(company => (
        <h1 key={company.companyId}>{company.companyName} <Link to={`/job-management/${company.companyId}`}>List Jobs</Link></h1>
      ))}
    </>
  )
}

export default OurCompaniesCC