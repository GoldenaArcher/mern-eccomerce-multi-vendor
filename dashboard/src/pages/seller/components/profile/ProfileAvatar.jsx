import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaFileImage } from "react-icons/fa";
import toast from "react-hot-toast";
import { OverlayLoader } from "@mern/ui";

import { getBackendUrl } from "../../../../utils/envUtils";
import { useGetCurrentSellerQuery } from "../../../../store/features/authApi";
import { useUpdateSellerAvatarMutation } from "../../../../store/features/userApi";

const Avatar = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [displayedImg, setDisplayedImg] = useState("");

  const { refetch, isLoading: isRefetchingSeller } = useGetCurrentSellerQuery();

  const [
    updateSellerProfile,
    {
      isLoading: isUpdateAvatarLoading,
      isSuccess: isUpdateAvatarSuccess,
      isError: isUpdateAvatarError,
      error: updateAvatarError,
    },
  ] = useUpdateSellerAvatarMutation();

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(displayedImg);
    };
  }, [displayedImg]);

  useEffect(() => {
    if (isUpdateAvatarSuccess) {
      toast.success("Profile updated successfully");
      refetch();
    }
  }, [isUpdateAvatarSuccess, refetch]);

  useEffect(() => {
    if (isUpdateAvatarError) {
      toast.error(updateAvatarError?.data?.message);
    }
  }, [isUpdateAvatarError, updateAvatarError]);

  const onAddProfile = async (e) => {
    if (e.target?.files?.length > 0) {
      const formData = new FormData();
      const file = e.target.files[0];
      setDisplayedImg(URL.createObjectURL(file));
      formData.append("image", file);
      try {
        await updateSellerProfile(formData).unwrap();
      } catch (error) {
        toast.error(updateAvatarError?.data?.message || "Failed to update");
      }
    }
  };

  return (
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
          {isUpdateAvatarLoading || (isRefetchingSeller && <OverlayLoader />)}
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
  );
};

export default Avatar;
