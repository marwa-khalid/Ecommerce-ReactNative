import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [tableHead, setTableHead] = useState(['Order', 'Product', 'Quantity', 'Total', 'Status', 'Brand']);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Make an API request to fetch user orders
    axios.get('http://localhost:5002/api/orders')
      .then((response) => {
        // Assuming the API response is an array of orders
        setOrders(response.data);

        // Create the data for the table
        const data = response.data.map((order,index) => {
            const products = order.products.map((product) => product.title).join(', ');
            return [
              (index + 1).toString(),
              products,
              order.products.reduce((total, product) => total + product.quantity, 0), // Total quantity
              `Rs ${order.amount}`,
              order.status,
              order.brand,
            ];
          });
        setTableData(data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Rows data={tableData} textStyle={styles.text} />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 3 },
});

export default OrdersScreen;
