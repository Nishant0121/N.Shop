import Menshirt from "../../model/shirt.model.js";

export const getShirt = async (req, res) => {
  try {
    const products = await Menshirt.find();

    if (!products) {
      return res
        .status(404)
        .json({ message: "No products found with that color" });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server kurta Error" });
  }
};
