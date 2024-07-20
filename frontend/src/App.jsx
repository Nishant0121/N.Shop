import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/landing";
import axios from "axios";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/user.contex.jsx";

axios.defaults.baseURL = "https://n-shop-0pqs.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <div className=" bg-white text-black">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route
          path="/home"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/home"} /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to={"/home"} /> : <Register />}
        />
      </Routes>
    </div>
  );
}

export default App;
