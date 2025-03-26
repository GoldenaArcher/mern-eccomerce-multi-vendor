import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuthRedirect = () => {
  const { accessToken, isAdmin, isSeller } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (accessToken && (isAdmin || isSeller)) {
      if (isAdmin) {
        if (!location.pathname.startsWith("/admin")) {
          navigate("/admin/dashboard");
        }
      } else if (isSeller) {
        if (!location.pathname.startsWith("/seller")) {
          navigate("/seller/dashboard");
        }
      }
    }
  }, [accessToken, isAdmin, isSeller, navigate, location]);
};
