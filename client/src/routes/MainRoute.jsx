import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Update from "../pages/Update";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/editprofile" element={<Update />} />
      <Route path="/userprofile" element={<Profile />} />
    </Routes>
  );
};

export default MainRoute;
