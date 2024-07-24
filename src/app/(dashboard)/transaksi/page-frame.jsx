"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Search from "@/components/Search/index"

export default function PageFrame({children}){

    return (
        <>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="max-w-xs mr-2 w-80 mt-2 flex justify-start">
                    <a href="/transaksi/create" className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</a>
                    <Search
                            id="search-query"
                            name="search_query"
                            placeholder={"Search for a Transaksi..."}
                        />
                </div>
            </div>

            <div className="flex flex-col mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    {children}
                </div>
            </div>
            </div>
        </div>
        </>
    )
}