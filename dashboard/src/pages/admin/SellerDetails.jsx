import React from "react";

const SellerDetails = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Seller Details</h1>
      <div className="bg-[#6a5fdf] w-full p-4 rounded-md">
        <div className="w-full flex flex-wrap text-[#d0d2d6] justify-between">
          <div className="w-3/12 flex justify-center items-center py-3">
            <div className="">
              <img
                src="http://localhost:3000/demo"
                alt="seller-profile"
                className="w-full h-[230px]"
              />
            </div>
          </div>

          <div className="w-4/12">
            <div className="px0 md:px-5 py-2">
              <div className="py-2 text-lg">Basic Info</div>
            </div>
            <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md font-bold text-black">
              <div className="flex gap-2">
                <span>Name: </span>
                <span>Demo Demo</span>
              </div>
              <div className="flex gap-2">
                <span>Email: </span>
                <span>test@123.com</span>
              </div>
              <div className="flex gap-2">
                <span>Role: </span>
                <span>Seller</span>
              </div>
              <div className="flex gap-2">
                <span>Status: </span>
                <span>Active</span>
              </div>
              <div className="flex gap-2">
                <span>Payment Status: </span>
                <span>Active</span>
              </div>
            </div>
          </div>
          <div className="w-4/12">
            <div className="px0 md:px-5 py-2">
              <div className="py-2 text-lg">Address</div>
            </div>
            <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md font-bold text-black">
              <div className="flex gap-2">
                <span>Shop Name: </span>
                <span>Demo Demo</span>
              </div>
              <div className="flex gap-2">
                <span>Country: </span>
                <span>United States</span>
              </div>
              <div className="flex gap-2">
                <span>State/Province: </span>
                <span>California</span>
              </div>
              <div className="flex gap-2">
                <span>City: </span>
                <span>Alameda</span>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <form>
            <div className="flex gap-4 py-3 text-[#d0d2d6]">
              <select
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md "
                name=""
                id=""
              >
                <option value="">-- Select Status --</option>
                <option value="active">active</option>
                <option value="deactive">deactive</option>
              </select>

              <button className="bg-red-500 shadow-lg hover:bg-red-500/40 px-4 py-2 cursor-pointer rounded-md text-sm w-[170px]">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
