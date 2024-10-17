"use client";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputForm from "@/components/Input/input-form";
import { form } from "./form";
import ModalProduk from "@/components/Modal/otr/modal-produk";
import OtrNa from "@/components/Modal/otr/modal-otr-na";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PageFrame() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [detailOtr, setDetailOtr] = useState({
    motorprice_kode: null,
    product_nama: null,
    tahun: null,
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { create_from: "otrna" } });

  const createFrom = watch("create_from", "otrna");

  useEffect(() => {
    const today = new Date();
    setValue("motorprice_kode", detailOtr.motorprice_kode);
    setValue("product_nama", detailOtr.product_nama);
    setValue("tahun", detailOtr.tahun ? detailOtr.tahun : today.getFullYear());
  }, [detailOtr]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setValue("motorprice_kode", "");
    setValue("product_nama", "");
    setValue("tahun", "");
  }, [watch("create_from")]); // eslint-disable-line react-hooks/exhaustive-deps

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
          const res = await fetch("/api/otr/create", {
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
            router.replace("/otr");
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
            <div className="relative col-span-8 ">
              <select
                {...register("create_from", {
                  required: "This field is required",
                })}
                className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option value="otrna">OTR NA Wanda</option>
                <option value="motorprice">Jenis Kendaraan</option>
              </select>
            </div>
          </div>

          <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12 relative">
            {createFrom == "motorprice" && (
              <ModalProduk setDetailOtr={setDetailOtr} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            )}
            {createFrom == "otrna" && (
              <OtrNa setDetailOtr={setDetailOtr} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            )}
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"
              style={{ whiteSpace: "nowrap" }}
              htmlFor={"pilihan"}
            >
              Pilihan
            </label>
            <input
              placeholder={createFrom == "otrna" ? "Pilih OTR NA" : createFrom == "motorprice" ? "Pilih Model" : ""}
              id={"pilihan"}
              disabled={createFrom == "form" ? true : false}
              onClick={() => setIsModalOpen(true)}
              className={classNames(
                createFrom == "form" ? "cursor-not-allowed bg-gray-200" : "border-gray-500 border-2",
                "appearance-none block w-ful text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              )}
              type={"text"}
            />
          </div>

          {form.map((e) => {
            return (
              <InputForm
                disabled={createFrom == "motorprice" && e.name == "tahun" ? false : e.disabled}
                key={e.id}
                name={e.name}
                title={e.title}
                type={e.type}
                id={e.id}
                register={register}
              />
            );
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
