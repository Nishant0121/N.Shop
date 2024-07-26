import Order from "../../model/order.model.js";

export const putOrder = async (req, res) => {
  const { userId, items, totalAmount, paymentMethod, shippingAddress } =
    req.body;
  try {
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      paymentMethod,
      shippingAddress,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
