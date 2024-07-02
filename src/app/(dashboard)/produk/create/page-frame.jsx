"use client"

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputForm from "@/components/Input/input-form"
import { form } from "./form"
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const MyFroalaEditor = dynamic(
    () => import('@/components/froala/index'),
    { ssr: false }
);



function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}


export default function PageFrame(){


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({defaultValues:{jenis_kendaraan:0}});

    const [desc, setDesc] = useState("")


    const onSubmit = async (values) => {
        if (values.jenis_kendaraan == 0 ) {
            return Swal.fire("Failed!", "Belum pilih jenis kendaraan", "error");
        }
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
                const res = await fetch("/api/mst-mtr/create",{
                  method: "POST",
                  headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values)
                })
                if(res.status ==200){
                    const message = await res.json()
                    Swal.fire("Info", message.message, "info");
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
                    
                    {form.map((e)=>{
                        return <InputForm disabled={e.disabled} key={e.id} name={e.name} title={e.title} type={e.type} id={e.id} register={register}/> 
                    })}

                    <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3" htmlFor="grid-state">
                                Jenis Asuransi
                            </label>
                            <div className="relative col-span-8 ">
                                <select {...register("jenis_asuransi", {
                                        required: "This field is required",
                                    })}
                                    
                                     className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option value={0} disabled={true} selected> Jenis Asuransi</option>
                                    <option value={1}>Asuransi Kendaraan</option>
                                    <option value={2}>Asuransi Jiwa</option>
                                </select>
                                {errors["sts_beli"] && (
                                    <p className="text-red mt-1 ml-1"> {errors["sts_beli"]["message"]}
                                        
                                    </p>
                                )}
                            </div>
                    </div>

                </div>
                        
                <div className="-mx-3 w-full grid grid-cols-12">
                    <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mr-4 flex items-center col-span-3">
                                Deskripsi Produk
                            </label>
                    </div>
                </div>
                <MyFroalaEditor model={desc} setDesc={setDesc} />


                <br />
                

                {/* <div dangerouslySetInnerHTML={{ __html: desc }} /> */}

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