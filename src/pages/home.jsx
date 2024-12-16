import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import "../styles/users.css";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import UserTable from "../components/user-table";
import { toast } from "sonner";
import { allList, deleteUser } from "../api/endpoint";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationPopup from "../components/delete-popup";

const Home = () => {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async (searchTerm = "") => {
    try {
      setLoading(true);
      // Modify your API call to include search parameter
      const res = await allList({
        params: { search: searchTerm },
      });
      setData(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Debounce search to reduce unnecessary API calls
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Use debounce to wait 500ms after user stops typing
    const timeoutId = setTimeout(() => {
      fetchData(value);
    }, 500);

    // Clear timeout if component unmounts or search changes
    return () => clearTimeout(timeoutId);
  };

  const onDelete = async (id) => {
    setLoading(true);
    try {
      const res = await deleteUser(id);
      if (res.success) {
        setIsDelete(null);
        setData((prevData) => prevData.filter((user) => user._id !== id));
        toast.success("User Deleted Successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="user-list">
        <div className="user-head">
          <h4 className="main-head">User Management</h4>
          <button
            className="primary-btn"
            onClick={() => navigate("/create-new-user")}
          >
            <FaPlus /> <span>Create New User</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="search-container">
          <div className="search-wrapper">
            <CiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users by name, email, or username"
              className="search-input"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        <UserTable data={data} loading={loading} setIsDelete={setIsDelete} />
      </div>

      {isDelete && (
        <DeleteConfirmationPopup
          loading={loading}
          isOpen={isDelete}
          onClose={() => setIsDelete(null)}
          onConfirm={() => onDelete(isDelete)}
        />
      )}
    </Layout>
  );
};

export default Home;
