import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import CreateNewUser from "../pages/create-new-user"

const AdminRoute = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-new-user" element={<CreateNewUser />} />
        <Route path="/edit-user/:id" element={<CreateNewUser />} />
      </Routes>
  );
};

export default AdminRoute;
