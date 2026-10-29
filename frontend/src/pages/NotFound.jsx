import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();
  const isAdminPath = /^\/admin(?:\/|$)/.test(pathname);
  const dashboardUrl = (
    process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3000"
  ).replace(/\/$/, "");

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-5 px-6 py-16 text-center text-slate-700">
      <p className="text-5xl font-bold text-[#059474]">404</p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      {isAdminPath && (
        <p>
          Looking for the admin portal?{" "}
          <a
            href={`${dashboardUrl}/admin/login`}
            className="font-semibold text-[#059474] underline"
          >
            Go to admin login
          </a>
        </p>
      )}
      <Link
        to="/"
        className="rounded-md bg-[#059474] px-6 py-3 font-semibold text-white hover:bg-emerald-700"
      >
        Back to home
      </Link>
    </main>
  );
};

export default NotFound;
