"use client"
import { useState } from 'react'
import Files from 'react-files'


export default function UploadFileForm(){

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [files, setFiles] = useState([])
    const [type, setType] = useState("T")

    return (
        <div className='mt-6'>
            {message != '' && <div className='bg-green-500 rounded-lg mb-4 text-white flex justify-center text-lg p-4'>
                {message}
            </div>}
            <div className='w-6/12'>
                <label
                    htmlFor={"payment_type"}
                    className="block text-sm font-medium leading-6 text-gray-900"
                    >
                    Jenis Bayar
                    </label>
                <select id="payment_type" onChange={(e)=>setType(e.target.value)} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                    <option value="T">Cash to Transfer</option>
                    <option value="C">Transfer to Cash</option>
                </select>
            </div>
            <br />
            <Files
            onChange={(files)=>{
                setError('')
                setMessage('')
                setFiles(files)
            }}
            onError={(error, file) => {
                console.log("error file ", error)
                setError(error.message)
            }}
            accepts={['application/vnd.ms-excel', ".xlsx"]}
            multiple
            maxFileSize={1000000}
            clickable>
                 <div className="flex items-center justify-center w-full">
                     <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            
                             <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                             <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                         </div>
                     </label>
                 </div> 
            </Files>
        {files.map(e=>{
            return (
                <div key={e.id} className='bg-gray-50  rounded-lg px-4 py-1 mt-2'>{e.name}</div>
            )
        })}
        {error != '' && <div className='bg-yellow rounded-lg px-4 py-1 mt-4 text-red'>{error}</div>}
        <button className='flex justify-center bg-yellow rounded-md py-1 mt-4 cursor-pointer hover:text-white w-full'
        onClick={async()=>{
            const data = new FormData();

            data.append("payment_type",type)
            for (const file of files) {
                data.append("files[]", file, file.name);
            }
            setFiles([])
            const result = await fetch("/api/edit-jenis-bayar",{
                method:"POST",
                body:data
            })
            if (result.status == 200) {
                const responseResultJson = await result.json()
                setMessage(responseResultJson.message)
            }else {
                setMessage("Terjadi masalah hubungin Rahmat")
            }
        }}
        >Upload</button>
        </div>
    )
}