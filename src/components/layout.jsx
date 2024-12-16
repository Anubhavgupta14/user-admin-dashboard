import React from "react";
import "../styles/layout.css";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation(); // Hook to get the current location

  return (
    <div className="parent-div">
      <div className="side-nav">
        <div className="side-header">
          <div className="side-profile">A</div>
          <p>Admin</p>
        </div>

        <div className="nav-items">
          <Link to="/">
            <div
              className={`nav-list ${location.pathname === "/" ? "nav-active" : ""}`}
            >
              <FaUser />
              <p>Users</p>
            </div>
          </Link>
          <Link to="/create-new-user">
            <div
              className={`nav-list ${
                location.pathname === "/create-new-user" ? "nav-active" : ""
              }`}
            >
              <FaUserPlus />
              <p>Create new User</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="right-comp">{children}</div>
    </div>
  );
};

export default Layout;
