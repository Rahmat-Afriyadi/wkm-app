"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Datatable from "@/components/table/data-table";
import { readManyExtendBayar } from "@/server/faktur/lists";
import { formatDate } from "@/lib/utils/format-date";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { readAfterCall } from "@/server/telesales/lists";
import { deleteTanggalMerah } from "@/server/tanggal-merah/delete-tanggal-merah";

export default function TableFrame({ searchParams }) {
  const pageParams = searchParams?.page || 1;
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["data-pending-asuransi-mtr", searchParams],
    queryFn: async () =>
      await readAfterCall({
        search: searchParams.search_query ? searchParams.search_query : "",
        sts: "P",
        jns: "sts_asuransi_mtr",
        limit: searchParams?.limit || 10,
        pageParams: searchParams?.page || 1,
      }),
  });

  if (isLoading) {
    return "Loading...";
  }

  const columns = [
    {
      header: "Nomor Mesin",
      accessorKey: "no_msn",
    },
    {
      header: "Nama Customer",
      accessorKey: "nm_customer_fkt",
    },
    {
      header: "Alasan Pending",
      cell: ({ row }) =>
        row.original.alasan_pending_asuransi_mtr != "" && (
          <select
            disabled={true}
            readOnly
            value={row.original.alasan_pending_asuransi_mtr}
            className=" appearance-none block w-full rounded-md border-0 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            {[
              { name: "", value: "" },
              { name: "Pikir-pikir/ragu", value: 1 },
              { name: "Telp Kembali", value: 2 },
              { name: "Telp Tidak Diangkat", value: 3 },
              { name: "Telp Salah Sambung", value: 5 },
            ].map((e) => {
              return (
                <option value={e.value} key={e.value} className="py-1 cursor-pointer">
                  {e.name}
                </option>
              );
            })}
          </select>
        ),
      // <PencilIcon
      //   className="w-7 h-6 hover:bg-slate-300 rounded-sm"
      //   aria-hidden="true"
      //   onClick={() => router.push("/telesales/detail/" + row.original.no_msn)}
      // />
    },
    {
      header: "Tanggal Call Telesales",
      accessorKey: "tgl_call_tele",
      accessorFn: (row) => formatDate(new Date(row.tgl_call_tele)),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2 text-blue-600 cursor-pointer">
          <PencilIcon
            className="w-7 h-6 hover:bg-slate-300 rounded-sm"
            aria-hidden="true"
            onClick={() => router.push("/telesales/detail/" + row.original.no_msn)}
          />
        </div>
      ),
    },
  ];

  return (
    <Datatable
      columns={columns}
      data={data?.data}
      totalRows={data?.page.total_rows}
      totalPages={data?.page.total_pages}
      currentPage={pageParams}
      setRowSelection={setSelected}
    />
  );
}
