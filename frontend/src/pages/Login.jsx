import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    const user = {
      email: email.value,
      password: password.value,
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, user);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
        toast.success("Logged in successfully");
      } else {
        toast.error("User does not exist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again!");
    }
  };

  return (
    <div className="h-screen w-screen dark:bg-[#32353F]">
      <Toaster />
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        <div className="mt-12 md:mt-0">
          <a href="/">
            <h3 className="text-4xl font-bold text-black">
              Dev's - Forum
            </h3>
          </a>
        </div>
        <div
          className="w-[90%] md:w-full bg-red-500 text-white dark:bg-red-500 dark:text-white border px-6 py-4 mt-6 overflow-hidden shadow-md sm:max-w-md rounded-2xl"
        >
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="border border-white-200 mt-2 w-full h-10 px-3 rounded outline-none shadow-sm text-black"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="border border-white-200 mt-2 w-full h-10 px-3 rounded outline-none shadow-sm text-black"
              />
            </div>

            <div className="mt-8 flex flex-col items-center justify-center">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-black border border-transparent rounded-md active:bg-gray-900 false"
              >
                Login
              </button>
              <a
                className="text-sm text-white underline hover:text-gray-200 pt-2"
                href="/register"
              >
                Don't have an account? Please Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
