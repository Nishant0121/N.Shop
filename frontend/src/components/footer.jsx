export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto text-center">
        <div className="mb-6">
          <p className="text-xl font-semibold mb-4">
            Subscribe to our newsletter
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Input your email"
              className="p-2 rounded-l-md bg-gray-800 border border-gray-700 text-white"
            />
            <button className="p-2 rounded-r-md bg-purple-600 hover:bg-purple-700 text-white">
              Subscribe
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4  mb-6">
          <a href="#" className="text-gray-400 hover:text-white">
            Pricing
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            About us
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Features
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Help Center
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Contact us
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            FAQs
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Careers
          </a>
        </div>
        <div className="mb-3">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white ml-4">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white ml-4">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white ml-4">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <div className="text-gray-400">
          <p>
            © 2022 Brand, Inc. •{" "}
            <a href="#" className="hover:text-white">
              Privacy
            </a>{" "}
            •{" "}
            <a href="#" className="hover:text-white">
              Terms
            </a>{" "}
            •{" "}
            <a href="#" className="hover:text-white">
              Sitemap
            </a>
          </p>
        </div>
        <div className="mt-4">
          <select className="bg-gray-800 border border-gray-700 text-white p-2 rounded-md">
            <option>English</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
