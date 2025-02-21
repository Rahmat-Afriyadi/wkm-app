import React from "react";

export default function TableAmbilData({ options, handleChange = (e) => console.log(e) }) {
  return (
    <div className="p-4 bg-white ">
      <div className="w-full overflow-scroll h-screen">
        <table className="min-w-full divide-y divide-gray-300 px-3">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {options.length > 0 ? (
              options.map((item, i) => {
                return (
                  <tr
                    key={item.no_msn}
                    onClick={() => handleChange(item)}
                    className="cursor-pointer hover:text-yellow hover:bg-black"
                  >
                    <td className="px-3 py-3.5 text-left text-sm whitespace-nowrap">1</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-3 py-4 text-sm text-center text-gray-500 whitespace-nowrap">
                  Data not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
