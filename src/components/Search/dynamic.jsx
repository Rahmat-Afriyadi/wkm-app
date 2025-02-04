import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Search({ id, name, placeholder }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleChange(e) {
    const params = new URLSearchParams(searchParams);
    params.set(name, e.target.value.trim());
    replace(`${pathname}?${params}`);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set(name, "");
    replace(`${pathname}?${params}`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <label htmlFor={id} className="sr-only">
        Search
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
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
