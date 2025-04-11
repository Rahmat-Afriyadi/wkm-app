"use server";
import dynamic from "next/dynamic";
import { readManyBerminatMembership } from "@/server/customer-mtr/lists";
const Pagination = dynamic(() => import("@/components/Pagination/index"));

function determineStatus(print, stsRenewal, stsKartu, stsBayarRenewal) {
  if (print === 0 && stsRenewal === "O") {
    return "Belum Print TT";
  }
  switch (stsKartu) {
    case 1:
      return "Print TT";
    case 2:
      return "Bawa Kurir";
    case 3:
      if (stsRenewal === "O" && stsBayarRenewal === "S") {
        return "Sukses";
      }
      break;
    case 4:
      return "Check Kartu";
    case 6:
      return "Kartu Kembali TS";
  }
  return "";
}

export default async function ListMembership({ searchParams }) {
  const pageParams = parseInt(searchParams?.page, 10) || 1;
  const limit = parseInt(searchParams?.limit, 10) || 10;  
  const search = searchParams?.search_query || "";
  const tgl1 = searchParams?.tgl1 || "";
  const tgl2 = searchParams?.tgl2 || "";

  const response = await readManyBerminatMembership({
    tgl1,
    tgl2,
    search,
    limit,
    pageParams,
  });
  // console.log(response);
  // console.log(response.data);
  const data = response.data || [];
  const tableData = response.data.data || [];
  // console.log(data.total_records);
  const page = {
    total_rows: data.total_records,
    total_pages: data.total_pages || 1,
  };

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Nomor Mesin
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Nama Customer
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Status Jenis Bayar
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Tanggal Bayar Renewal
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Status
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Nama Kurir
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {tableData.length > 0 ? (
          tableData.map((item, i) => (
            <tr key={i}>
              <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{item.no_msn}</td>
              <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{item.nm_customer11}</td>
              <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                {item.sts_jenis_bayar === "C" ? "Cash" : item.sts_jenis_bayar === "T" ? "Transfer" : item.sts_jenis_bayar}
              </td>
              <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                {new Intl.DateTimeFormat("id-ID", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                }).format(new Date(item.tgl_bayar_renewal))}
              </td>
              <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{determineStatus(item.print, item.sts_renewal, parseInt(item.sts_kartu), item.sts_bayar_renewal)}</td>
              <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{item.nm_kurir}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-3 py-4 text-sm text-center text-gray-500 whitespace-nowrap">
              Data not found
            </td>
          </tr>
        )}
        <tr>
          <td colSpan={10}>
            <Pagination
              rows={data.total_records}
              postsPerPage={10}
              currentPage={pageParams}
              totalRows={page.total_rows}
              totalPages={page.total_pages}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
