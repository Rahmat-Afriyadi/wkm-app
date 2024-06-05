export default function PageFrame(){
    return (
        <>
            <form className="w-full flex justify-between">
                <div className="-mx-3 mb-6 w-6/12">
                    <p className="text-lg font-bold mb-9">Deskripsi Hewan</p>
                    <div className="w-full px-3 grid grid-cols-12 mb-9 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="grid-first-name">
                            First Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="grid-last-name">
                            Last Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded col-span-8 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
                    </div>
                </div>

                <div className="-mx-3 mb-6 w-6/12">
                    <p className="text-lg font-bold mb-9">Deskripsi Hewan</p>
                    <div className="w-full px-3 grid grid-cols-12 mb-9 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="grid-last-name">
                            First Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
                    </div>
                    <div className="w-full px-3 grid grid-cols-12 align-middle">
                        <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor="grid-last-name">
                            Last Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded col-span-8 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
                    </div>
                </div>





                
            </form>
        </>
    )
}