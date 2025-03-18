"use client";
import dynamic from "next/dynamic";
const Datatable = dynamic(() => import("@/components/table/data-table"));
// import Datatable from "@/components/table/data-table";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils/format-date";
import { PencilIcon } from "@heroicons/react/24/solid";
import { listKartuBalikan } from "@/server/telesales/lists";

export default function TableFrame({ searchParams }) {
  const pageParams = searchParams?.page || 1;
  const [selected, setSelected] = useState([]);
  const params = new URLSearchParams(searchParams);

  const { data, error, isLoading } = useQuery({
    queryKey: ["data-balikan-membership", searchParams],
    refetchOnWindowFocus: false,
    queryFn: async () =>
      await listKartuBalikan({
        search: searchParams.search_query ? searchParams.search_query : "",
        limit: searchParams?.limit || 10,
        pageParams: searchParams?.page || 1,
        tgl1: searchParams?.tgl1 || "",
        tgl2: searchParams?.tgl2 || "",
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
      header: "Alasan Kurir",
      accessorKey: "alasan_belum_bayar2",
    },
    {
      header: "Tanggal Update Kartu Balikan",
      accessorKey: "tgl_update_kartu_balikan",
      accessorFn: (row) => formatDate(new Date(row.tgl_update_kartu_balikan)),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2 text-blue-600 cursor-pointer">
          <a href={`/kartu-balikan/detail/${row.original.no_msn}?${params}`}>
            <PencilIcon className="w-7 h-6 hover:bg-slate-300 rounded-sm" aria-hidden="true" />
          </a>
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
