"use client";
import { useState } from "react";
import { updateState } from "@/server/state/update-state";
import { useMutation } from "@tanstack/react-query";
// import Search from "@/components/Search/index";

export default function PageFrame({ children, defaultValues }) {
  const updateStateMut = useMutation({
    mutationFn: updateState,
  });
  const [isOn, setIsOn] = useState(defaultValues.confirmer);
  return (
    <>
      <div className="grid grid-cols-8 gap-5">
        <div className="col-span-2">
          <p className="text-xl">Confirmer :</p>
        </div>
        <div className="col-span-6 flex items-center gap-3">
          <button
            onClick={() => {
              setIsOn(!isOn);
              updateStateMut.mutate(
                { type: "confirmer_masuk" },
                {
                  onSuccess: (data) => {
                    setIsOn(data.data);
                  },
                  onError: (e) => {
                    console.log("ini error ", e);
                  },
                }
              );
            }}
            className={`relative w-14 h-8 flex items-center rounded-full p-1 duration-300 ${
              isOn ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform duration-300 ${
                isOn ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
          <span className="text-gray-600">{isOn ? "Actived" : "Deactived"}</span>
        </div>
        <hr className="col-span-8" />
      </div>

      {/* <div className="flex flex-col mt-3">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">{children}</div>
          </div>
        </div>
      </div> */}
    </>
  );
}
