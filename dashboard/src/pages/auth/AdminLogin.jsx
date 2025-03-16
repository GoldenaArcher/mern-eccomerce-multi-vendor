import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/img/logo.png";

import { useAdminLoginMutation } from "../../store/features/authApi";

const overrideStyle = {
  display: "flex",
  margin: 0,
  height: "24px",
  justifyContent: "center",
  alignItem: "center",
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminLogin, { isLoading, isSuccess, isError, error, data, reset }] =
    useAdminLoginMutation();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    return () => reset();
  }, [reset]);

  useEffect(() => {
    if (isError) {
      toast.error(error.data);
      reset();
    }
  }, [error, isError, reset]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      navigate("/");
    }
  }, [data, isSuccess, navigate]);

  const onChangeState = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminLogin(state).unwrap();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img className="w-full h-full" src={Logo} alt="easy-shop" />
            </div>
          </div>

          <form autoComplete="off" onSubmit={onSubmit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                required
                autoComplete="off"
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                onChange={onChangeState}
                value={state.email}
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
                autoComplete="off"
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                onChange={onChangeState}
                value={state.password}
              />
            </div>

            <button
              className="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <PropagateLoader cssOverride={overrideStyle} color="#fff" />
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
