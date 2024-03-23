"use client"

import { useDocumentTitle } from "@/hooks";

// import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function TitlePage({ title }) {
  // useDocumentTitle(`${title} | Admin Metrodata Academy`);
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {capitalize(title)}
      </h2>
    </div>
  );
}
