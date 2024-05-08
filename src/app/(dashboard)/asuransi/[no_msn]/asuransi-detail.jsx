"use client"

import { useState, useEffect } from "react";
import ModalKodePos from "../modal/kodepos"
import ModalDealer from "../modal/dealer"
import { useSearchParams } from "next/navigation";

export default function AsuransiDetailPage({asuransi}){
    const searchParams = useSearchParams()

    const [status, setStatus]= useState(asuransi.status)
    const [alasan, setAlasan]= useState(asuransi.alasan)
    const [submitted, setSubmit] = useState(false)
    const [message, setMessage] = useState("")
    const [produks, setProduks] = useState([])
    const [alamatKirim, setAlamatKirim] = useState({
        kodepos:"",
        kelurahan:"",
        kecamatan:"",
    })
    const [dealer, setDealer] = useState({
        kd_dlr:"",
        nm_dlr:"",
    })
    const [formData, setFormData] = useState(asuransi)

    const handleSubmit = async() =>{
        setFormData({...formData, ...alamatKirim, ...dealer})
        console.log("ini formdata ", formData)
        const res =  await fetch("/api/asuransi/update", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        console.log("ini status code nya", res.status)
        if (res.status == 200) {
            console.log("ini res nya ", await res.json().message)
        }
    }

    useEffect(()=>{
    (async () => {
      const response = await fetch("/api/produk")
      if (response.status == 200) {
        const data = await response.json()
        console.log("ini data ", data)
        setProduks(data.response)
      }
    })()
  },[])

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
                        setStatus(e.target.value)
                        setFormData({...formData, status:e.target.value})
                        if(e.target.value=="O"){
                            setAlasan("")
                        } else if (e.target.value == 'P') {
                            setAlasan(formData.alasan_pending)
                        }  else if (e.target.value == 'T') {
                            setAlasan(formData.alasan_tdk_berminat)
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
                    type="text" name="no_telepon" id="" value={alasan} onChange={(e)=>{
                        if (formData.status == 'P') {
                            setFormData({...formData, alasan_pending:e.target.value})
                        } else if (formData.status == 'T') {
                            setFormData({...formData, alasan_tdk_berminat:e.target.value})
                        }
                        setAlasan(e.target.value)
                    }} disabled={status=="O"}/>
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
                    <select required value={formData.jns_brg != null ? formData.jns_brg : ""} onChange={(e)=>{
                        setFormData({...formData, jns_brg:e.target.value})
                        console.log("ini barang ", formData.jns_brg)
                    }} className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer">
                            <option value="" disabled>Please Select Status</option>
                            {produks.length >0 && produks.map((item,i)=>{
                                return (
                                <option key={i} value={item.kd_produk}>{item.nm_produk}</option>
                            )
                            })}
                        </select>
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
                    type="number" name="kelurahan" id=""  value={formData.harga} onChange={(e)=>setFormData({...formData, harga:e.target.value})}/>
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


