import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Controller } from "react-hook-form";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ActionCombobox({
  label,
  id,
  name,
  options,
  required,
  errors,
  control,
  selectedOption,
  setselectedOption
}) {
  const [query, setQuery] = useState(selectedOption.name != undefined ? selectedOption.name : "");
  const filteredOption =
    query === ""
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

        
  const handleQueryChange = (event) => {
    setQuery(event);
    setselectedOption(event);
  };
  const compareData = (a, b) => a?.name === b?.name;

  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        <span className="text-red-500" hidden={!required ? true : false}>
          *
        </span>
      </label>
      <div className="mt-1">
        <Controller
          name={name}
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field: { value, onChange } }) => (
            <Combobox
              as="div"
              value={value || ""}
              onChange={onChange}
              by={compareData}
            >
              <div className="relative max-w-lg mt-1">
                <Combobox.Input
                  id={id}
                  className={
                    errors[name]
                      ? "block w-full pr-10 rounded-md shadow-sm border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      : "block w-full rounded-md shadow-sm border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  }
                  onChange={(event) =>
                    onChange(handleQueryChange(event.target.value))
                  }

                  displayValue={(option) => option.name ? option?.name : query}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center h-10 px-2 rounded-r-md focus:outline-none">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>

                {filteredOption?.length > 0 && (
                  <Combobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredOption?.map((option) => (
                      <Combobox.Option
                        key={option.id}
                        value={option}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-pointer select-none py-2 pl-3 pr-9",
                            active ? "bg-cyan text-white" : "text-gray-900"
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <span
                              className={classNames(
                                "block truncate",
                                selected ? "font-semibold" : ""
                              )}
                            >
                              {option?.name}
                            </span>

                            {selected && (
                              <span
                                className={classNames(
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                  active ? "text-white" : "text-cyan"
                                )}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
                {errors[name] && (
                  <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
                    {errors[name].message}
                  </p>
                )}
              </div>
            </Combobox>
          )}
        />
      </div>
    </>
  );
}
