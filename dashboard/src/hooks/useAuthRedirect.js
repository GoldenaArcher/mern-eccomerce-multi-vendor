import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuthRedirect = () => {
  const { accessToken, isAdmin, isSeller } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!accessToken) return;

    const publicPaths = ["/login", "/register", "/"];
    const isOnPublicPage = publicPaths.includes(location.pathname);

    if (isOnPublicPage) {
      if (isAdmin) {
        navigate("/admin/dashboard", { replace: true });
      } else if (isSeller) {
        navigate("/seller/dashboard", { replace: true });
      }
    }
  }, [accessToken, isAdmin, isSeller, navigate, location.pathname]);
};
