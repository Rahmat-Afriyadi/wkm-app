"use client"

import { useFieldArray, useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import InputForm from "@/components/Input/input-form"
import { form } from "./form"
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const MyFroalaEditor = dynamic(
    () => import('@/components/froala/index'),
    { ssr: false }
);

import {jsonToFormData} from "@/lib/utils/json-to-formdata"
import { Noto_Sans_Syriac_Eastern } from "next/font/google";

export default function PageFrame({item, vendorList}){


    const [tab, setTab] = useState(1)
    // 1=manfaat
    // 2=syarat
    // 3=paket

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: item});

    const {fields:manfaatForm, append:appendManfaat, remove:removeManfaat} = useFieldArray({
        control,
        name:"manfaat"
    })

    const {fields:syaratForm, append:appendSyarat, remove:removeSyarat} = useFieldArray({
        control,
        name:"syarat"
    })

    const {fields:paketForm, append:appendPaket, remove:removePaket} = useFieldArray({
        control,
        name:"paket"
    })

    const [desc, setDesc] = useState(item.deskripsi)

    const onSubmit = async (values) => {
        console.log("ini values ya ", values)
        values.deskripsi = desc
        values.nilai_pertanggungan = parseInt(values.nilai_pertanggungan)
        values.premi = parseInt(values.premi)
        values.admin = parseInt(values.admin)

        const fileLogo = values.logo[0]
        delete values.logo
        delete values.vendor
        const formData = jsonToFormData(values)
        formData.append("files", fileLogo)


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
                // const resUpload = await fetch("/api/produk/upload-logo",{
                //   method: "POST",
                //   body: formData
                // })

                const resUpdate = await fetch("/api/produk/update",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                })

                if(resUpdate.status ==200){
                    const message = await resUpdate.json()
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
                    
                    <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3" htmlFor="jenis_asuransi">
                                Jenis Asuransi
                            </label>
                            <div className="relative col-span-8 ">
                                <select {...register("jns_asuransi", {
                                        required: "This field is required",
                                    })}
                                     className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="jenis_asuransi">
                                    <option value="" disabled={true}> Jenis asuransi</option>
                                    <option value="1">Kendaraan</option>
                                    <option value="2">Jiwa</option>
                                </select>
                                {errors["sts_beli"] && (
                                    <p className="text-red mt-1 ml-1"> {errors["sts_beli"]["message"]}
                                        
                                    </p>
                                )}
                            </div>
                    </div>

                    <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3" htmlFor="merk">
                            Pilih Vendor
                        </label>
                        <div className="relative col-span-8 ">
                            <select {...register("vendor_id", {
                                    required: "This field is required",
                                })}
                                    className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="merk">
                                <option value="" disabled={true}>Pilih Vendor</option>
                                { vendorList.map((e)=><option key={e.kd_vendor} value={e.kd_vendor}>{e.nm_vendor}</option>)}
                            </select>
                        </div>
                    </div>

                    {form.map((e)=>{
                        return <InputForm disabled={e.disabled} step={e.step} key={e.id} name={e.name} title={e.title} type={e.type} id={e.id} register={register}/> 
                    })}

                </div>


                <div className="-mx-3 w-full grid grid-cols-12">
                    <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mr-4 flex items-center col-span-3">
                                Deskripsi Produk
                            </label>
                            <textarea id={"deskripsi"}  className={" appearance-none block w-ful text-gray-700 border-2 border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} />
                    </div>
                </div>
                    

                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
                        <li className="me-2" role="presentation">
                            <button onClick={()=>setTab(1)} className={`${tab == 1 ? "text-yellow bg-black" :""} inline-block p-4 border-b-2 rounded-t-lg hover:bg-yellow hover:text-black`} id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Manfaat</button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button onClick={()=>setTab(2)} className={`${tab == 2 ? "text-yellow bg-black" :""} inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 hover:bg-yellow`} id="dashboard-styled-tab" data-tabs-target="#styled-dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Syarat</button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button onClick={()=>setTab(3)} className={`${tab == 3 ? "text-yellow bg-black" :""} inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 hover:bg-yellow`} id="settings-styled-tab" data-tabs-target="#styled-settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Paket</button>
                        </li>
                    </ul>
                </div>
                <div id="default-styled-tab-content">
                    <div className={`${tab==1 ? "" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`} id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
                        <button
                            type="button"
                            onClick={() =>{ 
                                appendManfaat({ manfaat: "", id_manfaat: "" }) 
                            }}
                        >
                            append
                        </button>
                        {manfaatForm.map((item, index) => (
                            <div key={item.id} className="-mx-3 w-full grid grid-cols-12 align-middle">
                                <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold flex items-center col-span-3">
                                        Manfaat
                                    </label>
                                    <textarea rows={4} id={"deskripsi"} {...register(`manfaat.${index}.manfaat`)}  className={" appearance-none -ml-3 block w-ful text-gray-700 border-2 border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} />
                                </div>
                                <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                                    <button onClick={()=>{
                                        
                                        fetch("/api/produk/delete/manfaat", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({id:item.id_manfaat}),
                                        }).then()
                                        removeManfaat(index)
                                    }} className="uppercase tracking-wide text-gray-700 text-xs font-bold flex items-center col-span-3">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={`${tab==2 ? "" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`} id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
                        <button
                            type="button"
                            onClick={() =>{ 
                                appendSyarat({ syarat: "", id_syarat: "" }) 
                            }}
                        >
                            append
                        </button>
                        {syaratForm.map((item, index) => (
                            <div key={item.id} className="-mx-3 w-full grid grid-cols-12 align-middle">
                                <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold flex items-center col-span-3">
                                        Syarat
                                    </label>
                                    <textarea id={"deskripsi"} {...register(`syarat.${index}.syarat`)}  className={" appearance-none -ml-3 block w-ful text-gray-700 border-2 border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} />
                                </div>
                                <button onClick={()=>{
                                    fetch("/api/produk/delete/syarat", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({id:item.id_syarat}),
                                        }).then()
                                        removeSyarat(index)
                                }}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <div className={`${tab==3 ? "" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`} id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
                        <button
                            type="button"
                            onClick={() =>{ 
                                appendPaket({ paket: "", id_paket: "" }) 
                            }}
                        >
                            append
                        </button>
                        {paketForm.map((item, index) => (
                            <div key={item.id} className="-mx-3 w-full grid grid-cols-12 align-middle">
                                <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
                                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold flex items-center col-span-3">
                                        Paket
                                    </label>
                                    <textarea id={"deskripsi"} {...register(`paket.${index}.paket`)}  className={" appearance-none -ml-3 block w-ful text-gray-700 border-2 border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} />
                                </div>
                                <button onClick={()=>{
                                    fetch("/api/produk/delete/paket", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({id:item.id_paket}),
                                        }).then()
                                        removePaket(index)
                                }}>Delete</button>
                            </div>
                        ))}
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