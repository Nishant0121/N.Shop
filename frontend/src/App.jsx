import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/landing";
import axios from "axios";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home.jsx";

axios.defaults.baseURL = "https://n-shop-0pqs.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className=" bg-white text-black">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
