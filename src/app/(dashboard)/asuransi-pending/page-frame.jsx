"use client"


import dynamic from "next/dynamic";
import ModalFormSite from "../../../components/form/asuransi/modal-form-site";
import { useSession } from "next-auth/react";

export default function SiteFrame({children}) {
    const {data:session} = useSession()
    // const privileges = session?.user.role.privileges;
    // const privilege  = privileges?.filter((val) => val.name === "Sites")[0];
    const privilege  = {add:true,};
    return (
        <>
        {/* <Titlepage name="Sites" /> */}

        <div className="sm:flex lg:items-center">
            <div className="sm:flex-auto">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 lg:items-end">
                {/* Search */}
                {/* <div className="max-w-xs mr-2 w-80">
                <Search
                        id="search-query"
                        name="search_query"
                        placeholder={"Search for a site..."}
                    />
                </div> */}
                {/* <div className="w-64 mr-2">
                <DatePicker
                    id="date_range"
                    name="date_range"
                    primaryColor={"amber"}
                />
                </div> */}
                <div className="w-fit">
                {/* <ActionSelect
                    id={"active"}
                    name={"active"}
                    required={false}
                /> */}
                </div>
            </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {privilege?.add ? (
                <ModalFormSite
                    data={undefined}
                    type="add"
                />

            ) : (
                <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm opacity-50 cursor-not-allowed bg-cyan-600 sm:w-auto">
                Add site
                </span>
            )}
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
    );
}
