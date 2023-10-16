import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { addToCart } from "../../features/BasketSlice";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native";

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("XS");
  const [quantity, setQuantity] = useState(1); // Initial quantity
  const [isWishlist, setIsWishlist] = useState(false);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const dispatch = useDispatch();

  const handleWishlist = async () => {
    try {
      const response = await axios.post(`https://off-api.vercel.app/api/wishlist/${productId}`);
      if (response.status === 200) {
        setIsWishlist(!isWishlist);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://off-api.vercel.app/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: `${product.image}` }} style={styles.productImage}>
        <TouchableOpacity style={styles.wishlistIcon} onPress={handleWishlist}>
          <FontAwesome name={isWishlist ? "heart" : "heart-o"} size={24} color="red" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.productInfoRow}>
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productPrice}>Price: Rs.{product.price}</Text>
      </View>
      <ScrollView>
      <View style={styles.sizeRow}>
        <Text>Select Size:</Text>
        <View style={styles.sizeButtons}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size ? styles.selectedSize : null
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={styles.sizeButtonText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.quantityRow}>
        <Text>Quantity: {quantity}</Text>
        <View style={styles.quantityButtons}>
          <TouchableOpacity onPress={decrementQuantity}>
            <FontAwesome name="minus" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={incrementQuantity}>
            <FontAwesome name="plus" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.heading}>Description:</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(addToCart({ ...product, quantity }))}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  quantityButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  productImage: {
    width: "100%",
    height: 500, // Adjust the height to fit your design
    resizeMode: "cover",
    position: "relative", 
    borderRadius:10
  },
  wishlistIcon: {
    position: "absolute",
    top: 16, 
    right: 16, 
    zIndex: 1, 
  },
  productInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 18,
  },
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  sizeButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  sizeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  selectedSize: {
    backgroundColor: "grey", // Highlighted color
    borderColor: "grey", // Highlighted border color
    color:"white"
  },
  sizeButtonText: {
    fontSize: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    color:"grey"
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 150,
    shadowColor: "#BD8853",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3, 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign:"center"
  },
});

export default ProductDetailScreen;
