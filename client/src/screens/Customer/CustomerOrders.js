import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomerOrder = ({navigation}) => {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/orders");
        const ordersData = response.data;
  
        // // Filter orders based on userId
        // const filteredOrders = ordersData.filter(
        //   (order) => order.customerId === userId
        // );
  
        setOrders(ordersData);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };
  
    const renderOrder = ({ item }) => (
      <View style={styles.orderItem}>
        <Text style={styles.orderInfo}>Brand Name: {item.brand}</Text>
        <Text style={styles.orderInfo}>Placed at: {item.createdAt}</Text>
        <Text style={styles.orderInfo}>Total: Rs{item.amount}</Text>
        {item.products.map((product, index) => (
          <View key={index}>
            <Text style={styles.productInfo}>Product Title: {product.title}</Text>
            <Text style={styles.productInfo}>Quantity: {product.quantity}</Text>
          </View>
        ))}
      
    {item.status === "Processing" && (
      <Text style={{ fontSize: 16, marginBottom: 8, color: "red" }}>
        Status: {item.status}
      </Text>
    )}
    {item.status === "Preparing" && (
      <Text style={{ fontSize: 16, marginBottom: 8, color: "orange" }}>
        Status: {item.status}
      </Text>
    )}
    {item.status === "Picked up" && (
      <Text style={{ fontSize: 16, marginBottom: 8, color: "purple" }}>
        Status: {item.status}
      </Text>
    )}
    {item.status === "Delivered" && (
      <Text style={{ fontSize: 16, marginBottom: 8, color: "green" }}>
        Status: {item.status}
      </Text>
    )}
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Order History</Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrder}
          contentContainerStyle={styles.orderList}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#f9f9f9",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16,
    },
    orderList: {
      paddingBottom: 16,
    },
    orderItem: {
      marginBottom: 16,
      borderRadius: 8,
      backgroundColor: "#fff",
      padding: 16,
    },
    orderInfo: {
      fontSize: 16,
      marginBottom: 8,
    },
  });
  
  export default CustomerOrder;
  