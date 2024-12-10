import axios from "axios";
import { BASE_URL } from "../constants";

const isLogin = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage");
    return false;
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.get(`${BASE_URL}/api/User/profile`);
    return true; 
  } catch (error) {
    console.error("Error fetching check login", error);
    return false; 
  }
};

export default isLogin;
