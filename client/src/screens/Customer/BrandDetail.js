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

const BrandDetailScreen = ({ route, navigation }) => {
  const image = route.params;

  console.log(route.params)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/api/products/`);
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  const handleProductPress = async (productId) => {
    navigation.navigate("ProductDetail", { productId });
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => {handleProductPress(item._id)}}>
      <Image source={{ uri: `${item.image }`}} style={styles.productImage} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>Price: Rs.{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image style={styles.imageBrand} source={{ uri: image }}></Image>
      <Text style={styles.brandName}>{products.length} Products in Stock</Text>
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
    marginBottom: 16,
    marginTop:20
  },
  imageBrand:{
    width:100,
    height:50,
    marginLeft:130,
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


export default BrandDetailScreen;
