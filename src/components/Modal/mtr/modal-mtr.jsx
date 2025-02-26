"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const Modal = dynamic(() => import("@/components/Modal/index"));
const ListKodepos = dynamic(() => import("./list-mtr"));

export default function ModalMotor({ handleClick, isModalOpen, setIsModalOpen }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  function resetModal() {
    setQuery("");
    setIsModalOpen(false);
  }

  return (
    <>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={resetModal} title="List Motor Price Code">
        <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4">
          <div className="max-w-xs px-0">
            <label htmlFor={"search_query"} className="sr-only">
              Search
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" aria-hidden="true">
                <MagnifyingGlassIcon className="w-4 h-4 mr-3 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                id={"search_query"}
                name={"search_query"}
                className="block w-full border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 pl-9 sm:text-sm"
                placeholder={"Search for motor..."}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <ListKodepos setIsModalOpen={setIsModalOpen} handleClick={handleClick} query={query} />
        </div>
      </Modal>
    </>
  );
}
