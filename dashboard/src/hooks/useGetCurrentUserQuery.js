import { useSelector } from "react-redux";
import {
  useGetCurrentAdminQuery,
  useGetCurrentSellerQuery,
} from "../store/features/authApi";

export const useGetCurrentUserQuery = () => {
  const { role, createdAt } = useSelector((state) => state.auth.userInfo);

  const shouldFetchAdmin = role === "admin" && !createdAt;
  const shouldFetchSeller = role === "seller" && !createdAt;

  const adminQuery = useGetCurrentAdminQuery(undefined, {
    skip: !shouldFetchAdmin,
  });

  const sellerQuery = useGetCurrentSellerQuery(undefined, {
    skip: !shouldFetchSeller,
  });

  return role === "admin" ? adminQuery : sellerQuery;
};
