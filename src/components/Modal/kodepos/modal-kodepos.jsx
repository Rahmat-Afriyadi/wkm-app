"use client"

import React, { useState } from "react";

import Modal from "@/components/Modal/index";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Search from "@/components/Search/dynamic"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ListKodepos from "./list-kodepos";

export default function ModalKodePos({setDetail, isModalOpen, setIsModalOpen}) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();


  function resetModal() {
    const params = new URLSearchParams(searchParams);
    params.set("search_query_kodepos","");
    replace(`${pathname}?${params}`);
    setIsModalOpen(false)
  }

function handleChange() {
  const params = new URLSearchParams(searchParams);
    params.set("search_query_kodepos","");
    replace(`${pathname}?${params}`);
    setIsModalOpen(!isModalOpen);
  }

 
  return (
    <>

      <button className="h-6 w-6 absolute left-[475px]  cursor-pointer top-2 hover:text-yellow " onClick={handleChange}>
          <MagnifyingGlassIcon className="w-6 h-5" aria-hidden="true" />
      </button>

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={resetModal}
        title="List Kode Pos">
        <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4">
            <div className="max-w-xs px-0">
            <Search
              id="search-query"
              name="search_query_kodepos"
              placeholder={"Search for a kodepos..."}/>
            </div>

            <ListKodepos setIsModalOpen={setIsModalOpen} setDetail={setDetail}/>
        </div>
      </Modal>
    </>
  );
}
