"use client"
import { useState } from 'react'
import Files from 'react-files'


export default function UploadFileForm(){

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [files, setFiles] = useState([])

    return (
        <div className='mt-6'>
            {message != '' && <div className='bg-green-500 rounded-lg mb-4 text-white flex justify-center text-lg p-4'>
                {message}
            </div>}
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

            for (const file of files) {
                data.append("files[]", file, file.name);
            }
            setFiles([])
            const result = await fetch("/api/edit-jenis-bayar",{
                method:"POST",
                body:data
            })
            const responseResultJson = await result.json()
            setMessage(responseResultJson.message.message)
        }}
        >Upload</button>
        </div>
    )
}