import { putInCart } from "../controllers/interaction/cart.js";
import { putOrder } from "../controllers/interaction/order.js";
import express from "express";
const router = express.Router();

router.post("/addtocart", putInCart);
router.post("/createorder", putOrder);

export default router;
