import React from "react";

const ChatSupport = () => {
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex size-full relative">
          <div className="w-full md:pl-4">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <div className="relative">
                  <img
                    src="http://localhost:3000/dummy"
                    alt="seller-profile"
                    className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <h2 className="text-base text-white font-semibold">Support</h2>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                <div className="w-full flex justify-start items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div className="">
                      <img
                        src="http://localhost:3000/demo"
                        alt="seller-profile"
                        className="w-[38px] h-[38px] rounded-full border-2 border-white max-w-[38px] p-[3px]"
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                      <span>How are you</span>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-end items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div className="flex justify-center items-start flex-col w-full bg-red-500 shadow-lg shadow-red-500/50 text-white py-1 px-2 rounded-sm">
                      <span>How are you</span>
                    </div>
                    <div className="">
                      <img
                        src="http://localhost:3000/demo"
                        alt="user-profile"
                        className="w-[38px] h-[38px] rounded-full border-2 border-white max-w-[38px] p-[3px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-start items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div className="">
                      <img
                        src="http://localhost:3000/demo"
                        alt="seller-profile"
                        className="w-[38px] h-[38px] rounded-full border-2 border-white max-w-[38px] p-[3px]"
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                      <span>Need some help</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form className="flex gap-3">
              <input
                type="text"
                className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]"
                name="mesage"
                id="message"
                placeholder="Input your message"
              />
              <input
                type="button"
                value="Send"
                className="shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
