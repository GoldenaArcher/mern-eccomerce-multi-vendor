import React from "react";
import { FaEdit, FaFileImage } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import FormInput from "../../components/shared/FormInput";

const Profile = () => {
  const img = true;
  const loader = false;
  const status = "active";
  const userInfo = false;

  return (
    <div className="px-2 lg:px-7 py-5 text-[#d0d2d6]">
      <div className="block md:flex space-x-0 md:space-x-6">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
            <div className="flex justify-center items-center py-3">
              {img ? (
                <label
                  className=" h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden"
                  htmlFor="img"
                >
                  <img src="http://localhost:3000/broken" alt="user-profile" />
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                  htmlFor="'img"
                >
                  <span>
                    <FaFileImage />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input type="file" name="img" id="img" className="hidden" />
            </div>

            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-700 rounded-md relative">
                <div className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </div>

                <div className="flex gap-2">
                  <p>
                    <span>Name: </span>
                    <span>Test</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <p>
                    <span>Email: </span>
                    <span>test@123.com</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <p>
                    <span>Role: </span>
                    <span>Seller</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <p>
                    <span>Status: </span>
                    <span>Active</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <p>
                    <span>Payment Account: </span>
                    <span
                      className={`${
                        status === "active" ? "bg-green-500" : "bg-blue-500"
                      } text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5`}
                    >
                      {status === "active" ? "Pending" : "Click Active"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="px-0 md:px-5 py-2">
              {userInfo ? (
                <form>
                  <FormInput
                    label="Shop Name"
                    name="shop"
                    id="shop"
                    placeholder="Shop Name"
                  />
                  <FormInput
                    label="Country"
                    name="country"
                    id="country"
                    placeholder="Country"
                  />
                  <FormInput
                    label="State/Province"
                    name="state"
                    id="state"
                    placeholder="State/Province"
                  />
                  <FormInput
                    label="City"
                    name="city"
                    id="city"
                    placeholder="City"
                  />
                  <input
                    type="button"
                    value="Save Changes"
                    className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2"
                  />
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-700 rounded-md relative">
                  <div className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaEdit />
                  </div>

                  <div className="flex gap-2">
                    <p>
                      <span>Shop Name: </span>
                      <span>Test</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p>
                      <span>Country: </span>
                      <span>United State</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p>
                      <span>State/Province: </span>
                      <span>California</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p>
                      <span>City: </span>
                      <span>Los Angeles</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full mt-6 md:mt-0 bg-[#6a5fdf] rounded-md p-4">
            <form>
              <FormInput
                label="Email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <FormInput
                label="Old Password"
                type="password"
                name="o_password"
                id="o_password"
                placeholder="Old Password"
              />
              <FormInput
                label="New Password"
                type="password"
                name="n_password"
                id="n_password"
                placeholder="New Password"
              />
              <input
                type="button"
                value="Save Changes"
                className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
