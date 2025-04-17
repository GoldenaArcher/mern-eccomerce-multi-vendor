import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

import FormInput from "../../components/shared/FormInput";
import InfoCard from "../../components/shared/InfoCard";
import { ProfileAvatar, ProfileShop } from "./components/profile";
import StatusBadge from "../../components/shared/StatusBadge";

const Profile = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div className="px-2 lg:px-7 py-5 text-[#d0d2d6]">
      <div className="block md:flex space-x-0 md:space-x-6">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
            <ProfileAvatar />

            <div className="px-0 md:px-5 py-2">
              <InfoCard
                editable={true}
                onEdit={() => {}}
                data={[
                  { label: "Name", value: userInfo.name },
                  { label: "Email", value: userInfo.email },
                  { label: "Role", value: _.upperFirst(userInfo.role) },
                  {
                    label: "Status",
                    value: <StatusBadge status={userInfo.status} />,
                  },
                  {
                    label: "Payment Status",
                    value: <StatusBadge status={userInfo.paymentStatus} />,
                  },
                ]}
              />
            </div>

            <ProfileShop />
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
