import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

import FormInput from "../../components/shared/FormInput";
import { useSellerRegisterMutation } from "../../store/features/authApi";
import { ButtonLoader } from "../../components/shared/loaders";

const Register = () => {
  const navigate = useNavigate();
  const [
    sellerRegister,
    { isLoading, isSuccess, isError, error, data, reset },
  ] = useSellerRegisterMutation();

  const [state, setState] = useState({
    name: "",
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
      await sellerRegister(state).unwrap();
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <h2 className="text-xl mb-3 font-bold">Welcome to Ecommerce</h2>
          <p className="text-sm mb-3 font-medium">
            Please register your account
          </p>

          <form onSubmit={onSubmit} autoComplete="off">
            <FormInput
              label={"Name"}
              name="name"
              placeholder="Name"
              required
              onChange={onChangeState}
              value={state.name}
              wrapperClassName="mb-3"
            />
            <FormInput
              label={"Email"}
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={onChangeState}
              value={state.email}
              wrapperClassName="mb-3"
            />
            <FormInput
              label={"Password"}
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={onChangeState}
              value={state.password}
              wrapperClassName="mb-3"
            />

            <div className="flex items-center w-full gap-3 mb-3">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="checkbox">
                I agree to privacy policy & terms
              </label>
            </div>

            <button
              className="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoader /> : "Sign Up"}
            </button>

            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already have an account?{" "}
                <Link className="font-bold" to="/login">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="flex w-[10%] justify-center items-center">
                <span className="pb-1">or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <div className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <FaGoogle />
                </span>
              </div>
              <div className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <FaFacebook />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
