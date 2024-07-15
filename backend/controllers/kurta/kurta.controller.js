import Kurtas from "../../model/kurta.model.js";

export const getKurtasByColor = async (req, res) => {
  const { color } = req.params; // Assuming color is passed as a URL parameter

  try {
    const products = await Kurtas.find({ color });

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
