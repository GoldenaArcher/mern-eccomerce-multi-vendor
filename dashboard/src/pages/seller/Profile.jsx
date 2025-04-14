import React, { useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { useSelector } from "react-redux";
import _ from "lodash";
import toast from "react-hot-toast";

import FormInput from "../../components/shared/FormInput";
import { getBackendUrl } from "../../utils/envUtils";
import { useGetShopForCurrentSellerQuery } from "../../store/features/shopApi";
import OverlayLoader from "../../components/shared/loaders/OverlayLoader";
import ProfileInfoCard from "./components/ProfileInfoCard";
import { useUpdateSellerProfileMutation } from "../../store/features/userApi";
import { useGetCurrentSellerQuery } from "../../store/features/authApi";

const Profile = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [displayedImg, setDisplayedImg] = useState("");

  const { refetch, isLoading: isRefetchingSeller } = useGetCurrentSellerQuery();

  const { data: shopInfo, isLoading: isGetLoading } =
    useGetShopForCurrentSellerQuery(undefined, {
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: false,
    });

  const [
    updateSellerProfile,
    {
      isLoading: isUpdateSellerProfileLoading,
      isSuccess: isUpdateSellerProfileSuccess,
      isError: isUpdateSellerProfileError,
      error: updateSellerProfileError,
    },
  ] = useUpdateSellerProfileMutation();

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(displayedImg);
    };
  }, [displayedImg]);

  useEffect(() => {
    if (isUpdateSellerProfileSuccess) {
      toast.success("Profile updated successfully");
      refetch();
    }
  }, [isUpdateSellerProfileSuccess, refetch]);

  useEffect(() => {
    if (isUpdateSellerProfileError) {
      toast.error(updateSellerProfileError?.data?.message);
    }
  }, [isUpdateSellerProfileError, updateSellerProfileError]);

  const onAddProfile = async (e) => {
    if (e.target?.files?.length > 0) {
      const formData = new FormData();
      const file = e.target.files[0];
      setDisplayedImg(URL.createObjectURL(file));
      formData.append("image", file);
      try {
        await updateSellerProfile(formData).unwrap();
      } catch (error) {
        toast.error(
          updateSellerProfileError?.data?.message || "Failed to update"
        );
      }
    }
  };

  return (
    <div className="px-2 lg:px-7 py-5 text-[#d0d2d6]">
      <div className="block md:flex space-x-0 md:space-x-6">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
            <div className="flex justify-center items-center py-3">
              {userInfo?.image || displayedImg ? (
                <label
                  className=" h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden"
                  htmlFor="img"
                >
                  <img
                    src={displayedImg || `${getBackendUrl()}${userInfo.image}`}
                    alt="user-profile"
                  />
                  {isUpdateSellerProfileLoading ||
                    (isRefetchingSeller && <OverlayLoader />)}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <FaFileImage />
                  </span>
                  <span>Select Image</span>
                  {isRefetchingSeller && <OverlayLoader />}
                </label>
              )}
              <input
                type="file"
                name="img"
                id="img"
                className="hidden"
                accept="image/*"
                onChange={onAddProfile}
              />
            </div>

            <div className="px-0 md:px-5 py-2">
              <ProfileInfoCard
                editable={true}
                onEdit={() => {}}
                data={[
                  { label: "Name", value: userInfo.name },
                  { label: "Email", value: userInfo.email },
                  { label: "Role", value: _.upperFirst(userInfo.role) },
                  { label: "Status", value: _.upperFirst(userInfo.status) },
                  {
                    label: "Payment Account",
                    value:
                      userInfo.status === "active"
                        ? userInfo.payment
                        : "Click Active",
                    className:
                      userInfo.status === "active"
                        ? "bg-green-500"
                        : "bg-blue-500",
                  },
                ]}
              />
            </div>

            <div className="px-0 md:px-5 py-2">
              {isGetLoading && <OverlayLoader />}
              {_.isEmpty(shopInfo) ? (
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
                <ProfileInfoCard
                  editable={true}
                  onEdit={() => {}}
                  data={[
                    { label: "Shop Name", value: shopInfo.name },
                    { label: "Country", value: shopInfo.country },
                    { label: "State/Province", value: shopInfo.state },
                    { label: "City", value: shopInfo.city },
                  ]}
                />
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
