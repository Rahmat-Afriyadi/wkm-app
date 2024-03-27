"use client";

import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";

export default function LayoutAuth({ children }) {
  const segment = useSelectedLayoutSegment();
  let title = {
    login: "Sign in to your account",
  };

  return (
    <>
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            {title[segment]}
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
      </div>
    </>
  );
}
