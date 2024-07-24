import Gowns from "../../model/gown.model.js";
import Kurtas from "../../model/kurta.model.js";
import Menshirt from "../../model/shirt.model.js";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export const getAllProducts = async (req, res) => {
  try {
    // Use Promise.all to fetch data in parallel
    const [gowns, kurtas, menshirt] = await Promise.all([
      Gowns.find({}).lean(),
      Kurtas.find({}).lean(),
      Menshirt.find({}).lean(),
    ]);

    // Concatenate the results into a single array
    const allProducts = [...gowns, ...kurtas, ...menshirt];
    const randomProducts = shuffleArray(allProducts);
    res.json(randomProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    // Attempt to find the product in the Gowns collection
    let product = await Gowns.findById(productId).lean();

    // If not found in Gowns, attempt to find the product in the Kurtas collection
    if (!product) {
      product = await Kurtas.findById(productId).lean();
    }
    if (!product) {
      product = await Menshirt.findById(productId).lean();
    }

    // If the product is still not found, return a 404 error
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If the product is found, return it
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProductsByDiscount = async (req, res) => {
  const { discount } = req.params;
  try {
    // Use Promise.all to fetch data in parallel with a discount greater than 80%
    const [gowns, kurtas, menshirt] = await Promise.all([
      Gowns.find({ disscount: { $gt: `${discount}% off` } }).lean(),
      Kurtas.find({ disscount: { $gt: `${discount}% off` } }).lean(),
      Menshirt.find({ disscount: { $gt: `${discount}% off` } }).lean(),
    ]);

    // Concatenate the results into a single array
    const allProducts = [...gowns, ...kurtas, ...menshirt];
    const randomProducts = shuffleArray(allProducts);
    res.json(randomProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
