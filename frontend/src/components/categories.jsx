import { Link } from "react-router-dom";
import kurtas from "../assets/kurtas.jpg";
import tshirt from "../assets/tshirt.avif";
import { useContext } from "react";
import { AuthContext } from "../context/user.contex";

export default function Categories() {
  const { setActiveLink } = useContext(AuthContext);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className=" w-full mt-3">
      <div className=" text-lg font-semibold">Shop With Categories</div>
      <div className=" mt-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-3">
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-center bg-green-100">
            <img src={tshirt} alt="Red Dress" />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-700">
              Red Dress - 30% off
            </h3>
            <p className="text-gray-500 mb-2">Was: $100, Now: $70</p>
            <Link
              to={"/products"}
              className="w-full mt-2 bg-primary text-white py-2 px-3  rounded hover:bg-blue-600 transition-colors duration-200"
              onClick={() => handleLinkClick("/products")}
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-center bg-green-100">
            <img src={tshirt} alt="Red Dress" />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-700">
              Best Offers On T-Shirts
            </h3>
            <p className="text-gray-500 mb-2">New arrivals</p>
            <Link
              to={"/products"}
              className="w-full mt-2 bg-primary text-white py-2 px-3  rounded hover:bg-blue-600 transition-colors duration-200"
              onClick={() => handleLinkClick("/products")}
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-center bg-green-100">
            <img src={kurtas} alt="Red Dress" />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-700">
              Kurtas At High Discount
            </h3>
            <p className="text-gray-500 mb-2">Upto 70%off</p>
            <Link
              to={"/products"}
              className="w-full mt-2 bg-primary text-white py-2 px-3  rounded hover:bg-blue-600 transition-colors duration-200"
              onClick={() => handleLinkClick("/products")}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
