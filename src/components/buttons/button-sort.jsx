"use client"

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BtnSortBy({ name }) {

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    let sortField = searchParams.get("sortBy");

     const handleSortBy = (e) => {

        const params = new URLSearchParams(searchParams);

        const field = e.currentTarget.innerText;
        const arrow = e.currentTarget.querySelector('svg').getAttribute('aria-label');
        let direction = arrow === 'arrow-down' ? 'desc' : 'asc';
        let order = direction;
        const sorted = `${field}_${order}`
        if (sorted === sortField) {
          order = arrow === 'arrow-down' ? 'asc' : 'desc';
        }
        sortField =  field + "_" + order

        params.set("sortBy", sortField);
        replace(`${pathname}?${params}`);
    };


    if (name === sortField?.split("_")[0] && sortField?.split("_")[1] === 'asc') {
      return (
        <button onClick={(e) => handleSortBy(e)} className='group inline-flex'>
          {name}
          <span className='flex-none ml-2 text-gray-900 bg-gray-200 rounded group-hover:bg-gray-300'>
            <ChevronUpIcon className='h-5 w-5' aria-hidden='true' aria-label='arrow-up' />
          </span>
        </button>
      );
    } else if (name === sortField?.split("_")[0] && sortField?.split("_")[1] === 'desc') {
      return (
        <button onClick={(e) => handleSortBy(e)} className='group inline-flex'>
          {name}
          <span className='flex-none ml-2 text-gray-900 bg-gray-200 rounded group-hover:bg-gray-300'>
            <ChevronDownIcon className='h-5 w-5' aria-hidden='true' aria-label='arrow-down' />
          </span>
        </button>
      );
    } else {
      return (
        <button onClick={(e) => handleSortBy(e)} className='group inline-flex'>
          {name}
          <span className='invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible'>
            <ChevronUpIcon className='h-5 w-5' aria-hidden='true' aria-label='arrow-up' />
          </span>
        </button>
      );
    }
  };