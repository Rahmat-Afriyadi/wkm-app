"use client";

import React, { useEffect, useState } from "react";

import Modal from "@/components/Modal/index";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

export default function ModalListFaktur({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function resetModal() {
    setIsModalOpen(false);
  }

  function handleChange() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <button className="text-yellow hover:text-white bg-black p-1 rounded-lg" onClick={handleChange}>
        <AdjustmentsHorizontalIcon className="w-6 h-5" aria-hidden="true" />
      </button>

      <Modal isModalOpen={isModalOpen} setIsModalOpen={resetModal} title="List Data">
        <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4">{children}</div>
      </Modal>
    </>
  );
}
