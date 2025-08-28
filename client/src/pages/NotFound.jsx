import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <h1 className="text-9xl font-extrabold mb-4">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700">
        Oops! Page Not Found
      </p>
      <p className="mb-8 text-gray-500 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
