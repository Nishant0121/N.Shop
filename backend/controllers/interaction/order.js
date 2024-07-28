import Order from "../../model/order.model.js";
import axios from "axios";

export const putOrder = async (req, res) => {
  const {
    userId,
    items,
    totalAmount,
    paymentMethod,
    shippingAddress,
    phoneNumber,
  } = req.body;
  try {
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      paymentMethod,
      shippingAddress,
      phoneNumber,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const getOrderID = async (req, res) => {
  const { customer_email, customer_phone, customer_name, order_amount } =
    req.body;

  const data = {
    customer_details: {
      customer_id: "34235" + Date.now(),
      customer_email: customer_email,
      customer_phone: customer_phone,
      customer_name: customer_name,
    },
    order_meta: {
      notify_url: "https://webhook.site/4337deba-99f1-4373-897c-67d370f00f46",
      payment_methods: "cc,dc,upi",
    },
    order_id: "75475" + Date.now(),
    order_amount: order_amount,
    order_currency: "INR",
    order_note: "test Order",
  };

  const config = {
    method: "post",
    url: "https://sandbox.cashfree.com/pg/orders",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-version": "2023-08-01",
      "x-client-id": "TEST102716040fba0fd7b29b31b7d32440617201",
      "x-client-secret":
        "cfsk_ma_test_34307765c69df686db83691bba1a863d_7bd9e6e9",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the order.");
  }
};

export const checkStatus = async (req, res) => {
  const { order_id } = req.params;
  const config = {
    method: "GET",
    url: `https://sandbox.cashfree.com/pg/orders/${order_id}`,
    headers: {
      accept: "application/json",
      "x-api-version": "2023-08-01",
      "x-client-id": "TEST102716040fba0fd7b29b31b7d32440617201",
      "x-client-secret":
        "cfsk_ma_test_34307765c69df686db83691bba1a863d_7bd9e6e9",
    },
  };

  try {
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while checking the order status.");
  }
};
