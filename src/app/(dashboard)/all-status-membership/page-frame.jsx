"use client";
import dynamic from "next/dynamic";
const Search = dynamic(() => import("@/components/Search/index"));
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// import Search from "@/components/Search/index";

export default function PageFrame({ children }) {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value == "") {
      const params = new URLSearchParams(searchParams);
      params.set("search_query", e.target.value.trim());
      params.set("page", 1);
      setTimeout(() => {}, 300);
      replace(`${pathname}?${params}`);
    }
  };

  const searchClickBUtton = () => {
    const params = new URLSearchParams(searchParams);
    params.set("search_query", search.trim());
    params.set("page", 1);
    setTimeout(() => {}, 300);
    replace(`${pathname}?${params}`);
  };

  return (
    <>
      <div className="grid mb-6 md:grid-cols-12">
        <div className="w-full col-span-8 mb-3">
          <p className="text-2xl font-bold">All Data Membership</p>
        </div>
        <div className="w-full col-span-8 mr-2 mt-2 flex justify-start items-end ">
          {/* <a
            href="/input-tanggal-merah/create"
            className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Create
          </a> */}

          {/* <Search id="search-query" name="search_query" placeholder={"Search..."} /> */}
          <label htmlFor={"search-query"} className="sr-only">
            Search
          </label>
          <div className="relative mt-1 rounded-md shadow-sm bg-red">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" aria-hidden="true">
              <MagnifyingGlassIcon className="w-4 h-4 mr-3 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="search"
              id={"search-query"}
              name={"search_query"}
              className="block w-full border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 pl-9 sm:text-sm"
              placeholder={"Search..."}
              onChange={handleChange}
            />
          </div>
          <div className="w-32 ml-2">
            <button
              onClick={searchClickBUtton}
              className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
          <div className="w-3"></div>
          {/* <div className="w-64">
            <Datepicker
              id={"range_tgl_merah"}
              toggleClassName="absolute rounded-r-lg -top-0 right-0 h-full px-3 text-black focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              inputClassName="block w-full border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 pl-4 sm:text-sm"
              name={"range_tgl_merah"}
              value={value}
              primaryColor={"amber"}
              onChange={handleValueChange}
            />
          </div> */}
        </div>
      </div>

      <div className="flex flex-col mt-3">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
