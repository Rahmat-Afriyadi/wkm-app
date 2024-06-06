"use client"

export default function PageFrame({approval}){
    return (
        <>
            <form className="w-full flex justify-between">
                <div className="-mx-3 mb-6 w-6/12">
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="grid-first-name">
                            Id Transaksi
                        </label>
                        <input disabled={true} defaultValue={approval?.id_transaksi} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Doe"/>
                    </div>
                    <p className="text-lg font-bold mb-5 ml-2">Deskripsi Produk</p>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="id-produk">
                            Id Produk
                        </label>
                        <input disabled={true} defaultValue={approval?.id_produk} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="id-produk" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="nama-produk">
                            Produk Asuransi
                        </label>
                        <input disabled={true} defaultValue={approval?.nm_produk} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nama-produk" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="rate">
                            Rate
                        </label>
                        <input disabled={true} defaultValue={approval?.rate} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="rate" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="admin">
                            Admin
                        </label>
                        <input disabled={true} defaultValue={approval?.admin} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="admin" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="otr">
                            Otr
                        </label>
                        <input disabled={true} defaultValue={approval?.otr} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="otr" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="premi">
                            Premi
                        </label>
                        <input disabled={true} defaultValue={approval?.premi} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="premi" type="text" placeholder="Doe"/>
                    </div>

                    <br />
                    <p className="text-lg font-bold mb-5 ml-2">Profile Konsumen</p>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="no-ktp">
                            No KTP
                        </label>
                        <input defaultValue={approval?.nik} className=" appearance-none block w-full bg-white text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="no-ktp" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="nm-stnk">
                            Nama STNK
                        </label>
                        <input defaultValue={approval?.nm_konsumen} className=" appearance-none block w-full bg-white text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nm-stnk" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="no-hp">
                            No HP
                        </label>
                        <input defaultValue={approval?.no_hp} className=" appearance-none block w-full bg-white text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="no-hp" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="alamat">
                            Alamat
                        </label>
                        <textarea defaultValue={approval?.alamat} className=" poin appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded col-span-8 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="alamat" type="text" placeholder="Doe"/>
                    </div>

                    <br />
                    <p className="text-lg font-bold mb-5 ml-2">Approval</p>
                    <div className="w-full  px-3 mb-6 md:mb-0 grid grid-cols-12 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center" htmlFor="grid-state">
                            Aplikasi
                        </label>
                        <div className="relative col-span-8 ">
                            <select value={""} className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={(e)=>{console.log(e.target.value)}}>
                                <option value="" disabled={true}> Status Pembayaran</option>
                                <option value={"2"}>Approve</option>
                                <option value={"4"}>Not Approve</option>
                            </select>
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
                        <input disabled={true} defaultValue={approval?.thn_mtr} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="tahun" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="warna">
                            Warna
                        </label>
                        <input disabled={true} defaultValue={approval?.warna} className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="warna" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="no-msn">
                            No Mesin
                        </label>
                        <input value={approval?.no_msn} className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="no-msn" type="text" placeholder="Doe" onChange={(e)=>{console.log("ini data ", e.target.value)}} />
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="no-rgk">
                            No Rgk
                        </label>
                        <input value={approval?.no_rgk} className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="no-rgk" type="text" placeholder="Doe" onChange={(e)=>{console.log("ini data ", e.target.value)}}/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 mb-5 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="no-polisi">
                            No Polisi
                        </label>
                        <input value={approval?.no_plat} className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="no-polisi" type="text" placeholder="Doe" onChange={(e)=>{console.log("ini data ", e.target.value)}}/>
                    </div>
                </div>
                
            </form>
        </>
    )
}