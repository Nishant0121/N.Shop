import { useState, useContext, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/user.contex.jsx";
import { initializeCashfree } from "../cashfree/util.js"; // Update import
import axios from "axios";
import toast from "react-hot-toast";

export default function OrderSummary() {
  const { state } = useLocation();
  const { orderData } = state || {};
  const [address, setAddress] = useState(orderData?.shippingAddress || {});
  const [phoneNumber, setPhoneNumber] = useState("");
  const { authUser } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sessionID, setSessionID] = useState("");
  const [, setError] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGetId = useCallback(async () => {
    if (!authUser) {
      toast.error("You need to log in to proceed with the payment");
      return;
    }

    try {
      const res = await axios.post("/api/interaction/payment/orderID", {
        customer_email: authUser.email,
        customer_phone: phoneNumber,
        customer_name: authUser.username,
        order_amount: orderData.totalAmount,
      });
      setSessionID(res.data.payment_session_id);
      console.log(res.data.payment_session_id); // Log the session ID
    } catch (error) {
      setError(error.message);
    }
  });

  const handelPayment = async () => {
    const cashfree = await initializeCashfree();
    let checkoutOptions = {
      paymentSessionId: sessionID,
      returnUrl: `https://n-shop-lyart.vercel.app/payment/{order_id}`,
    };
    cashfree.checkout(checkoutOptions).then(function (result) {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log("Redirection");
      }
    });
  };

  useEffect(() => {
    if (!sessionID) {
      handleGetId();
    }
  }, [handleGetId, phoneNumber, sessionID]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch product details for all items in the order
        const productPromises = orderData.items.map((item) =>
          axios.get(`/api/product/${item.productId}`)
        );
        const responses = await Promise.all(productPromises);
        const fetchedProducts = responses.map((response) => response.data);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };
    fetchProducts();
  }, [orderData.items]);

  if (!orderData) {
    return (
      <div className="flex items-center justify-center min-h-[100vh]">
        <p>Invalid order data.</p>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!authUser) {
      toast.error("You need to log in to place an order");
      return;
    }

    const finalOrderData = {
      ...orderData,
      shippingAddress: address,
      phoneNumber: phoneNumber,
    };

    try {
      handelPayment();
      await axios.post("/api/interaction/createorder", finalOrderData);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  console.log(sessionID);

  return (
    <div className="min-h-[100vh] p-2">
      <h1 className="text-3xl font-bold mb-2">Order Summary</h1>
      <div className=" p-2 grid grid-cols-1 md:grid-cols-2 gap-3 rounded bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="mb-5">
            <h2 className=" font-semibold">Shipping Address</h2>
            <textarea
              className="w-full border bg-white rounded p-2"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              placeholder="Street"
            />
            <input
              className="w-full border bg-white rounded p-2 mt-2"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              placeholder="City"
            />
            <input
              className="w-full border bg-white rounded p-2 mt-2"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              placeholder="State"
            />
            <input
              className="w-full border bg-white rounded p-2 mt-2"
              value={address.postalCode}
              onChange={(e) =>
                setAddress({ ...address, postalCode: e.target.value })
              }
              placeholder="Postal Code"
            />
            <input
              className="w-full border bg-white rounded p-2 mt-2"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              placeholder="Country"
            />
          </div>
          <div className="mb-5">
            <h2 className=" font-semibold">Phone Number</h2>
            <input
              className="w-full border bg-white rounded p-2"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
            <div className="flex flex-col items-start justify-between mt-5">
              <h2 className="text-xl font-semibold mb-1 ">Payment Details</h2>
              <h2 className="text-lg ">
                Total Amount: ₹{orderData.totalAmount}
              </h2>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center min-h-[100vh]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          products.map((product, index) => {
            const item = orderData.items.find(
              (i) => i.productId === product._id
            );
            return (
              <div
                key={index}
                className="mb-5 p-5 border-l-primary md:border-4 border-0 md:border-y-0 md:border-r-0 bg-white"
              >
                <img
                  className="w-full h-56 object-scale-down mb-3"
                  src={product.imageUrl ? product.imageUrl : product.image}
                  alt={product.title}
                />
                <div className="">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p>Brand: {product.brand}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Price: ₹{item.price}
                    {item.quantity > 1 ? "(Per Piece)" : ""}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-center ">
        <button
          className="bg-blue-500 w-full hover:bg-blue-700 text-white my-3 font-bold py-2 px-4 rounded"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
