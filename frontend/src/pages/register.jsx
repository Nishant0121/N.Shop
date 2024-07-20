import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/user/register", inputs);
      console.log("Success:", response.data);
      navigate("/login");
      toast.success("Register successfully, Please Login..!");
      setLoading(false);
      // Handle successful registration (e.g., navigate to login, show success message)
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-lg border-t-slate-300 border shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-black "
            >
              Name
            </label>
            <input
              id="username"
              className=" bg-slate-200 text-black w-full p-2 rounded-lg"
              name="username"
              type="username"
              onChange={handleChange}
              placeholder="User Name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black "
            >
              Email address
            </label>
            <input
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              className=" bg-slate-200 text-black w-full p-2 rounded-lg"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              id="password"
              className=" bg-slate-200 text-black w-full p-2 rounded-lg"
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide bg-primary text-black rounded-lg"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
          <div className=" w-full justify-center items-center flex">
            <Link className="text-sm text-primary mt-4  w-full" to={"/login"}>
              Already have an Account. Click Here!
            </Link>
          </div>{" "}
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
