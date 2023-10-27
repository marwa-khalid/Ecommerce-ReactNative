import React from 'react';
import Table from '../Table/OrdersTable'
import './page.css'

const Orders = () => {
  return (
    <div className="heading">
      <h1>Orders</h1>
      <Table/>
    </div>
  );
};

export default Orders;
