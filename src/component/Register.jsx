import React from "react";
import { ToastContainer, toast } from "react-toastify";
import InputBox from "../utils/InputBox";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../BackendAsService/features";
function Register() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setFile(e.target.files);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(image);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(file);

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      file === null
    ) {
      toast.error("Please Enter all the Required Field");
    } else {
      console.log("file before sign",file);
      
      setLoading(true);
      const res = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: file[0],
      }).finally(() => setLoading(false));
      console.log(res);
      if (res === "auth/email-already-in-use")
        toast.error("This Email is Already in Use");
      else if (res === "auth/weak-password") {
        toast.error("Plese Enter a Strong password");
      }
      else if (res === "auth/invalid-email") {
        toast.error("Plese Enter a Valid");
      
      } else if (res) {
        toast.success("Register Successfull");
      } else {
        toast.error("Something Went wrong");
      }
    }

    // console.log(res.FireBaseError.FireBase);
    // if(res.Firebase.Error){
    // }
  };
  return (
    <div>
      <main  className=" bg-no-repeat bg-cover  flex relative p-3 justify-center items-center font-serif w-full">
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
        <div className="md:bg-white/30 bg-black/40 shadow-inner md:backdrop-blur-xl border border-white/30  shadow-gray-700  py-5 px-2 flex flex-col justify-center md:px-10 rounded-3xl">
          <h3 className="text-xl  text-center">
Create a Employee          </h3>
          <div className="flex justify-center  my-5">
            <label className="cursor-pointer flex flex-col items-center gap-3" htmlFor="profile">
              {file ? (
                <img
                  className="bg-white p-2 rounded-full w-24 h-24"
                  src={previewURL}
                />
              ) : (
                <img
                  className="bg-white p-2 rounded-full w-24 h-24"
                  src="/user-line.svg"
                  alt=""
                />
              )}
              Select his/her Profile Image
            </label>
            <input
              onChange={handleImageChange}
              className="hidden"
              type="file"
              id="profile"
            />
          </div>
          <InputBox
            value={formData.name}
            onChange={handleChange}
            className="mt-5"
            required
            InputStyle="w-80 p-3 outline-none"
            placeholder="Enter Name"
            type="text"
            name="name"
            inputRoleImage="/user-3-fill.svg"
          />
          <InputBox
            value={formData.email}
            onChange={handleChange}
            className="mt-5"
            required
            InputStyle="w-80 p-3 outline-none"
            placeholder="Enter Email"
            type="email"
            name="email"
            inputRoleImage="/mail-fill.svg"
          />
          <InputBox
            value={formData.password}
            onChange={handleChange}
            className="mt-5 mb-2"
            required
            InputStyle="w-80 p-3 outline-none"
            placeholder="Enter Password"
            type="password"
            name="password"
            inputRoleImage="/key-fill.svg"
          />
         
          {loading ? (
            <div className="spinner place-self-center mt-5 md:mt-10"></div>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-fit cursor-pointer mt-5 rounded-xl self-center text-center  transition duration-300 ease-out hover:bg-white py-2 px-5  bg-sky-700"
            >
                Create
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default Register;
