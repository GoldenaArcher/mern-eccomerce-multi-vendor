import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/img/logo.png";

import { useAdminLoginMutation } from "../../store/features/authApi";
import FormInput from "../../components/shared/FormInput";
import { ButtonLoader } from "@mern/ui";

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
      toast.error(error.data.message);
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
      console.error("Login failed: ", err);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img className="size-full" src={Logo} alt="easy-shop" />
            </div>
          </div>

          <form autoComplete="off" onSubmit={onSubmit}>
            <FormInput
              label="Email"
              name="email"
              type="text"
              placeholder="Email"
              value={state.email}
              onChange={onChangeState}
              wrapperClassName="mb-3"
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={onChangeState}
              wrapperClassName="mb-3"
            />

            <button
              className="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoader /> : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
