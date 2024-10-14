"use client";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputForm from "@/components/Input/input-form";
import { form } from "./form";
import { useState } from "react";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PageFrame() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { create_from: "otrna" } });

  const onSubmit = async (values) => {
    values.otr = parseInt(values.otr);
    values.tahun = parseInt(values.tahun);

    Swal.fire({
      title: "Do you want to save the record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const res = await fetch("/api/tgl-merah/create", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if (res.status == 200) {
            const message = await res.json();
            await Swal.fire("Info", message.message, "info");
            router.push("/otr");
          }
        } catch (error) {
          Swal.fire("Failed!", error.message, "error");
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="-mx-3 mb-6 w-full grid grid-cols-12">
          <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center"
              htmlFor="grid-state"
            >
              Create From
            </label>
          </div>

          {form.map((e) => {
            return <InputForm key={e.id} name={e.name} title={e.title} type={e.type} id={e.id} register={register} />;
          })}
        </div>

        <br />

        <button
          id="button"
          type="submit"
          className="w-full mb-14 px-6 py-1 mt-2 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
        >
          Save
        </button>
      </form>
    </>
  );
}
