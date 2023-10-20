import React from 'react';
import { View, Text, StyleSheet ,Image, TextInput, FlatList, TouchableOpacity} from 'react-native';
import { useState,useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import Sidebar from '../CustomDrawerComponent';
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";

const CustomerScreen = ({navigation}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [image, setImage] = useState('null');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch products of the selected brand using the brandId
      const response = await axios.get(`https://off-api.vercel.app/api/products/`);
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  const handleProductPress = async (productId) => {
    // Navigate to the product detail screen and pass the product ID as a parameter
    navigation.navigate("ProductDetail", { productId });
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToBrandDetail = async () =>{
    setTimeout(() => {
      navigation.navigate("BrandDetail", image);
    }, 2000);
  }

  const openDrawer = () => {
    navigation.openDrawer();
  };
  

  const renderProductCard = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => {handleProductPress(item._id)}}>
      <Image source={{ uri: `${item.image}`}} style={styles.productImage} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>Price: Rs.{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={openDrawer}> 
          <FontAwesome name="bars" size={24} style={styles.icon} />
        </TouchableOpacity>
        {isSidebarOpen && <Sidebar />}
        
        <Text>Hello! Welcome to OFF!</Text>
       <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
       <FontAwesome name="shopping-cart" size={24} style={styles.icon} /></TouchableOpacity> 
      </View>
      <View style={styles.searchContainer}>
          <TextInput placeholder="Search..." style={styles.searchBar} value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}></TextInput>
          <FontAwesome name="search" size={20} style={styles.searchIcon} />
      </View>

      <View style={styles.brandsContainer}>
          <Text style={styles.brandtext} >Choose Brand</Text>
          <TouchableOpacity >
            <Text style={styles.viewalltext}>View All</Text>
            </TouchableOpacity>
      </View>

      <View style={styles.rowContainer}>
        <View  style={styles.brandsContainer2}>
          <Image
            style={styles.brandImage}
            source={{
              uri:
                'https://vectorseek.com/wp-content/uploads/2020/12/Khaadi-logo-vector-01-scaled.jpg',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setImage('https://vectorseek.com/wp-content/uploads/2020/12/Khaadi-logo-vector-01-scaled.jpg');
              navigateToBrandDetail(); // Removed the extra curly braces
            }}
            style={styles.viewBrand}
          >
            <Text style={styles.brandName}>Khaadi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.brandsContainer2}>
          <Image
            style={styles.brandImage}
            source={{
              uri:
                'https://www.shaditayari.pk/wp-content/uploads/Untitled-3-011-410x230.png',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setImage('https://www.shaditayari.pk/wp-content/uploads/Untitled-3-011-410x230.png');
              navigateToBrandDetail();
            }}
            style={styles.viewBrand}
          >
            <Text style={styles.brandName}>Maria B.</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.brandsContainer2}>
          <Image
            style={styles.brandImage}
            source={{
              uri:
                'data:image/png;base64,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',
            }}
          />
          <TouchableOpacity onPress={() =>  {setImage('data:image/png;base64,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');
          navigateToBrandDetail();
        }} 
          style={styles.viewBrand}>
            <Text style={styles.brandName}>Gul Ahmad</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.brandsContainer}>
          <Text style={styles.brandtext} >New Arrival</Text>
          <TouchableOpacity >
            <Text style={styles.viewalltext}>View All</Text>
            </TouchableOpacity>
      </View>

      {filteredProducts.length === 0 ? (
        <Text style={styles.noResultsText}>No products match your search.</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item._id}
          renderItem={renderProductCard}
          contentContainerStyle={styles.productList}
          numColumns={2}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    marginTop: 10,
  },
  rowContainer:{
    flexDirection:"row"
  },
  brandsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    marginTop: 10,
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
  viewBrand:{
    color: "#1D1E20",
    fontSize: 15,
    fontWeight: 500,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",

  },
  brandsContainer2:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:"#F5F5F5",
    width: 110,
    padding: 5,
    marginLeft:20,
    marginTop:15,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  brandImage:{
      overflow: "hidden",
      position: "relative",
      display: "flex",
      width: 40,
      flexDirection: "column",
      aspectRatio: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFF', 
  },
  icon: {
    backgroundColor: 'rgba(189, 136, 83, 1)',
    color:"#fff",
    padding:7,
    borderRadius:7
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
    padding: 5,
    marginLeft:25,
    width:300,
    color:'rgba(189, 136, 83, 1)',
    padding:7
  },
  brandtext: {
    marginLeft:25,
    fontSize:24,
    fontWeight:"bold",
    color:"black",
  },
  viewalltext: {
    marginRight:25,
    fontSize:15,
    fontWeight:"bold",
    color:"grey",
  },
  searchIcon: {
    color:"#fff",
    padding:10,
    backgroundColor: 'rgba(189, 136, 83, 1)', // Search icon color
    borderRadius:10,
    marginRight:20
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomerScreen;
