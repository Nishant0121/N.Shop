import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/user.contex";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useContext(AuthContext);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/logout");
      console.log(response);
      localStorage.removeItem("n.shop-user-info");
      setAuthUser(null);
      navigate("/login");
      toast.success("Logout successfully");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response && error.response.data
          ? error.response.data
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[100vh]">
      <div>home</div>
      <pre>{JSON.stringify(authUser, null, 2)}</pre>
      <button onClick={handleLogout}>
        {" "}
        {loading ? "LoggingOut" : "LogOut"}{" "}
      </button>
    </div>
  );
}
