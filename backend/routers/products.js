import express from "express";
import { getKurtasByColor } from "../controllers/kurta/kurta.controller.js";
import { getAllProducts } from "../controllers/product/product.controller.js";
import { getGownsByColor } from "../controllers/gown/gown.controller.js";

const router = express.Router();

router.get("/allproducts", getAllProducts);

router.get("/gown/color/:color", getGownsByColor);

router.get("/kurta/color/:color", getKurtasByColor);

export default router;
