"use client";

import React, { useState } from "react";

import Modal from "@/components/Modal/index";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Search from "@/components/Search/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ListKodepos from "./list-produk";

export default function ModalProduk({ setDetail, isModalOpen, setIsModalOpen }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // const [isModalOpen, setIsModalOpen] = useState(false)

  function resetModal() {
    const params = new URLSearchParams(searchParams);
    params.set("search_query_produk", "");
    replace(`${pathname}?${params}`);
    setIsModalOpen(false);
  }

  function handleChange() {
    const params = new URLSearchParams(searchParams);
    params.set("search_query_produk", "");
    replace(`${pathname}?${params}`);
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={resetModal} title="List Motor Price Code">
        <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4">
          <div className="max-w-xs px-0">
            <Search id="search-query" name="search_query_produk" placeholder={"Search for a produk..."} />
          </div>

          <ListKodepos setIsModalOpen={setIsModalOpen} setDetail={setDetail} />
        </div>
      </Modal>
    </>
  );
}
