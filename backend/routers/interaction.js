import { putInCart } from "../controllers/interaction/cart.js";
import {
  getOrderID,
  putOrder,
  checkStatus,
} from "../controllers/interaction/order.js";
import express from "express";
const router = express.Router();

router.post("/addtocart", putInCart);
router.post("/createorder", putOrder);
router.post("/payment/orderID", getOrderID);
router.get("/payment/status/:order_id", checkStatus);

export default router;
