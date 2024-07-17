import axios from "axios";
import { useEffect, useState } from "react";

export default function DisProduct() {
  const discount = 80;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getproduct = async () => {
      try {
        const res = await axios.get(`/api/product/top/discount/${discount}`);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getproduct();
  }, []);

  return (
    <div>
      <h1 className=" text-xl font-semibold m-2">Top Sellers</h1>
      <div className="flex overflow-x-auto space-x-4">
        {products.slice(0, 7).map((product, index) => (
          <div
            key={index}
            className="relative rounded-lg shadow-md h-[220px] w-[170px] flex-shrink-0"
          >
            <img
              className="object-scale-down h-full w-full"
              src={product.image} // Assuming 'image' is the correct field name for the product image
              alt={product.title} // Assuming 'title' is the correct field name for the product title
            />
            <div className="absolute bottom-0 w-full bg-slate-300 rounded-b-lg p-2">
              <h1 className="text-lg">{product.brand}</h1>
              <div>
                <p className="font-normal bg-primary py-1 text-center px-2 rounded-full">
                  {product.disscount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
