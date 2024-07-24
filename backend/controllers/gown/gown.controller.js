import Gowns from "../../model/gown.model.js";

export const getGownsByColor = async (req, res) => {
  const { color } = req.params; // Assuming color is passed as a URL parameter

  try {
    const products = await Gowns.find({ color });

    if (!products) {
      return res
        .status(404)
        .json({ message: "No products found with that color" });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getGown = async (req, res) => {
  try {
    const products = await Gowns.find();

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
