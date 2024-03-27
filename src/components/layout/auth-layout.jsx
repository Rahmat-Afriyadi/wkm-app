import React from "react";



export default function AuthLayout({ title, description, children }) {
  return (
    <>
      <div className="-mt-8 flex flex-col justify-center min-h-full py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex">
            <p className="text-lg">WKM</p>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
