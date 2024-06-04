"use client"

import Datepicker from "react-tailwindcss-datepicker";

export default function DatePicker({id, name, handleValueChange, value} ){

        return (
            <Datepicker
                id={id}
                inputClassName="z-40 max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                toggleClassName="absolute rounded-r-lg -top-0  right-0 h-full px-3 text-black focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed" 

                name={name}
                value={value}
                primaryColor={"amber"}
                onChange={handleValueChange}/>
        )

}