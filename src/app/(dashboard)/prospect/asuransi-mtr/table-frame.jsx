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
    queryKey: ["data-prospect-asuransi-mtr", searchParams],
    queryFn: async () =>
      await readAfterCall({
        search: searchParams.search_query ? searchParams.search_query : "",
        sts: "F",
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
      accessorKey: "nm_customer_wkm",
    },
    {
      header: "Tanggal Prospect",
      accessorKey: "tgl_prospect_asuransi_mtr",
      accessorFn: (row) => formatDate(new Date(row.tgl_prospect_asuransi_mtr)),
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
