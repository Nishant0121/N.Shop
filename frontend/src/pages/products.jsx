import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard.jsx";

export default function Products() {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const handleCategoryChange = (type) => {
    setCategory(type);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchProducts = async (url) => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    if (category === "all") {
      fetchProducts("/api/product/allproducts");
    } else if (category === "gowns") {
      fetchProducts("/api/product/type/gown");
    } else if (category === "kurtas") {
      fetchProducts("/api/product/type/kurta");
    } else if (category === "shirts") {
      fetchProducts("/api/product/type/shirt");
    }

    window.scrollTo(0, 0);
  }, [category, currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="min-h-screen max-w-[1000px] mx-auto flex flex-col items-center">
      {/* Category Selector */}
      <div className="flex justify-center items-center space-x-4 mt-4 mb-4">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`${
            category === "all" ? "bg-blue-500" : "bg-gray-300"
          } px-4 py-2 rounded`}
        >
          All
        </button>
        <button
          onClick={() => handleCategoryChange("kurtas")}
          className={`${
            category === "kurtas" ? "bg-blue-500" : "bg-gray-300"
          } px-4 py-2 rounded`}
        >
          Kurtas
        </button>
        <button
          onClick={() => handleCategoryChange("gowns")}
          className={`${
            category === "gowns" ? "bg-blue-500" : "bg-gray-300"
          } px-4 py-2 rounded`}
        >
          Gowns
        </button>
        <button
          onClick={() => handleCategoryChange("shirts")}
          className={`${
            category === "shirts" ? "bg-blue-500" : "bg-gray-300"
          } px-4 py-2 rounded`}
        >
          Shirts
        </button>
      </div>

      {/* Products */}
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4 mb-4">
        {Array.from({
          length: Math.ceil(products.length / productsPerPage),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-2 py-1 mx-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
