import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputBox from "../utils/InputBox";
import { signin } from "../BackendAsService/features.js";
import { getEmployeeData } from "../BackendAsService/Crud.js";

function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signin({
        email: formData.email,
        password: formData.password,
      });

      if (res.user) {
        const userData = await getEmployeeData({ uid: res.user.uid });
        if (userData.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("userData", JSON.stringify(userData.data));
          navigate("/dashboard");
        } else {
          toast.error("Failed to fetch user data. Please sign in again.");
        }
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error); // More descriptive logging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="h-screen bg-no-repeat bg-cover flex relative p-3 justify-center items-center font-serif w-full">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="md:bg-white/30 bg-black/40 shadow-inner md:backdrop-blur-xl border border-white/30 shadow-gray-700 py-10 px-2 flex flex-col justify-center md:px-10 rounded-3xl">
          <h3 className="text-xl text-center">
            Welcome Again to <span className="text-orange-800">HRMS</span>
          </h3>
          <img className="h-36 w-36 self-center" src="/avatar.png" alt="Avatar" />
          <InputBox
            inputroleimage="/mail-fill.svg"
            value={formData.email}
            onChange={handleChange}
            className="mt-5"
            required
            InputStyle="w-80 p-3 outline-none"
            placeholder="Enter Email"
            type="email"
            name="email"
          />
          <InputBox
            inputroleimage="/key-fill.svg"
            value={formData.password}
            onChange={handleChange}
            className="mt-5 mb-2"
            required
            InputStyle="w-80 p-3 outline-none"
            placeholder="Enter Password"
            type="password"
            name="password"
          />
          <div className="">Didn’t Have an Account? Contact the admin</div>
          {loading ? (
            <div className="spinner place-self-center mt-5 md:mt-10"></div>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-fit cursor-pointer mt-5 rounded-xl text-white hover:text-black self-center text-center transition duration-300 ease-out hover:bg-white py-2 px-5 bg-black"
              disabled={loading} // Disable button while loading
            >
              Login
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default Login;
