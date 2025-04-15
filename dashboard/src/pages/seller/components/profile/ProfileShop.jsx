import React, { useEffect, useState } from "react";
import _ from "lodash";
import toast from "react-hot-toast";

import {
  useAddShopMutation,
  useGetShopForCurrentSellerQuery,
} from "../../../../store/features/shopApi";
import OverlayLoader from "../../../../components/shared/loaders/OverlayLoader";
import FormInput from "../../../../components/shared/FormInput";
import ProfileInfoCard from "../ProfileInfoCard";

const defaultShopInfo = {
  name: "",
  country: "",
  state: "",
  city: "",
};

const ProfileShop = () => {
  const [state, setState] = useState(defaultShopInfo);

  const { data: shopInfo, isLoading: isGetLoading } =
    useGetShopForCurrentSellerQuery(undefined, {
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: false,
    });

  const [
    addShop,
    {
      isLoading: isAddLoading,
      isSuccess: isAddSuccess,
      isError: isAddError,
      error: addError,
    },
  ] = useAddShopMutation();

  useEffect(() => {
    if (!_.isEmpty(shopInfo)) {
      setState(shopInfo.data);
    }
  }, [shopInfo]);

  useEffect(() => {
    if (isAddError) {
      toast.error(addError?.data?.message);
    }
  }, [isAddError, addError]);

  useEffect(() => {
    if (isAddSuccess) {
      toast.success("Shop info added successfully");
    }
  }, [isAddSuccess]);

  const onShopInfoChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdateShopInfo = async (e) => {
    e.preventDefault();

    if (!_.isEmpty(shopInfo)) {
      // TODO: Update shop info
    } else {
      await addShop(state).unwrap();
    }
  };

  return (
    <div className="px-0 md:px-5 py-2">
      {(isGetLoading || isAddLoading) && <OverlayLoader />}
      {_.isEmpty(shopInfo) ? (
        <form onSubmit={onUpdateShopInfo}>
          <FormInput
            label="Shop Name"
            name="name"
            id="name"
            placeholder="Shop Name"
            value={state.name}
            onChange={onShopInfoChange}
          />
          <FormInput
            label="Country"
            name="country"
            id="country"
            placeholder="Country"
            value={state.country}
            onChange={onShopInfoChange}
          />
          <FormInput
            label="State/Province"
            name="state"
            id="state"
            placeholder="State/Province"
            value={state.state}
            onChange={onShopInfoChange}
          />
          <FormInput
            label="City"
            name="city"
            id="city"
            placeholder="City"
            value={state.city}
            onChange={onShopInfoChange}
          />
          <input
            type="submit"
            value="Save Changes"
            className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2 cursor-pointer"
          />
        </form>
      ) : (
        <ProfileInfoCard
          editable={true}
          onEdit={() => {}}
          data={[
            { label: "Shop Name", value: state.name },
            { label: "Country", value: state.country },
            { label: "State/Province", value: state.state },
            { label: "City", value: state.city },
          ]}
        />
      )}
    </div>
  );
};

export default ProfileShop;
