import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
 type Props = {
  children: JSX.Element,
  user:any
  validatingUser:Boolean
 }
const ProtectedRoute = ({ children, user,validatingUser }:Props) => {
  const location = useLocation();
  // return user  ? (
  //   <Navigate to={"/login"} state={{ from: location }} replace />
  // ) : (
  //   children
  // );

  if (validatingUser) {
    // If authentication state is still loading, display a loading indicator or component
    return (<LoadingIndicator/>);
  } else if (user === null && validatingUser === false) {
    // If the user is not authenticated and loading is complete, redirect to login
    return <Navigate to={"/"} state={{ from: location }} replace />
} else {
    // If the user is authenticated, render the protected component
    return  children;
  }

};

export default ProtectedRoute;