"use client";
import dynamic from "next/dynamic";
const Datatable = dynamic(() => import("@/components/table/data-table"));
// import Datatable from "@/components/table/data-table";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils/format-date";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useRouter, usePathname } from "next/navigation";
import { readAllStatusAfterCall } from "@/server/telesales/lists";

export default function TableFrame({ searchParams }) {
  const pageParams = searchParams?.page || 1;
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState([]);
  const params = new URLSearchParams(searchParams);

  const { data, error, isLoading } = useQuery({
    queryKey: ["data-all-status-membership", searchParams],
    refetchOnWindowFocus: false,
    queryFn: async () =>
      await readAllStatusAfterCall({
        search: searchParams.search_query ? searchParams.search_query : "",
        tgl_bayar1: searchParams.tgl_bayar1 ? searchParams.tgl_bayar1 : "",
        tgl_bayar2: searchParams.tgl_bayar2 ? searchParams.tgl_bayar2 : "",
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
      accessorKey: "nm_customer",
    },
    {
      accessorKey: "status_renewal",
      header: "Status Renewal",
      cell: ({ row }) => {
        if (row.original.sts_membership == "O" && row.original.sts_bayar == "S") {
          return (
            <p className="shadow-md bg-green-500 text-center rounded-lg p-1 font-bold text-md text-white">
              Sudah Bayar
            </p>
          );
        } else if (row.original.sts_membership == "P") {
          return <p className="shadow-md bg-orange-400 text-center rounded-lg p-1 font-bold text-white">Pending</p>;
        } else if (row.original.sts_membership == "O") {
          return <p className="shadow-md bg-green-400 text-center rounded-lg p-1 font-bold text-white">Oke (UNPAID)</p>;
        } else if (row.original.sts_membership == "C") {
          return <p className="shadow-md bg-gray-500 text-center rounded-lg p-1 font-bold text-white">Cancel</p>;
        } else if (row.original.sts_membership == "T") {
          return <p className="shadow-md bg-red text-center rounded-lg p-1 font-bold text-white">Tidak</p>;
        } else if (row.original.sts_membership == "F") {
          return <p className="shadow-md bg-gray-200 text-center rounded-lg p-1 font-bold text-white">Prospect</p>;
        } else if (row.original.sts_membership == null) {
          return <p className="shadow-md bg-gray-200 text-center rounded-lg p-1 font-bold text-white">Netral</p>;
        }
      },
    },
    {
      header: "Tanggal Verifikasi",
      accessorKey: "tgl_verifikasi",
      accessorFn: (row) => formatDate(new Date(row.tgl_verifikasi)),
    },
    {
      header: "Tanggal Bayar",
      accessorKey: "tgl_bayar_renewal_fin",
      accessorFn: (row) => {
        console.log(row.tgl_bayar_renewal_fin);
        if (row.tgl_bayar_renewal_fin == null) {
          return "-";
        }
        return formatDate(new Date(row.tgl_bayar_renewal_fin));
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2 text-blue-600 cursor-pointer">
          <a href={`/all-status-membership/detail/${row.original.no_msn}/${row.original.from_table}?${params}`}>
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
