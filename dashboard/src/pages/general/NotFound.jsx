import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-slate-100 px-6 py-16 text-center text-slate-700">
    <p className="text-5xl font-bold text-indigo-600">404</p>
    <h1 className="text-3xl font-semibold">Page not found</h1>
    <p>The page you’re looking for doesn’t exist.</p>
    <Link
      to="/"
      className="rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
    >
      Back to home
    </Link>
    <Link to="/admin/login" className="font-semibold text-indigo-600 underline">
      Go to admin login
    </Link>
  </main>
);

export default NotFound;
