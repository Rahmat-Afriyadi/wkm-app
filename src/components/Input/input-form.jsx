"use client"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function InputForm({disabled, title, id, name, register, type, step, required}){
    return (
        <div className="w-full px-3 mb-5 align-middle col-span-6 grid grid-cols-12">
            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"  style={{whiteSpace: "nowrap"}} htmlFor={id}>
                {title}
            </label>
            <input required={required} disabled={disabled} id={id} {...register(name)} step={step}  className={classNames(disabled ? "cursor-not-allowed bg-gray-200": "border-gray-500 border-2","appearance-none block w-ful text-gray-700 border border-gray-500 col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500")} type={type} />
        </div>
    )
}