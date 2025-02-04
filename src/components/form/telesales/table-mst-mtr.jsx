import React from "react";

export default function TableMstMtr({ options, handleChange = (e) => console.log(e) }) {
  return (
    <div className="p-4 bg-white ">
      <p className="font-bold text-lg">List Produk</p>
      <br />
      <div className="w-full overflow-scroll h-screen">
        <table className="min-w-full divide-y divide-gray-300 px-3">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                Kode Produk
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                Nama Produk
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                Rate Produk
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                Id Vendor
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {options.length > 0 ? (
              options.map((item, i) => {
                return (
                  <tr
                    key={item.id}
                    onClick={() => handleChange(item)}
                    className="cursor-pointer hover:text-yellow hover:bg-black"
                  >
                    <td className="px-3 py-3.5 text-left text-sm whitespace-nowrap">{item.kd_produk}</td>
                    <td className="px-3 py-3.5 text-left text-sm whitespace-nowrap">{item.nm_produk}</td>
                    <td className="px-3 py-3.5 text-left text-sm whitespace-nowrap">{item.rate}</td>
                    <td className="px-3 py-3.5 text-left text-sm whitespace-nowrap">{item.vendor_id}</td>
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
