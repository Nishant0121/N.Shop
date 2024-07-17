import express from "express";
import {
  getKurtas,
  getKurtasByColor,
} from "../controllers/kurta/kurta.controller.js";
import {
  getAllProducts,
  getProduct,
  getProductsByDiscount,
} from "../controllers/product/product.controller.js";
import {
  getGown,
  getGownsByColor,
} from "../controllers/gown/gown.controller.js";

const router = express.Router();

router.get("/allproducts", getAllProducts);

router.get("/:productId", getProduct);

router.get("/gown/color/:color", getGownsByColor);

router.get("/type/kurta", getKurtas);

router.get("/type/gown", getGown);

router.get("/kurta/color/:color", getKurtasByColor);

router.get("/top/discount/:discount", getProductsByDiscount);

export default router;
