import React, { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginImage from "../assets/img/shutter-speed-ZOdMXpVUjqA-unsplash.jpg";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const onChangeLoginInput = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onLogin = (e) => {
    e.preventDefault();
  };

  return (
    <main className="bg-slate-200 mt-4">
      <div className="w-full justify-center items-center p-10">
        <div className="grid grid-cols-2 w-3/5 mx-auto bg-white rounded-md">
          <div className="p-8">
            <h2 className="text-center w-full text-xl text-slate-600 font-bold">
              Login
            </h2>

            <form
              className="text-slate-600 "
              autoComplete="off"
              onSubmit={onLogin}
            >
              <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:outline-none focus:ring focus:ring-slate-100 focus:border-[#059474]"
                  autoComplete="off"
                  value={state.email}
                  onChange={onChangeLoginInput}
                />
              </div>
              <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:outline-none focus:ring focus:ring-slate-100 focus:border-[#059474]"
                  autoComplete="off"
                  value={state.password}
                  onChange={onChangeLoginInput}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="px-8 py-2 w-full bg-[#059474] text-white rounded-md shadow-lg hover:shadow-green-600/50"
              />
            </form>

            <div className="flex justify-center items-center py-2">
              <div className="h-px bg-slate-300 w-[95%]"></div>
              <span className="px-3 text-slate-600">Or</span>
              <div className="h-px bg-slate-300 w-[95%]"></div>
            </div>

            <div className="">
              <button
                type="submit"
                value="Login"
                className="px-8 py-2 w-full bg-[rgb(24,119,242)] text-white rounded-md shadow-lg hover:shadow-[rgb(24,119,242,0.8)] flex gap-2 justify-center items-center my-4"
              >
                <span>
                  <FaFacebookF />
                </span>
                <span>Login with Facebook</span>
              </button>

              <button
                type="submit"
                value="Login"
                className="px-8 py-2 w-full bg-[rgb(229,62,48)] text-white rounded-md shadow-lg hover:shadow-[rgb(229,62,48,0.8)] flex gap-2 justify-center items-center my-4"
              >
                <span>
                  <FaGoogle />
                </span>
                <span>Login with Facebook</span>
              </button>
            </div>

            <div className="text-center text-slate-600 pt-1">
              <p>
                Doesn't have an account?
                <Link
                  to={"/register"}
                  className="text-blue-600 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>

          <div className="size-full py-4 pr-4">
            {/* img accreditted: https://unsplash.com/photos/a-stack-of-colorful-blocks-with-social-icons-on-them-ZOdMXpVUjqA */}
            <img
              src={LoginImage}
              alt="login-img"
              className="h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
