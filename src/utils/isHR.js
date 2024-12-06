import axios from "axios";
import { BASE_URL } from "../constants";

const isContentCreator = async () => {
  const token = localStorage.getItem("token");
  const urlArr = window.location.href.split("/");
  const companyId = urlArr[urlArr.length-3]

  if (!token) {
    console.error("No token found in localStorage");
    return false;
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.get(`${BASE_URL}/api/Staff/checkHR/${companyId}`);
    return true;
  } catch (error) {
    console.log(error.status);
    return false; 
  }
};

export default isContentCreator;
