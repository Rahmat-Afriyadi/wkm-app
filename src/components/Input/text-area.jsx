export function TextareaBase({ label, id, name, rows, placeholder, value, register, onChange }) {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="uppercase tracking-wide cursor-pointer text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <textarea
          id={id}
          rows={rows}
          name={name}
          value={value}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register(name)}
          onChange={onChange}
        />
      </div>
    </>
  );
}
