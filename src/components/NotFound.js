import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl sm:text-xl text-gray-700 mb-6">Oops! Page not found.</p>
        <p className="text-lg text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
