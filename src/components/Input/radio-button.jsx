"use client";

import { useState } from "react";

export default function RadioButtonComponent({ options = [], name, setValue, label, defaultValue }) {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setValue(name, event.target.value);
  };

  return (
    <div className="w-full mx-auto ">
      <h1 className="">{label}</h1>
      <div className="flex gap-3 px-2 py-1 border-2 border-gray-300 rounded-md justify-start">
        {options &&
          options.map((e) => {
            return (
              <label key={e.value} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name={name}
                  value={e.value}
                  checked={selectedOption === e.value}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 cursor-pointer"
                />
                <span className="text-gray-700">{e.name}</span>
              </label>
            );
          })}
      </div>

      {/* {selectedOption && <p className="mt-4 text-green-600 font-medium">You selected: {selectedOption}</p>} */}
    </div>
  );
}
