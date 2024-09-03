"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BounceLoader } from "react-spinners";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const { register, handleSubmit } = useForm();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const onSubmit = async (values) => {
    setloading(true);
    try {
      const res = await fetch("/api/transaksi/search-cus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.status == 200) {
        const resData = await res.json();
        setdata(resData);
      }
    } catch (error) {
      console.log("Failed!", error.message, "error");
    }
    setloading(false);
  };

  const tableContent = data.map((item, index) => {
    return (
      <tr
        key={item.no_msn}
        className={classNames("hover:text-yellow hover:bg-black", index % 2 === 0 ? " " : "bg-gray-50")}
      >
        <td className="px-3 py-4 text-sm whitespace-nowrap font-bold">{item.NoMsn}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap">{item.NmCustomer}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap">{item.NoWa}</td>
      </tr>
    );
  });

  return (
    <>
      <br />
      <div className="w-full">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="no_hp" className="block text-sm font-medium leading-6 text-gray-900">
              Nomor Telepon
            </label>
            <div className="mt-2">
              <input
                id="no_hp"
                name="no_hp"
                type="number"
                autoComplete="no_hp"
                {...register("no_hp", {
                  required: "This field is required",
                })}
                required
                className="block w-full appearance-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        {loading && <p>Loading...</p>}
        <br />
        <table className="mx-auto min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                Nomor Mesin
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                Nama Customer
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                Nomor Telepon
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.length > 0 ? (
              tableContent
            ) : (
              <tr>
                <td colSpan={7} className="px-3 py-4 text-sm text-center text-gray-500 whitespace-nowrap">
                  Data not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
