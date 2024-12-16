import React from 'react';
import '../styles/user-table.css';

const UserTable = ({
    data, 
  onEdit = (user) => console.log('Edit', user),
  onDelete = (id) => console.log('Delete', id)
}) => {
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
        <tbody>
          {data && data.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="btn btn-edit" 
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-delete" 
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;