export default function Footer(){
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-11 leading-none">
                <div className="p-4 sm:col-span-3 md:col-span-2">1</div>
                <div className="p-4 col-span-3 flex justify-center">
                    <div className="w-full md:w-[250px] h-20 md:h-[213px] md:mt-12">
                        <p className="text-[13px] font-hammersmith">
                            <strong>Address:</strong>
                        </p>
                        <p className="text-[13px] mt-1">
                            Bl. Bs No.22, RT.7/RW.4, Duri Kepa, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11510
                        </p>
                    </div>
                </div>
                <div className="p-4 col-span-3 flex justify-center">
                    <div className="w-full md:w-[250px] h-20 md:h-[213px] md:mt-12">
                        <p className="text-[13px] mb-3 font-inter">Have a question, project or just want to get to know us?</p>
                        <p className="text-[13px] font-bold font-hammersmith">Whatsapp: <span className="font-normal font-inter text-yellow underline"> +62 81 77 999 3336</span></p>
                        <p className="text-[13px] font-bold font-hammersmith">Email: <span className="font-normal font-inter underline font-"> hello@metamorphosys.co.id</span></p>
                    </div>
                </div>
                <div className="col-span-3 h-[320px]">
                    <iframe className="w-full aspect-video" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6922524111733!2d106.76746794448388!3d-6.1719438445620565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6536bb5c515%3A0x23c1eec5a0b2a82e!2sJl.%20Komp.%20Grn%20Vl%20Bl.%20Bs%20No.22%2C%20RT.12%2FRW.14%2C%20Duri%20Kepa%2C%20Kebonjeruk%2C%20West%20Jakarta%20City%2C%20Jakarta%2011510!5e0!3m2!1sen!2sid!4v1710397990427!5m2!1sen!2sid" 
                         style={{border:1}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </>
    )
}