import React from "react";

const listStatus = [
  { id: "", name: "All Status" },
  { id: 1, name: "Active" },
  { id: 0, name: "Not Active" },
];

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ActionSelect({
  id,
  name,
}) { 

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleChange(e) {
    const params = new URLSearchParams(searchParams);
    console.log(e.target.value)
    params.set("active", e.target.value.trim());
    replace(`${pathname}?${params}`);
  }

  return (
    <>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <select
          id={id}
          name={name}
          defaultValue={ searchParams.get("active")}
          onChange={handleChange}
          className={
            "block w-full max-w-lg rounded-md shadow-sm border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          }
        >
          {listStatus.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
