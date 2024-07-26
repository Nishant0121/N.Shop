import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/landing";
import axios from "axios";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import { useContext } from "react";
import { AuthContext } from "./context/user.contex.jsx";
import Layout from "./layout.jsx";
import Products from "./pages/products.jsx";
import Account from "./pages/account.jsx";
import Product from "./components/productinfo.jsx";
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = "https://n-shop-0pqs.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="bg-white text-black">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={authUser ? <Layout /> : <Navigate to={"/login"} />}
        >
          <Route index element={<Home />} />
        </Route>
        <Route
          path="/about"
          element={authUser ? <Layout /> : <Navigate to={"/login"} />}
        >
          <Route index element={<h1>About</h1>} />
        </Route>
        <Route
          path="/products"
          element={authUser ? <Layout /> : <Navigate to={"/login"} />}
        >
          <Route index element={<Products />} />
        </Route>

        <Route
          path="/account"
          element={authUser ? <Layout /> : <Navigate to={"/login"} />}
        >
          <Route index element={<Account />} />
        </Route>

        <Route
          path="/product/:productId"
          element={authUser ? <Layout /> : <Navigate to={"/login"} />}
        >
          <Route index element={<Product />} />
        </Route>

        <Route
          path="/login"
          element={authUser ? <Navigate to={"/home"} /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to={"/home"} /> : <Register />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
