import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const WishlistScreen = ({ route, navigation }) => {
  const brand = route.params;

  console.log(route.params)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch products of the selected brand using the brandId
      const response = await axios.get(`http://localhost:5002/api/wishlist/`);
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  const handleProductPress = async (productId) => {
    // Navigate to the product detail screen and pass the product ID as a parameter
    navigation.navigate("ProductDetail", { productId });
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => {handleProductPress(item._id)}}>
      <Image source={{ uri: `http://localhost:5002/${item.image }`}} style={styles.productImage} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>Price: Rs.{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.brandName}>{products.length} item in your wishlist</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderProductCard}
        contentContainerStyle={styles.productList}
        numColumns={2} 
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
  brandName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  productCard: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "transparent",
    margin: 8,
    padding: 16,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode:"contain"
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
  },
  productList: {
    paddingBottom: 16,
  },
});


export default WishlistScreen;
