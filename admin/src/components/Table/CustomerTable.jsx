import React, { useState, useEffect } from "react";
import "./Table.css";
import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';

const makeStyle = (status) => {
  if (status === "approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function BasicTable() {
  const [userList, setUserList] = useState([]);
  const [showOptions, setShowOptions] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://off-api.vercel.app/api/users/"); 
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditStatus = (userId) =>{
    // Toggle the showOptions for a specific user
    setShowOptions({
      ...showOptions,
      [userId]: !showOptions[userId],
    });
  }

  const handleApprove = async (userId) => {
    try {
      const status = "approved"
      const response = await axios.put(`https://off-api.vercel.app/api/users/${userId}/approve`, { status });
      await fetchUsers();
      console.log("Status updated successfully");
    } catch (error) {
      console.log("Error updating user status:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      // Implement the logic to delete the user by making an HTTP DELETE request
      const response = await axios.delete(`https://off-api.vercel.app/api/users/${userId}`);
      console.log("User deleted successfully");
      // You can also update the user list in state to reflect the deletion
      // fetchUsers();
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const columns = [
    {
      name: "_id",
      label: "Id",
      options: {
       
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "createdAt",
      label: "Date-Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="status" style={makeStyle(value)}>
              {value}
            </span>
            {value === "pending" && (
              <>
                <EditIcon
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={() => handleEditStatus(tableMeta.rowData[0])}
                />
                {showOptions[tableMeta.rowData[0]] && (
                  <div className="options-container">
                    <button onClick={() => handleApprove(tableMeta.rowData[0])}>Approve</button>
                    <button onClick={() => handleDelete(tableMeta.rowData[0])}>Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        ),
      },
    },
  ];

  const options = {
    filter: true,
    filterType: "textField", 
    responsive: "standard",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
  };

  return (
    <div className="Table">
      <MUIDataTable
        title=""
        data={userList}
        columns={columns}
        options={options}
      />
    </div>
  );
}
