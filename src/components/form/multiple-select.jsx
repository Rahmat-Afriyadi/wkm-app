"use client"

import { useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function MultipleSelect({selected, setSelected, dataKerja}){
  const [query, setQuery] = useState("");
  
  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef(null);
  const dataKerjaList = dataKerja.map((e)=>{
    return [e.Kode, e.Nama]
  })


  const filteredTags = dataKerjaList.filter(
    (item) =>
      item[1]?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
      !selected.includes(item[0])
  );

  const isDisable =
    !query?.trim() ||
    selected.filter(
      (item) =>
        item[1]?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
    )?.length;

  return (
      <div className="relative w-full text-sm">
        {selected?.length ? (
          <div className="shadow-md w-full relative text-xs flex flex-wrap gap-1 p-2 mb-2 rounded-lg max-w-lg">
            {selected.map((tag) => {
              return (
                <div
                  key={tag}
                  className="rounded-full w-fit py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500
                  flex items-center gap-2"
                >
                  {dataKerjaList.find(e=>e[0]==tag)[1]}
                  <div
                    className="cursor-pointer"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                        setSelected(selected.filter((i) => i[0] !== tag[0]))
                    }
                  >
                    X
                  </div>
                </div>
              );
            })}
            <div className="w-full text-right">
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  setSelected([]);
                  inputRef.current?.focus();
                }}
              >
                Clear all
              </span>
            </div>
          </div>
        ) : null}
        <div className=" rounded-lg flex items-center justify-between w-full gap-2.5 max-w-lg relative">
          <MagnifyingGlassIcon className="h-6 w-6 absolute left-2"/>
          <input
            id="kode-kerja"

            ref={inputRef}
            type="text"
            value={query}
            style={{
                outline: "none"
            }}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder="Pekerjaan"
            className="pt-3 pb-2 block w-full pl-10 px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisable) {
                
                setSelected((prev) => [...prev, query]);
                setQuery("");
                setMenuOpen(true);
              }
            }}
          />
          <ChevronUpDownIcon className="h-6 w-6 absolute right-2 cursor-pointer" onClick={()=>{
            setMenuOpen(!menuOpen)
          }}/>
          {/* <button
            className="text-sm disabled:text-gray-300 text-rose-500 disabled:cursor-not-allowed"
            disabled={isDisable}
            onClick={() => {
              if (isDisable) {
                return;
              }
              setSelected((prev) => [...prev, query]);
              setQuery("");
              inputRef.current?.focus();
              setMenuOpen(true);
            }}
          >
            + Add
          </button> */}
        </div>

        {/* Menu's */}
        {menuOpen ? (
          <div className="bg-white shadow-md rounded-md absolute w-full max-h-52 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 max-w-lg">
            <ul className="w-full overflow-y-auto">
              {filteredTags?.length ? (
                filteredTags.map((tag, i) => (
                  <li
                    key={tag}
                    className="p-2 cursor-pointer rounded-md w-full hover:bg-yellow hover:text-black"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(true);
                      setSelected((prev) => [...prev, tag[0]]);
                      setQuery("");
                    }}
                  >
                    {tag[1]}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No options available</li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
  );
}