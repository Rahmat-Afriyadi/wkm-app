"use client"

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputForm from "@/components/Input/input-form"
import { form } from "./form"
import ModalProduk from "@/components/Modal/otr/modal-produk"
import OtrNa from "@/components/Modal/otr/modal-otr-na"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PageFrame({vendorList}){
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [detailOtr, setDetailOtr] = useState({
        motorprice_kode:null,
        product_nama:null,
        tahun:null,
    })


    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: {vendor_id:0} });

    const createFrom = watch("create_from", "otrna")

    useEffect(()=>{
        const today = new Date()
        setValue("motorprice_kode", detailOtr.motorprice_kode)
        setValue("product_nama", detailOtr.product_nama)
        setValue("tahun", detailOtr.tahun ? detailOtr.tahun :today.getFullYear()  )
    },[detailOtr]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        setValue("motorprice_kode", "")
        setValue("product_nama", "")
        setValue("tahun", "" )
    },[watch("create_from")]) // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = async (values) => {
        values.otr = parseInt(values.otr)
        values.tahun = parseInt(values.tahun)

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
                const res = await fetch("/api/otr/create",{
                  method: "POST",
                  headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values)
                })
                if(res.status ==200){
                    const message = await res.json()
                    await Swal.fire("Info", message.message, "info");
                    router.push("/otr")
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
                        <p className="text-lg font-bold mb-5 col-span-12">Deskripsi Produk</p>
                        <ModalProduk setDetailOtr={setDetailOtr} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> 
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                            Id Produk
                        </label>
                        <div className="relative col-span-8 mb-5">
                            <input id={"id_produk"} {...register("id_produk")}  className={"border-gray-500 border-2 appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} type={"text"} placeholder="Id Produk"/>
                        </div>

                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="merk">
                            Pilih Vendor
                        </label>
                        <div className="relative col-span-8">
                            <select {...register("vendor_id", {
                                    required: "This field is required",
                                })}
                                    className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="merk">
                                <option value={0} disabled={true}>Pilih Vendor</option>
                                { vendorList.map((e)=><option key={e.kd_vendor} value={e.kd_vendor}>{e.nm_vendor}</option>)}
                            </select>
                        </div>

                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                            Nama Produk
                        </label>
                        <div className="relative col-span-8 mb-8 mt-5">
                            <input id={"nm_produk"} {...register("nm_produk")}  className={"border-gray-500 border-2 appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} type={"text"} placeholder="Nama Produk"/>
                        </div>
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                            Create From
                        </label>
                        <div className="relative col-span-8 mb-8">
                            <select {...register("create_from", {
                                    required: "This field is required",
                                })}
                                    className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value="otrna">OTR NA Wanda</option>
                                <option value="motorprice">Jenis Kendaraan</option>
                            </select>
                        </div>
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                            Create From
                        </label>
                        <div className="relative col-span-8 mb-8">
                            <select {...register("create_from", {
                                    required: "This field is required",
                                })}
                                    className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value="otrna">OTR NA Wanda</option>
                                <option value="motorprice">Jenis Kendaraan</option>
                            </select>
                        </div>
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                            Create From
                        </label>
                        <div className="relative col-span-8 mb-8">
                            <select {...register("create_from", {
                                    required: "This field is required",
                                })}
                                    className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value="otrna">OTR NA Wanda</option>
                                <option value="motorprice">Jenis Kendaraan</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                        <p className="text-lg font-bold mb-5 col-span-12">Deskripsi Produk</p>
                        <OtrNa setDetailOtr={setDetailOtr} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> 
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                            Kode Motor
                        </label>
                        <div className="relative col-span-8 mb-5">
                            <input id={"id_produk"} {...register("id_produk")}  className={"border-gray-500 border-2 appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} type={"text"} placeholder="Kode Motor" onClick={()=>setIsModalOpen(true)}/>
                        </div>

                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                            Create From
                        </label>
                        <div className="relative col-span-8 mb-8">
                            <select {...register("create_from", {
                                    required: "This field is required",
                                })}
                                    className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value="otrna">OTR NA Wanda</option>
                                <option value="motorprice">Jenis Kendaraan</option>
                            </select>
                        </div>
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                            Create From
                        </label>
                        <div className="relative col-span-8 mb-8">
                            <select {...register("create_from", {
                                    required: "This field is required",
                                })}
                                    className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value="otrna">OTR NA Wanda</option>
                                <option value="motorprice">Jenis Kendaraan</option>
                            </select>
                        </div>
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                            Create From
                        </label>
                        <div className="relative col-span-8 mb-8">
                            <select {...register("create_from", {
                                    required: "This field is required",
                                })}
                                    className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value="otrna">OTR NA Wanda</option>
                                <option value="motorprice">Jenis Kendaraan</option>
                            </select>
                        </div>
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                            Create From
                        </label>
                        <div className="relative col-span-8 mb-8">
                            <select {...register("create_from", {
                                    required: "This field is required",
                                })}
                                    className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value="otrna">OTR NA Wanda</option>
                                <option value="motorprice">Jenis Kendaraan</option>
                            </select>
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
    )
}