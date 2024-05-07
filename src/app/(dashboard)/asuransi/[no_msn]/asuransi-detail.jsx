"use client"

import { useState } from "react";
import ModalKodePos from "../modal/kodepos"
import ModalDealer from "../modal/dealer"
import { useSearchParams } from "next/navigation";

export default function AsuransiDetailPage({asuransi}){
    const searchParams = useSearchParams()

    const [status, setStatus]= useState(asuransi.status)
    const [alasan, setAlasan]= useState(asuransi.alasan)
    const [submitted, setSubmit] = useState(false)
    const [message, setMessage] = useState("")
    const [alamatKirim, setAlamatKirim] = useState({
        kodepos:"",
        kelurahan:"",
        kecamatan:"",
    })
    const [dealer, setDealer] = useState({
        kd_dlr:"",
        nm_dlr:"",
    })

    const handleSubmit = async() =>{
        const res =  await fetch("/api/asuransi/update", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                no_msn:asuransi.no_msn,
                nama_customer:asuransi.nama_customer,
                no_telepon:asuransi.no_telepon,
                status:status,
                alasan:alasan
            }),
        });
        console.log("ini status code nya", res.status)
        if (res.status == 200) {
            console.log("ini res nya ", await res.json().message)
        }
    }

    return (
        
        <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
            {message != '' && <div className='bg-green-500 rounded-lg mb-4 text-white flex justify-center text-lg p-4'>
                {message}
            </div>}
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
                    type="text" name="no_telepon" id="" value={asuransi.no_telepon} disabled/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nomor Telepon 2
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="no_telepon2" id="" value={asuransi.no_telepon}/>
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
                        if(e.target.value=="O"){
                            setAlasan("")
                        }
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
                    type="text" name="no_telepon" id="" value={alasan} onChange={(e)=>setAlasan(e.target.value)} disabled={status=="O"}/>
                    {status != "O" && alasan == "" && <p className="bg-red text-white rounded-lg px-2 py-1 max-w-lg mt-2">Wajib Diisi</p>}
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nama Dealer
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="nm_dlr" id="" value={dealer.nm_dlr} disabled/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Kode Dealer
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                    <ModalDealer setDealer={setDealer}/>
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="kd_dlr" id="" value={dealer.kd_dlr}/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Kecamatan
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="kecamatan" id="" disabled={true} value={alamatKirim.kecamatan}/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Kelurahan
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="kelurahan" id="" disabled={true} value={alamatKirim.kelurahan}/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Kode Pos
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                    <ModalKodePos setAlamatKirim={setAlamatKirim}/>
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="kodepos" id="" value={alamatKirim.kodepos}/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Jenis Barang
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="jenis_barang" id="" />
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Harga
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="number" name="kelurahan" id=""  />
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