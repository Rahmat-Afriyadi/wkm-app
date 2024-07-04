"use client"

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputForm from "@/components/Input/input-form"
import { form } from "./form"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PageFrame({otr, merkMobil, merkMotor}){

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: otr });

    const router = useRouter()
    const jnsKendaraan = watch("jenis_kendaraan", otr.jenis_kendaraan)

    useEffect( ()=>{
        if (jnsKendaraan != otr.jenis_kendaraan) {
            setValue("merk", "")
        }else {
            setValue("merk", otr.merk)
        }
    },[jnsKendaraan]) // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = async (values) => {
        values.jenis_kendaraan = parseInt(values.jenis_kendaraan)
        if (parseInt(values.jenis_kendaraan) == 0) {
            return Swal.fire("Failed!", error.message, "error");
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
                const res = await fetch("/api/mst-mtr/update",{
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
                    router.push("/mst-mtr")
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
                            Jenis Kendaraan
                        </label>
                        <div className="relative col-span-8 ">
                            <select {...register("jenis_kendaraan", {
                                    required: "This field is required",
                                })}
                                    className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value="" disabled={true}> Jenis_kendaraan</option>
                                <option value={1}>Motor</option>
                                <option value={2}>Mobil</option>
                            </select>
                            {errors["sts_beli"] && (
                                <p className="text-red mt-1 ml-1"> {errors["sts_beli"]["message"]}
                                    
                                </p>
                            )}
                        </div>
                    </div>
                    
                    <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3" htmlFor="merk">
                            Merk
                        </label>
                        <div className="relative col-span-8 ">
                            <select disabled={jnsKendaraan==0} {...register("merk", {
                                    required: "This field is required",
                                })}
                                    className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="merk">
                                <option value="" disabled={true}>Pilih Merk</option>
                                { jnsKendaraan == 1 &&  merkMotor.map((e)=><option key={e.id} value={e.merk}>{e.merk}</option>)}
                                { jnsKendaraan == 2 &&  merkMobil.map((e)=><option key={e.id} value={e.merk}>{e.merk}</option>)}
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