import React from "react";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Table.css";

const BasicTable = () => {

  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.user);
  const email = user.email;

useEffect(() => {
  axios.get(`http://localhost:5002/api/orders`)
    .then(response => {
      setOrders(response.data);
      
    })
    .catch(error => {
    
    });
}, []);

const columns = [
  {
    name: "rowNumber",
    label: "Order",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <span>{tableMeta.rowIndex + 1}</span>
      ),
    },
  },
  
    {
      name: "products",
      label: "Products",
      options: {
        customBodyRender: (products) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {products.map((product, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={`http://localhost:5002/${product.image}`}
                    alt={product.title}
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '20px',
                      height: '20px',
                      background: '#3b3e41',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: "10px",
                      color: '#fff',
                    }}
                    className="p-2">
                    {product.quantity}
                  </div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  {product.title}
                </div>
              </div>
            ))}
          </div>
        ),
      },
    },    
  {
    name: "amount",
    label: "Total Price",
  },
  {
    name: "status",
    label: "Status",
  },
  {
    name: "address",
    label: "Address",
  },
  {
    name: "createdAt",
    label: "Order Date",
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
  <div className="Table" >
    <MUIDataTable 
      title=""
      data={orders}
      columns={columns}
      options={options}
    />
  </div>
);

}

export default BasicTable;
