import axios from "axios";
import { BASE_URL } from "../constants";

const isCVDecorator = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage");
    return false;
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.get(`${BASE_URL}/api/User/getRoles`);
    const roles = response.data.$values || [];
    return roles.includes("CompanyOwner"); 
  } catch (error) {
    console.error("Error fetching user roles:", error);
    return false; 
  }
};

export default isCVDecorator;
