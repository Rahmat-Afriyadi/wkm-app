import React from "react";
import { PulseLoader, BarLoader } from "react-spinners";

export default function LoadingPage() {
  return (
    <>
      <div
        className="flex items-center justify-center p-5 bg-gray-100 min-w-screen"
        style={{ minHeight: "calc(100vh - 64px * 2)" }}>
        <div className="flex space-x-2 animate-pulse">
          <PulseLoader color="#0891B2" width={1000} speedMultiplier={0.5} />
        </div>
      </div>
    </>
  );
}
