import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ checkPermission, redirectPath = "/login", children }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const verifyPermission = async () => {
      const result = await checkPermission(); 
      setIsAllowed(result);
    };
    verifyPermission();
  }, [checkPermission]);

  if (isAllowed === null) {
    return <div>Loading...</div>;
  }

  return isAllowed ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
