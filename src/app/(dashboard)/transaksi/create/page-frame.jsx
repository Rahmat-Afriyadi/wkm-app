"use client";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputForm from "@/components/Input/input-form";
import { formProduk, formMotor, formKonsumen } from "./form";
import ModalProduk from "@/components/Modal/asuransi/modal-produk";
import Otr from "@/components/Modal/otr/modal-otr";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputFormGroup from "@/components/Input/input-form-group"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PageFrame({ vendorList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModaProduk, setIsModalProduk] = useState(false);

  const [detailOtr, setDetailOtr] = useState({
    kd_mdl: null,
    nm_mtr: null,
    tahun: null,
    otr: null,
  });
  const [detailProduk, setDetailProduk] = useState({
    id_produk:null,
    vendor_id:0,
    nm_produk:null,
    rate:null,
    admin:null,
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { vendor_id: 0 } });

  useEffect(() => {
    setValue("id_produk", detailProduk.id_produk);
    setValue("vendor_id", detailProduk.vendor_id);
    setValue("product_nama", detailProduk.nm_produk);
    setValue("rate", detailProduk.rate);
    setValue("admin", detailProduk.admin);
  }, [detailProduk]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setValue("kd_mdl", detailOtr.kd_mdl);
    setValue("nm_mtr", detailOtr.nm_mtr);
    setValue("tahun", detailOtr.tahun);
    setValue("otr", detailOtr.otr);
  }, [detailOtr]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className="-mx-3 mb-6 w-full grid grid-cols-12 gap-x-2">


          <div className="w-full px-3 mb-5 col-span-6">
            <ModalProduk setDetail={setDetailProduk} isModalOpen={isModaProduk} setIsModalOpen={setIsModalProduk} />
            <h2 className="text-lg font-bold mb-5 col-span-12">Detail Produk</h2>
            <hr /> <br />
            <div className="grid grid-cols-12 gap-y-5">
              <div className="col-span-3 flex items-center">
                <label
                  className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center"
                  htmlFor="grid-state"
                >
                  Id Produk
                </label>
              </div>
              <div className="col-span-9">
                <input
                  id={"id_produk"}
                  {...register("id_produk")}
                  className={
                    "border-gray-500 border-2 appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  }
                  type={"text"}
                  placeholder="Id Produk"
                  onClick={() => setIsModalProduk(true)}
                />
              </div>

              <div className="col-span-3 flex items-center">
                <label
                  className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center"
                  htmlFor="merk"
                >
                  Vendor
                </label>
              </div>
              <div className="col-span-9">
                <select
                  disabled={true}
                  {...register("vendor_id", {
                    required: "This field is required",
                  })}
                  className="cursor-not-allowed bg-gray-200 block appearance-none w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="merk"
                >
                  <option value={0} disabled={true}>
                    Pilih Vendor
                  </option>
                  {vendorList.map((e) => (
                    <option key={e.kd_vendor} value={e.kd_vendor}>
                      {e.nm_vendor}
                    </option>
                  ))}
                </select>
              </div>

              {formProduk.map((e)=>{
                  return <InputFormGroup step={e.step} disabled={e.disabled} key={e.id} name={e.name} title={e.title} type={e.type} id={e.id} register={register}/> 
              })}

            </div>
          </div>

          <div className="w-full px-3 mb-5 col-span-6">
            <Otr setDetailOtr={setDetailOtr} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <h2 className="text-lg font-bold mb-5">Detail Motor</h2>
            <hr /> <br />
            <div className="grid grid-cols-12 gap-y-5">
              <div className="col-span-3 flex items-center">
                <label
                  className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center"
                  htmlFor="grid-state"
                >
                  Kode Motor
                </label>
              </div>
              <div className="col-span-9">
                <input
                  id={"id_produk"}
                  {...register("kd_mdl")}
                  className={
                    "border-gray-500 border-2 appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  }
                  type={"text"}
                  placeholder="Kode Motor"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>

              {formMotor.map((e)=>{
                  return <InputFormGroup step={e.step} disabled={e.disabled} key={e.id} name={e.name} title={e.title} type={e.type} id={e.id} register={register}/> 
              })}
            </div>
            

          </div>


          <div className="w-full px-3 mb-5 col-span-6">
            <h2 className="text-lg font-bold mb-5">Detail Konsumen</h2>
            <hr /> <br />
            <div className="grid grid-cols-12 gap-y-5">
              {formKonsumen.map((e)=>{
                  return <InputFormGroup step={e.step} disabled={e.disabled} key={e.id} name={e.name} title={e.title} type={e.type} id={e.id} register={register}/> 
              })}
            </div>
            

          </div>
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
