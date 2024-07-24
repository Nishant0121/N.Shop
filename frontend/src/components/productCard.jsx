/* eslint-disable react/prop-types */

export default function ProductCard({ product }) {
  // Truncate a string to a specified length and append ellipsis if necessary
  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  // Use product.image or fallback to product.imageUrl
  const image = product.image || product.imageUrl;
  const title = truncateString(product.title, 25);

  return (
    <div className="w-full h-[250px] md:h-[300px] relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <img
          className="p-2 h-[200px] md:h-[250px] w-full object-cover rounded-lg"
          src={image}
          alt={title}
        />
      </div>
      <div className="absolute bottom-0 w-full px-2 pb-2 bg-white dark:bg-gray-800">
        <div>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {product.price}
          </span>
          <button
            onClick={() => alert("Added to cart")} // Use onClick for button actions
            className="text-white rounded-lg px-2 py-2 bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
}
