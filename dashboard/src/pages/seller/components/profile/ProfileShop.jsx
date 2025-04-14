import React, { use, useEffect, useState } from "react";
import _ from "lodash";

import { useGetShopForCurrentSellerQuery } from "../../../../store/features/shopApi";
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

  useEffect(() => {
    if (!_.isEmpty(shopInfo)) {
      setState(shopInfo);
    }
  }, [shopInfo]);

  const onShopInfoChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="px-0 md:px-5 py-2">
      {isGetLoading && <OverlayLoader />}
      {_.isEmpty(shopInfo) ? (
        <form>
          <FormInput
            label="Shop Name"
            name="shop"
            id="shop"
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
  );
};

export default ProfileShop;
