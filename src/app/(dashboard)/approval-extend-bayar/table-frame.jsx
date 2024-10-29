"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Datatable from "@/components/table/data-table";
import { readManyExtendBayar } from "@/server/faktur/lists";
import { formatDate } from "@/lib/utils/format-date";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function TableFrame({ searchParams, setSelected }) {
  const pageParams = searchParams?.page || 1;
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ["pengajuan-extend-bayar", searchParams],
    queryFn: async () =>
      await readManyExtendBayar({
        ...searchParams,
        pageParams: searchParams?.page || 1,
        limit: searchParams?.limit || 10,
        search: searchParams.search_query ? searchParams.search_query : "",
      }),
  });

  if (isLoading) {
    return "Loading...";
  }

  const columns = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <input
            className="cursor-pointer rounder-lg"
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(value) => {
              table.toggleAllPageRowsSelected(!!value.target.checked);
            }}
          />
        );
      },
      cell: ({ row }) => {
        return (
          <input
            className="cursor-pointer rounder-lg"
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(value) => {
              row.toggleSelected(!!value.target.checked);
            }}
          />
        );
      },
    },
    {
      header: "Nomor Mesin",
      accessorKey: "no_msn",
    },
    {
      accessorFn: (row) => row.faktur.nm_customer11,
      header: "Nama Konsumen",
      id: "nm_customer11",
    },
    {
      header: "Tanggal Actual",
      accessorFn: (row) => formatDate(new Date(row.tgl_actual_bayar)),
      id: "tgl_actual_bayar",
    },
    {
      header: "Tanggal Pengajuan",
      accessorFn: (row) => formatDate(new Date(row.tgl_pengajuan)),
      id: "tgl_pengajuan",
    },
    {
      header: "Deskripsi",
      accessorKey: "deskripsi",
    },
    {
      id: "sts_approval",
      header: "Status Approval",
      cell: ({ row }) => {
        if (row.original.sts_approval == "P") {
          return <p className="shadow-md bg-orange-400 text-center rounded-lg p-1 font-bold text-white">Pending</p>;
        } else if (row.original.sts_approval == "O") {
          return (
            <p className="shadow-md bg-green-500 text-center rounded-lg p-1 font-bold text-md text-white">Approved</p>
          );
        } else if (row.original.sts_approval == "R") {
          return <p className="shadow-md bg-red text-center rounded-lg p-1 font-bold text-md text-white">Rejected</p>;
        }
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          {/* Edit Button */}
          <PencilIcon
            className="w-7 h-6 hover:bg-slate-300 rounded-sm cursor-pointer text-blue-600"
            aria-hidden="true"
            onClick={() => router.push("/approval-extend-bayar/detail/" + row.original.id)}
          />
          {/* Delete Button */}
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
