import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  brand: { type: String, required: true },
  title: { type: String, required: true },
  color: { type: String, required: true },
  discountedPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  discountPercent: { type: Number, required: true },
  size: [sizeSchema],
  quantity: { type: Number, required: true },
  topLevelCategory: { type: String, required: true },
  secondLevelCategory: { type: String, required: true },
  thirdLevelCategory: { type: String, required: true },
  description: { type: String, required: true },
});

// Create a model using the schema
const Menshirt = mongoose.model("Menshirt", productSchema);

export default Menshirt;
