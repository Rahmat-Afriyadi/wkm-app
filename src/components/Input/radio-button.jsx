"use client";

import { useState } from "react";

export default function RadioButtonComponent({ options = [], name }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-md font-bold">{name}</h1>
      <div className="flex gap-3 p-2 bg-gray-300 rounded-md justify-center">
        {options &&
          options.map((e) => {
            return (
              <label key={e.value + "sts_membership"} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="options"
                  value={e.value}
                  checked={selectedOption === e.value}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500 cursor-pointer"
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
