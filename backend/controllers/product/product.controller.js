import Gowns from "../../model/gown.model.js";
import Kurtas from "../../model/kurta.model.js";

export const getAllProducts = async (req, res) => {
  try {
    // Use Promise.all to fetch data in parallel
    const [gowns, kurtas] = await Promise.all([
      Gowns.find({}).lean(), // Use .lean() for better performance if you don't need Mongoose features
      Kurtas.find({}).lean(),
    ]);

    // Concatenate the results into a single array
    const allProducts = [...gowns, ...kurtas];

    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
