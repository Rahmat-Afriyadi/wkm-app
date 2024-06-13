"use client"

import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function PageFrame({approval}){


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: approval });


  const onSubmit = async (values) => {

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
            const res = await fetch("/api/approval/update",{
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(values)
            })
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
                <div className="w-full flex justify-between">
                    <div className="-mx-3 mb-6 w-6/12">
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="grid-first-name">
                                Id Transaksi
                            </label>
                            <input disabled={true} defaultValue={approval?.id_transaksi} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" />
                        </div>
                        <p className="text-lg font-bold mb-5 ml-2">Deskripsi Produk</p>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="id-produk">
                                Id Produk
                            </label>
                            <input disabled={true} defaultValue={approval?.id_produk} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="id-produk" type="text" />
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="nama-produk">
                                Produk Asuransi
                            </label>
                            <input disabled={true} defaultValue={approval?.nm_produk} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nama-produk" type="text" />
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="rate">
                                Rate
                            </label>
                            <input disabled={true} defaultValue={approval?.rate} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="rate" type="text" />
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="admin">
                                Admin
                            </label>
                            <input disabled={true} defaultValue={approval?.admin} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="admin" type="text" />
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="otr">
                                Otr
                            </label>
                            <input disabled={true} defaultValue={approval?.otr} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="otr" type="text" />
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="premi">
                                Premi
                            </label>
                            <input disabled={true} defaultValue={approval?.premi} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="premi" type="text" />
                        </div>

                        <br />
                        <p className="text-lg font-bold mb-5 ml-2">Profile Konsumen</p>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="no-ktp">
                                No KTP
                            </label>
                            <input   className="border-gray-500 border-2 appearance-none block w-full bg-white text-gray-700 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="no-ktp" type="text"  {...register("nik", {  required:  "This field is required",})}/>
                            {errors["nik"] && (
                            <ExclamationCircleIcon
                                className="w-5 h-5 text-red-500"
                                aria-hidden="true"
                            />
                            )}
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="nm-stnk">
                                Nama STNK
                            </label>
                            <input  className="border-gray-500 border-2 appearance-none block w-full bg-white text-gray-700 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nm-stnk" type="text"  {...register("nm_konsumen", {  required:  "This field is required",})}/>
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="no-hp">
                                No HP
                            </label>
                            <input  className="border-gray-500 border-2 appearance-none block w-full bg-white text-gray-700 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="no-hp" type="text"  {...register("no_hp", {  required:  "This field is required",})}/>
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="alamat">
                                Alamat
                            </label>
                            <textarea {...register("alamat", {  required:  "This field is required",})}  className="h-20 border-gray-500 border-2 poin appearance-none block w-full bg-white text-gray-700 rounded col-span-8 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="alamat" type="text" />
                        </div>

                        <br />
                        <p className="text-lg font-bold mb-5 ml-2">Approval</p>
                        <div className="w-full  px-3 mb-6 md:mb-0 grid grid-cols-12 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                                Aplikasi
                            </label>
                            <div className="relative col-span-8 ">
                                <select {...register("sts_beli", {
                                        required: "This field is required",
                                    })}
                                    defaultValue={approval?.sts_beli == "" ? parseInt(approval?.sts_pembelian) > 1 ? 1 : parseInt(approval?.sts_pembelian) == 1 ? "" :0 : approval?.sts_beli }
                                     className="border-gray-500 block appearance-none w-full bg-white border-2 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option value="" disabled={true}> Status Pembayaran</option>
                                    <option value={1}>Approve</option>
                                    <option value={0}>Not Approve</option>
                                </select>
                                {errors["sts_beli"] && (
                                    <p className="text-red mt-1 ml-1"> {errors["sts_beli"]["message"]}
                                        
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="-mx-3 mb-6 w-6/12">
                        <div className="h-[65px]"></div>
                        <p className="text-lg font-bold mb-5 ml-2">Deskripsi Motor</p>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="tahun">
                                Tahun
                            </label>
                            <input disabled={true} defaultValue={approval?.thn_mtr} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="tahun" type="text" />
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="warna">
                                Warna
                            </label>
                            <input disabled={true} defaultValue={approval?.warna} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="warna" type="text" />
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="nama-motor">
                                Nama Motor
                            </label>
                            <input disabled={true} defaultValue={approval?.nm_mtr} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nama-motor" type="text" />
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="no-msn">
                                No Mesin
                            </label>
                            <input  className="border-gray-500 appearance-none block w-full bg-white text-gray-700 border-2 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white " id="no-msn" type="text"  {...register("no_msn", {  required:  "This field is required",})} />
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="no-rgk">
                                No Rgk
                            </label>
                            <input  className="border-gray-500 appearance-none block w-full bg-white text-gray-700 border-2 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white " id="no-rgk" type="text"  {...register("no_rgk", {  required:  false,})}/>
                        </div>
                        <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="no-polisi">
                                No Polisi
                            </label>
                            <input  className="border-gray-500 appearance-none block w-full bg-white text-gray-700 border-2 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white " id="no-polisi" type="text"  {...register("no_plat", {  required:  "This field is required",})}/>
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