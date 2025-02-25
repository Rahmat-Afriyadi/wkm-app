import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useDebounce } from "../../lib/hooks/useDebounce";

export default function Search({ id, name, placeholder }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleChange(e) {
    const params = new URLSearchParams(searchParams);
    params.set("search_query", e.target.value.trim());
    params.set("page", 1);
    setTimeout(() => {}, 300);
    replace(`${pathname}?${params}`);
  }

  return (
    <>
      <label htmlFor={id} className="sr-only">
        Search
      </label>
      <div className="relative mt-1 rounded-md shadow-sm bg-red">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" aria-hidden="true">
          <MagnifyingGlassIcon className="w-4 h-4 mr-3 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="search"
          id={id}
          name={name}
          className="block w-full border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 pl-9 sm:text-sm"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
