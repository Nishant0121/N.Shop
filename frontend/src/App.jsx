import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/landing";
import axios from "axios";

axios.defaults.baseURL = "https://n-shop-0pqs.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className=" bg-white text-black">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </div>
  );
}

export default App;
