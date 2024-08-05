import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/user.contex.jsx"; // Ensure you have AuthContext set up
import toast from "react-hot-toast";

// Function to extract numeric value from a string with currency symbols
const extractNumericValue = (priceString) => {
  // Use a regular expression to extract the numeric part from the string
  const numericValue = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
  return isNaN(numericValue) ? 0 : numericValue;
};

export default function Product() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQantity] = useState(1);
  const { productId } = useParams();
  const { authUser } = useContext(AuthContext); // Assuming you have an AuthContext that provides user info
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!authUser) {
      toast.error("You need to log in to add to cart");
      return;
    }

    const price =
      typeof product.price === "string"
        ? extractNumericValue(product.discountedPrice || product.selling_price)
        : product.discountedPrice || product.selling_price;

    try {
      await axios.post("/api/interaction/addtocart", {
        userId: authUser._id,
        productId: product._id,
        quantity: quantity,
        price: price,
      });
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }

    console.log(price);
  };

  const handleBuyNow = () => {
    if (!authUser) {
      toast.error("You need to log in to place an order");
      return;
    }

    const price =
      typeof product.price === "string"
        ? extractNumericValue(product.discountedPrice || product.selling_price)
        : product.discountedPrice || product.selling_price;

    const orderData = {
      userId: authUser._id,
      items: [
        {
          productId: product._id,
          quantity: quantity,
          price: price,
        },
      ],
      totalAmount: price * quantity,
      paymentMethod: "UPI", // You can change this based on your actual payment method
      shippingAddress: {
        street: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400001",
        country: "India",
      },
    };

    navigate("/ordersummary", { state: { orderData } });
  };

  const handelQuantityIncrease = () => {
    setQantity((prev) => prev + 1);
  };
  const handelQuantityDecrease = () => {
    if (quantity > 1) {
      setQantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[100vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[100vh]">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] max-w-[1000px] mx-auto grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex items-center justify-center">
        <img
          className="rounded-lg"
          src={product.image ?? product.imageUrl}
          alt={product.title}
        />
      </div>
      <div className="mt-5 flex flex-col items-start justify-center">
        <h1 className="text-start text-xl my-3 font-bold">{product.brand}</h1>
        <h1 className="text-start text-3xl my-3 font-bold">{product.title}</h1>
        <h1 className="text-start text-2xl my-3 font-bold">
          {typeof product.price === "number" ? (
            <span>
              ₹
              {product.discountedPrice
                ? `${product.discountedPrice}`
                : `${product.selling_price}`}
            </span>
          ) : product.discountedPrice ? (
            `${product.discountedPrice}`
          ) : (
            `${product.selling_price}`
          )}
          <h1 className=" line-through  text-sm text-gray-700">
            {product.price}
          </h1>
        </h1>
        <div className="w-full border-2 my-3 rounded-full border-gray-400"></div>
        <h className="ml-3 mb-2 ">Quantity</h>
        <div className="flex items-center justify-start">
          <button
            className=" border bg-primary w-7 mx-3 rounded-lg"
            onClick={handelQuantityDecrease}
          >
            -
          </button>
          <h1 className="border px-2">{quantity}</h1>
          <button
            className=" border bg-primary w-7 mx-3 rounded-lg"
            onClick={handelQuantityIncrease}
          >
            +
          </button>
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            className="bg-primary w-full hover:bg-primary-dark text-black my-3 font-bold py-2 px-4 rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white my-3 font-bold py-2 px-4 rounded"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
