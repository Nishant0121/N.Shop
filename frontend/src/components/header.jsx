import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/user.contex";

export default function Header() {
  // State to keep track of the active link
  const { activeLink, setActiveLink } = useContext(AuthContext);

  // Function to handle the link click and set the active link
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <nav className="flex items-center justify-between w-full p-0 mb-3 z-50 bg-white">
      <div className="flex-1">
        <a className="text-xl font-bold">N.Shop</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 p-0">
          <li className="hidden md:grid grid-cols-4 gap-2">
            <Link
              to="/home"
              className={`p-0 px-2.5 py-1.5 hover:bg-primary rounded-none flex items-center justify-center ${
                activeLink === "/home"
                  ? "border-b-4 hover:bg-white hover:text-black border-primary"
                  : ""
              }`}
              onClick={() => handleLinkClick("/home")}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`p-0 px-2.5 py-1.5 hover:bg-primary rounded-none flex items-center justify-center ${
                activeLink === "/about"
                  ? "border-b-4 hover:bg-white hover:text-black border-primary"
                  : ""
              }`}
              onClick={() => handleLinkClick("/about")}
            >
              About
            </Link>
            <Link
              to={"/products"}
              className={`p-0 px-2.5 py-1.5 hover:bg-primary rounded-none flex items-center justify-center ${
                activeLink === "/products"
                  ? "border-b-4 hover:bg-white hover:text-black border-primary"
                  : ""
              }`}
              onClick={() => handleLinkClick("/products")}
            >
              Products
            </Link>
            <div
              className={`p-0 px-2.5 py-1.5 hover:bg-primary rounded-none flex items-center justify-center ${
                activeLink === "/contact"
                  ? "border-b-4 hover:bg-white hover:text-black border-primary"
                  : ""
              }`}
            >
              Contact
            </div>
          </li>
          <li className="flex md:hidden">
            <details>
              <summary>Menu</summary>
              <ul className="bg-white shadow-md rounded-t-none p-2">
                <li>
                  <Link
                    to="/home"
                    className={`p-0 px-2.5 py-1.5 hover:bg-primary rounded-none flex items-center justify-center ${
                      activeLink === "/home"
                        ? "border-b-4 hover:bg-white hover:text-black border-primary"
                        : ""
                    }`}
                    onClick={() => handleLinkClick("/home")}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`p-0 px-2.5 py-1.5 hover:bg-primary rounded-none flex items-center justify-center ${
                      activeLink === "/about"
                        ? "border-b-4 hover:bg-white hover:text-black border-primary"
                        : ""
                    }`}
                    onClick={() => handleLinkClick("/about")}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/products"}
                    className={`p-0 px-2.5 py-1.5 hover:bg-primary rounded-none flex items-center justify-center ${
                      activeLink === "/products"
                        ? "border-b-4 hover:bg-white hover:text-black border-primary"
                        : ""
                    }`}
                    onClick={() => handleLinkClick("/products")}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <div
                    className={`p-0 px-2.5 py-1.5 hover:bg-primary rounded-none flex items-center justify-center ${
                      activeLink === "/contact"
                        ? "border-b-4 hover:bg-white hover:text-black border-primary"
                        : ""
                    }`}
                  >
                    Contact
                  </div>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </nav>
  );
}
