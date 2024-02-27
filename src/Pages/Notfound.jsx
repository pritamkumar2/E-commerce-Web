import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-yellow-500 text-white">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg">Oops! Looks like you're lost.</p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4">
          Let's get you back{" "}
          <NavLink to="/" className="text-blue-500 hover:underline">
            home
          </NavLink>
          .
        </p>
      </div>
    </>
  );
}
