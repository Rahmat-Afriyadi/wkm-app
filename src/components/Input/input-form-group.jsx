"use client"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function InputFormGroup({disabled, title, id, name, register, type, step}){
    return (
        <>
            <div className="col-span-3 flex items-center">
                <label
                  className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 col-span-3 flex items-center"
                  htmlFor={id}
                >
                  {title}
                </label>
              </div>
              <div className="col-span-9">
                <input
                  id={id}
                  disabled={disabled}
                  {...register(name)}
                  className={
                    classNames(disabled ? "cursor-not-allowed bg-gray-200": "border-gray-500 border-2","appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500")
                  }
                  step={step}
                  type={type}
                  placeholder={title}
                />
              </div>
        </>
    )
}