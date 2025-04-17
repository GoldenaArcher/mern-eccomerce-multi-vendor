import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import InfoCard from "../../components/shared/InfoCard";
import StatusBadge from "../../components/shared/StatusBadge";
import {
  useGetSellerByIdQuery,
  useUpdateSellerByIdMutation,
  useUpdateSellerStatusMutation,
} from "../../store/features/sellerApi";
import OverlayLoader from "../../components/shared/loaders/OverlayLoader";
import { getBackendUrl } from "../../utils/envUtils";

const SellerDetails = () => {
  const { sellerId } = useParams();

  const [status, setStatus] = useState("");

  const { data: sellerInfo, isLoading: isGetSellerLoading } =
    useGetSellerByIdQuery({ id: sellerId, shop: true });

  useEffect(() => {
    if (sellerInfo?.data?.status) {
      setStatus(sellerInfo?.data?.status);
    }
  }, [sellerInfo]);

  const [
    updateSellerStatus,
    {
      isLoading: isUpdateSellerLoading,
      isSuccess: isUpdateSellerSuccess,
      isError: isUpdateSellerError,
      error: updateSellerError,
    },
  ] = useUpdateSellerStatusMutation();

  const onUpdateSellerStatus = async (e) => {
    e.preventDefault();
    if (!status) {
      toast.error("Please select a status");
      return;
    }
    await updateSellerStatus({ id: sellerId, status });
  };

  useEffect(() => {
    if (isUpdateSellerSuccess) {
      toast.success("Seller status updated successfully");
    }
  }, [isUpdateSellerSuccess]);

  useEffect(() => {
    if (isUpdateSellerError) {
      toast.error(updateSellerError?.data?.message);
    }
  }, [isUpdateSellerError, updateSellerError]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Seller Details</h1>
      {isGetSellerLoading || isUpdateSellerLoading ? (
        <OverlayLoader />
      ) : (
        <div className="bg-[#6a5fdf] w-full p-4 rounded-md">
          <div className="w-full flex flex-wrap text-[#d0d2d6] justify-between">
            <div className="w-3/12 flex justify-center items-center py-3">
              <div className="">
                {sellerInfo?.data?.image ? (
                  <img
                    src={`${getBackendUrl()}${sellerInfo.data.image}`}
                    alt="seller-profile"
                    className="w-full h-[230px]"
                  />
                ) : (
                  "User Profile Image Not Found"
                )}
              </div>
            </div>

            <div className="w-4/12">
              <div className="px0 md:px-5 py-2">
                <div className="py-2 text-lg">Basic Info</div>
              </div>
              <InfoCard
                editable={false}
                isDark={false}
                data={[
                  { label: "Name", value: sellerInfo?.data?.name },
                  { label: "Email", value: sellerInfo?.data?.email },
                  {
                    label: "Role",
                    value: _.upperFirst(sellerInfo?.data?.role),
                  },
                  {
                    label: "Status",
                    value: <StatusBadge status={sellerInfo?.data?.status} />,
                  },
                  {
                    label: "Payment Status",
                    value: (
                      <StatusBadge status={sellerInfo?.data?.paymentStatus} />
                    ),
                  },
                ]}
              />
            </div>
            <div className="w-4/12">
              <div className="px0 md:px-5 py-2">
                <div className="py-2 text-lg">Address</div>
              </div>
              <InfoCard
                editable={false}
                isDark={false}
                data={[
                  { label: "Shop Name", value: sellerInfo?.data?.shop?.name },
                  { label: "Country", value: sellerInfo?.data?.shop?.country },
                  {
                    label: "State/Province",
                    value: sellerInfo?.data?.shop?.state,
                  },
                  { label: "City", value: sellerInfo?.data?.shop?.city },
                ]}
              />
            </div>
          </div>

          <form onSubmit={onUpdateSellerStatus}>
            <div className="flex gap-4 py-3 text-[#d0d2d6]">
              <select
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md "
                name="update-status"
                id="update-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                type="text"
              >
                <option value="">-- Select Status --</option>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>

              <button
                className="bg-red-500 shadow-lg hover:bg-red-500/40 px-4 py-2 cursor-pointer rounded-md text-sm w-[170px]"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SellerDetails;
