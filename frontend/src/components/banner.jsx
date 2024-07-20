import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/user.contex.jsx";

export default function Banner() {
  const { authUser } = useContext(AuthContext);

  const pro = {
    _id: "669538fb6151682ef47ae05b",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/shopsy-gown/h/r/t/free-half-sleeve-semi-stitched-ngb-01-life-sky-original-imag3vxzhbj7rudx.jpeg?q=70",
    brand: "Zinariya Fab",
    title: "Net Semi Stitched Anarkali Gown",
    color: "Green",
    selling_price: "₹499",
    price: "₹3,099",
    disscount: "83% off",
    size: "",
  };
  const [product, setproduct] = useState(pro);
  const productIds = [
    "669538fb6151682ef47ae050",
    "669538fb6151682ef47ae05b",
    "669538fb6151682ef47ae05c",
    "669538fb6151682ef47ae05b",
    "669538fb6151682ef47ae054",
    "669538fb6151682ef47ae057",
    "669538fb6151682ef47ae056",
  ];

  useEffect(() => {
    const getproduct = async () => {
      try {
        const randomProductId =
          productIds[Math.floor(Math.random() * productIds.length)];

        const res = await axios.get(`/api/product/${randomProductId}`);
        setproduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getproduct();
  }, []);

  return (
    <div className="hero bg-transparent my-8">
      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="min-w-fit bg-white border border-gray-200 rounded-lg shadow-md ">
          <img
            className="rounded-xl mt-2 max-h-[150px] w-full object-scale-down"
            src={product?.image}
            alt=""
          />
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {product.brand}
              </h5>
            </a>
            <div className="grid grid-cols-2 gap-4">
              <p className="font-normal bg-primary py-1 text-center px-2 rounded-full">
                {product.disscount}
              </p>
              <p className="font-normal text-center bg-primary py-1 px-2 rounded-full">
                {product.selling_price}
              </p>
            </div>
            <p className=" text-gray-600 font-thin inset-x-1 top-1/2">
              {product.price}
            </p>
          </div>
        </div>

        <div>
          <h1 className="text-5xl font-bold">
            Discover, Style, and Purchase Effortlessly
          </h1>
          <p className="py-6">
            Curated collection with 7,000+ apparel items from 1,000+ brands
          </p>
          <Link
            to={authUser ? "/home" : "/login"}
            className="p-2 px-3 rounded-xl text-black border-none bg-primary"
          >
            Get Started
          </Link>
          <div className="grid items-start md:w-[70%] mt-4 grid-cols-3">
            <div className="flex flex-col items-center justify-center">
              <span className=" text-2xl">700+</span>
              <span className=" font-thin text-gray-500">Products</span>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-gray-500">
              <span className=" text-2xl">100+</span>
              <span className=" font-thin text-gray-500">Brands</span>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-gray-500">
              <span className=" text-2xl">10,000+</span>
              <span className=" font-thin text-gray-500">Coustomers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
