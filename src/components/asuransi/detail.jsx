"use client"

import { useState, useEffect } from "react";
import ModalKodePos from "@/components/Modal/asuransi/modal-kodepos"
import ModalDealer from "@/components/Modal/asuransi/modal-dealer"
import Swal from "sweetalert2";
import { PhoneIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";


export default function AsuransiDetailPage({asuransi}){

    const [alasanPending, setAlasanPending] = useState([])
    const [alasanTdkBerminat, setAlasanTdkBerminat] = useState([])

    useEffect(()=>{
    (async () => {
      let response = await fetch("/api/alasan/pending")
      let data = []
      if (response.status == 200) {
        data = await response.json()
        setAlasanPending(data?.response)
      }
      response = await fetch("/api/alasan/tdk-berminat")
      if (response.status == 200) {
        data = await response.json()
        setAlasanTdkBerminat(data?.response)
      }
    })()
  },[])   // eslint-disable-line react-hooks/exhaustive-deps

    const {data:session} = useSession()
    const router = useRouter()

    useEffect(()=>{
        console.log("ini data ",session?.user?.dataSource && session?.user?.dataSource, asuransi)
        // if (session?.user?.dataSource && session?.user?.dataSource != asuransi.jenis_source) {
        //     router.push("/page-not-found")
        // }
    },[session]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const [status, setStatus]= useState(asuransi.status)
    const [alasan, setAlasan]= useState(asuransi.status == 'P' ? asuransi.alasan_pending : asuransi.status == 'T' ? asuransi.alasan_tdk_berminat : "")
    const [submitted, setSubmit] = useState(false)
    const [message, setMessage] = useState("")
    const [produks, setProduks] = useState([])
    const [alamatKirim, setAlamatKirim] = useState({
        province:{name:asuransi.province_name, code:asuransi.province_code},
        city:{name:asuransi.city_name, code:asuransi.city_code},
        subdistrict:{name:asuransi.subdistrict_name, code:asuransi.subdistrict_code},
    })
    const [dealer, setDealer] = useState({
        kd_dlr:asuransi.kd_dlr,
        nm_dlr:asuransi.nm_dlr,
    })
    const [formData, setFormData] = useState(asuransi)

    const handleSubmit = async() =>{
       if((formData.status == 'P' || formData.status == 'T') && alasan == ''){
            Swal.fire({
                title: "Peringatan",
                text: "Tolong lengkapi data ",
                icon: "info",
            });
        } else {
            const res =  await fetch("/api/asuransi/update", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            
            if (res.status == 200) {
                if (asuransi.jenis_source == "E" && formData.status == 'O' && asuransi.status != 'O') {
                    const resOke =  await fetch("/api/asuransi/update/berminat", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({no_msn:formData.no_msn}),
                    });
                }

                if (asuransi.jenis_source == "E" && formData.status_bayar == 'C' && asuransi.status == 'O') {
                    const resOke =  await fetch("/api/asuransi/update/batal-bayar", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({no_msn:formData.no_msn}),
                    });
                }

                Swal.fire({
                    title: "Good job!",
                    text: "Data successfully updated",
                    icon: "success",
                    preConfirm: () => {
                        router.push("/asuransi")
                    },
                });
            }
        }
    }

    useEffect(()=>{
        return setFormData({...formData, ...dealer})
    },[dealer]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        console.log("ini data alamat  ", alamatKirim)
        return setFormData({...formData, province:alamatKirim.province.code, city:alamatKirim.city.code, subdistrict:alamatKirim.subdistrict.code})
    },[alamatKirim]) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(()=>{
    (async () => {
      const response = await fetch("/api/produk?" + new URLSearchParams({
        jenis_asuransi:asuransi.jenis_asuransi
    }))
      if (response.status == 200) {
        const data = await response.json()
        setProduks(data.response)
      }
    })()
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        
        <div className=" space-y-6 sm:mt-5 sm:space-y-5">
            {message != '' && <div className='bg-green-500 rounded-lg mb-4 text-white flex justify-center text-lg p-4'>
                {message}
            </div>}
            {formData.jenis_source == "E" && <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Id Transaksi
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="id_transaksi" id="id_transaksi" defaultValue={formData.id_transaksi} disabled/>
                </div>
            </div>}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="nik"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    NIK
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="nik" id="nik" defaultValue={formData.nik} disabled/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nama Customer
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="nama" id="" defaultValue={formData.nama_customer} disabled/>
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
                    type="text" name="no_msn" id="" defaultValue={formData.no_msn} disabled/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Jenis Asuransi
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select required defaultValue={formData.jenis_asuransi} 
                    disabled={true}
                     className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer">
                            <option value="" disabled>Please Select Status</option>
                            <option value="1">Motor</option>
                            <option value="2">Personal Accident</option>
                            <option value="3" >Personal Accident & Motor</option>
                        </select>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nama Motor
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="nm_mtr" id="" defaultValue={formData.nama_motor} disabled/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Tanggal Faktur
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="date" name="nm_mtr" id="" defaultValue={formData.tgl_faktur.slice(0,10)}/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="no_telp"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nomor Telepon
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                    <a href={"tel:" + formData.no_telepon}><PhoneIcon className="w-6 h-5 absolute left-[475px]  cursor-pointer top-2 hover:text-yellow" aria-hidden="true"/></a>
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="no_telp" id="" defaultValue={formData.no_telp} disabled/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="no_telp2"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nomor Telepon 2
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="no_telp2" id="" defaultValue={formData.no_telp2} onChange={(e)=>{setFormData({...formData, no_telp2:e.target.value})}}/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Status
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select required defaultValue={status} onChange={(e)=>{
                        setStatus(e.target.value)
                        setFormData({...formData, status:e.target.value})
                        if(e.target.value=="O"){
                            setAlasan("")
                        } else if (e.target.value == 'P') {
                            setAlasan(formData.alasan_pending)
                        }  else if (e.target.value == 'T') {
                            setAlasan(formData.alasan_tdk_berminat)
                        }
                    }} 
                    disabled={asuransi.status == "O"}
                    className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer">
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
                    <select className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="no_telepon" id="" defaultValue={alasan} onChange={(e)=>{
                        if (formData.status == 'P') {
                            setFormData({...formData, alasan_pending:e.target.value})
                        } else if (formData.status == 'T') {
                            setFormData({...formData, alasan_tdk_berminat:e.target.value})
                        }
                        setAlasan(e.target.value)
                    }} disabled={status=="O"}>
                        <option value="" disabled>Please Select Alasan</option>
                        {formData.status == "P" && alasanPending.map((item, i)=>{
                            return (
                                <option key={i} value={item.id}>{item.name}</option>
                            )
                        })}
                        {formData.status == "T" && alasanTdkBerminat.map((item, i)=>{
                            return (
                                <option key={i} value={item.id}>{item.name}</option>
                            )
                        })}
                    </select>
                    {status != "O" && alasan == "" && <p className="bg-red text-white rounded-lg px-2 py-1 max-w-lg mt-2">Wajib Diisi</p>}
                </div>
            </div>
            {asuransi.jenis_source == "E" && <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="status-bayar"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Status Bayar
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select required defaultValue={formData.status_bayar} value={formData.status_bayar} onChange={(e)=>{
                        setFormData({...formData, status_bayar:e.target.value})
                    }} 
                    id="status-bayar"
                    className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer">
                            <option value="">Please Select Status</option>
                            <option value="S">Sudah Bayar</option>
                            <option value="B">Belum Bayar</option>
                            <option value="C" >Batal</option>
                        </select>
                </div>
            </div>}
            {asuransi.jenis_source == "E" && <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="tgl-bayar"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Tanggal Bayar
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="date" name="tgl_bayar" id="tgl-bayar" disabled={formData.status == 'O' ? false : true}  value={formData.tgl_bayar != null ? formData.tgl_bayar.slice(0,10) : ""} defaultValue={formData.tgl_bayar != null ? formData.tgl_bayar.slice(0,10) : ""} onChange={(e)=>{setFormData({...formData, tgl_bayar:e.target.value})}}/>
                </div>
            </div>}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kode-kerja"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nama Dealer
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="nm_dlr" id="" defaultValue={dealer.nm_dlr} disabled/>
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
                    type="text" name="kd_dlr" id="" defaultValue={dealer.kd_dlr}/>
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
                    type="text" name="kecamatan" id="" disabled={true} defaultValue={alamatKirim.subdistrict.name} value={alamatKirim.subdistrict.name}/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="kota"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Kota
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="kota" id="kota" disabled={true} defaultValue={alamatKirim.city.name} value={alamatKirim.city.name}/>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                    htmlFor="province"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Province
                </label>    
                <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                    <ModalKodePos setAlamatKirim={setAlamatKirim}/>
                    <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                    type="text" name="province" id="province" defaultValue={alamatKirim.province.name} value={alamatKirim.province.name}/>
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
                    type="number" name="harga" id=""  defaultValue={formData.harga} onChange={(e)=>setFormData({...formData, harga:parseInt(e.target.value)})}/>
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


