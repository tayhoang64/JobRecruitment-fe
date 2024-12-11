import axios from "axios";
import { BASE_URL } from "../constants";

const isContentCreator = async () => {
  const token = localStorage.getItem("token");
  const urlArr = window.location.href.split("/");
  const numberArr = urlArr.filter(item => !isNaN(item) && item.trim() !== "").map(Number);
  const companyId = numberArr[0]

  if (!token) {
    console.error("No token found in localStorage");
    return false;
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    await axios.get(`${BASE_URL}/api/Staff/checkCC/${companyId}`);
    return true;
  } catch (error) {
    console.log(error.status);
    return false; 
  }
};

export default isContentCreator;
