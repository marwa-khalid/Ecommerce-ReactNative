import React, { useState, useEffect } from "react";
import "./Table.css";
import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';


export default function BasicTable() {
  const [userList, setUserList] = useState([]);
  const [showOptions, setShowOptions] = useState({});
  const [isAddBrandModalOpen, setAddBrandModalOpen] = useState(false);

  const [newBrandData, setNewBrandData] = useState({
    email: "",
    password: "",
    brandName: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/brands");
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddBrandClick = () => {
    setAddBrandModalOpen(true);
  };

  const handleModalClose = () => {
    setAddBrandModalOpen(false);
  };

  const handleBrandDataChange = (e) => {
    const { name, value } = e.target;
    setNewBrandData({ ...newBrandData, [name]: value });
  };

  const handleAddBrand = async () => {
    try {
      // Send the new brand data to the backend
      const response = await axios.post("http://localhost:5002/api/brands", newBrandData);

      // Close the modal and clear the form
      setAddBrandModalOpen(false);
      setNewBrandData({ email: "", password: "", brandName: "" });

      // Fetch updated user list
      await fetchUsers();
      console.log("Brand added successfully");
    } catch (error) {
      console.log("Error adding brand:", error);
    }
  };

  const columns = [
    {
      name: "_id",
      label: "Id",
      options: {},
    },
    {
        name:"image",
        label:"Image",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => (
              <img src={value} alt="Brand" style={{ width: "50px" }} />
            ),
          },
    },
    {
      name: "brandName",
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
      <button onClick={handleAddBrandClick}>Add Brand</button>
    
      {isAddBrandModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Add Brand</h2>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={newBrandData.email}
              onChange={handleBrandDataChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newBrandData.password}
              onChange={handleBrandDataChange}
            />
            <input
              type="text"
              name="brandName"
              placeholder="Brand Name"
              value={newBrandData.brandName}
              onChange={handleBrandDataChange}
            />
            <button onClick={handleAddBrand}>Add</button>
          </div>
        </div>
      )}

      <MUIDataTable
        title=""
        data={userList}
        columns={columns}
        options={options}
      />
    </div>
  );
}
