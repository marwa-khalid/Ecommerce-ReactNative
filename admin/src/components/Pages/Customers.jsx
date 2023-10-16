import React from 'react';
import Table from '../Table/CustomerTable'
import './page.css'

const Customers = () => {
  return (
    <div className="heading">
      <h1>Customers</h1>
      <Table/>
    </div>
  );
};

export default Customers;
