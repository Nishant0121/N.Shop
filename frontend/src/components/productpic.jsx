import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductPic() {
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
    <div className="flex overflow-x-auto rounded-lg mt-4 shadow-md border-t">
      <div className="flex space-x-4 max-w-[1000px] h-fit rounded-lg ">
        {products.slice(0, 7).map((product, index) => (
          <div
            key={index}
            className="flex-shrink-0  w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5"
          >
            <img
              className="h-[200px] md:h-[300px] w-full object-cover rounded-lg"
              src={product.image} // Assuming 'image' is the correct field name for the product image
              alt={product.title} // Assuming 'title' is the correct field name for the product title
            />
          </div>
        ))}
      </div>
    </div>
  );
}
