import React from "react";
import "../styles/user-table.css";
import { useNavigate } from "react-router-dom";

const UserTable = ({ data, setIsDelete, loading}) => {
  const navigate = useNavigate();
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading ? <div className="loader"></div>
        :
        <tbody>
          {data &&
            data.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="name">
                    <img src={user.images[0]} className="img"></img>
                    <p>{user.name}</p>
                    </div>
                </td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => navigate(`/edit-user/${user._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => setIsDelete(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
}
      </table>
    </div>
  );
};

export default UserTable;
