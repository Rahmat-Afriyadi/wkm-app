"use client"

import { useState } from "react";
import ListSites from "../list-items";
import ModalListAsuransi from "../modal/list-asuransi";

export default function AsuransiDetailPage({asuransi}){


    const [status, setStatus]= useState(asuransi.status)
    const [submitted, setSubmit] = useState(true)

    const handleSubmit = async() =>{
    }

    return (
        
        <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nama Customer
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="nama" id="" value={asuransi.nama_customer} disabled/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nomor Mesin
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="no_msn" id="" value={asuransi.no_msn} disabled/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nomor Telepon
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="no_telepon" id="" value={asuransi.no_telepon}/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Status
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select required value={status} onChange={(e)=>{
                        console.log("ini value ", e.target.value)
                        setStatus(e.target.value)
                    }} className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer">
                            <option value="" disabled>Please Select Status</option>
                            <option value="P">Pending</option>
                            <option value="T">Tidak Berminat</option>
                            <option value="O" >Berminat</option>
                        </select>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Alasan
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="no_telepon" id="" />
                    {submitted && status != "O" && "" == "" && <p className="bg-red text-white rounded-lg px-2 py-1 max-w-lg mt-2">Wajib Diisi</p>}
                </div>
            </div>
            <button
                    onClick={handleSubmit}
                    id="button"
                    type="submit"
                    className="w-full px-6 py-2 mt-3 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
                >
                    Save
                </button>
        </div>
    )
}