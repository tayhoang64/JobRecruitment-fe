import axios from "axios";
import { BASE_URL } from "../constants";

const isContentCreatorWithoutCompanyId = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found in localStorage");
      return false;
    }
  
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
    try {
      await axios.get(`${BASE_URL}/api/Staff/checkCC`);
      return true;
    } catch (error) {
      console.log(error.status);
      return false; 
    }
  };

export default isContentCreatorWithoutCompanyId;